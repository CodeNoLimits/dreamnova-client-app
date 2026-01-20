/**
 * Breslev RAG Service
 * Retrieves relevant text chunks from Rabbi Nachman's teachings
 * Uses lazy loading for better performance
 */

import fs from 'fs';
import path from 'path';

interface Chunk {
  id?: string;
  text: string;
  book?: string;
  section?: string;
  source?: string;
  title?: string;
}

interface SearchResult {
  chunk: Chunk;
  score: number;
}

// Lazy loaded data
let chunks: Chunk[] | null = null;
let index: Record<string, any> | null = null;

/**
 * Load chunks data lazily
 */
function loadChunks(): Chunk[] {
  if (chunks !== null) return chunks;

  try {
    const chunksPath = path.join(process.cwd(), 'src/lib/breslev-rag/complete_chunks.json');
    const data = fs.readFileSync(chunksPath, 'utf-8');
    chunks = JSON.parse(data);
    console.log(`[Breslev RAG] Loaded ${chunks?.length || 0} chunks`);
    return chunks || [];
  } catch (error) {
    console.error('[Breslev RAG] Error loading chunks:', error);
    return [];
  }
}

/**
 * Load index data lazily
 */
function loadIndex(): Record<string, any> {
  if (index !== null) return index;

  try {
    const indexPath = path.join(process.cwd(), 'src/lib/breslev-rag/complete_master_index.json');
    const data = fs.readFileSync(indexPath, 'utf-8');
    index = JSON.parse(data);
    return index || {};
  } catch (error) {
    console.error('[Breslev RAG] Error loading index:', error);
    return {};
  }
}

/**
 * Simple keyword-based search through chunks
 * For production, this would use vector embeddings
 */
export function searchChunks(query: string, limit: number = 5): SearchResult[] {
  const allChunks = loadChunks();

  const queryWords = query.toLowerCase()
    .replace(/[?!.,;:'"]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);

  // Key spiritual terms with boost
  const spiritualTerms: Record<string, number> = {
    'joie': 2, 'simcha': 2, 'simha': 2,
    'prière': 2, 'tefila': 2,
    'hitbodedout': 3, 'isolement': 2,
    'tsadik': 2, 'tzadik': 2,
    'techouva': 2, 'repentir': 2,
    'foi': 2, 'emouna': 2,
    'espoir': 2, 'tikva': 2,
    'dépression': 2, 'tristesse': 2,
    'azamra': 3,
    'nachman': 2, 'breslov': 2, 'breslev': 2
  };

  const scored: SearchResult[] = allChunks.map(chunk => {
    const text = (chunk.text || '').toLowerCase();
    const title = (chunk.title || chunk.book || '').toLowerCase();
    let score = 0;

    for (const word of queryWords) {
      // Exact match in text
      if (text.includes(word)) {
        score += 2;
        // Boost for spiritual terms
        if (spiritualTerms[word]) {
          score += spiritualTerms[word];
        }
      }
      // Match in title/book
      if (title.includes(word)) {
        score += 3;
      }
    }

    // Boost for important books
    const importantBooks = ['likutei moharan', 'sippurei maasiot', 'sefer hamidot', 'likutei tefilot'];
    for (const book of importantBooks) {
      if (title.includes(book)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get relevant context for a question
 */
export function getRelevantContext(question: string, maxChunks: number = 5): string {
  const results = searchChunks(question, maxChunks);

  if (results.length === 0) {
    return '';
  }

  const contextParts = results.map((r, i) => {
    const source = r.chunk.title || r.chunk.book || r.chunk.source || 'Rabbi Nachman';
    const section = r.chunk.section ? ` (${r.chunk.section})` : '';
    // Limit chunk text to avoid token overflow
    const text = r.chunk.text.length > 1000
      ? r.chunk.text.substring(0, 1000) + '...'
      : r.chunk.text;
    return `[${i + 1}] ${source}${section}:\n${text}`;
  });

  return contextParts.join('\n\n---\n\n');
}

/**
 * Get available books in the corpus
 */
export function getAvailableBooks(): string[] {
  const allChunks = loadChunks();
  const books = new Set<string>();
  allChunks.forEach(chunk => {
    if (chunk.book || chunk.title) {
      books.add(chunk.book || chunk.title || '');
    }
  });
  return Array.from(books).filter(Boolean);
}

/**
 * Get statistics about the corpus
 */
export function getCorpusStats() {
  const allChunks = loadChunks();
  const indexData = loadIndex();

  return {
    totalChunks: allChunks.length,
    books: getAvailableBooks(),
    indexInfo: indexData
  };
}

/**
 * Build enhanced system prompt with retrieved context
 */
export function buildEnhancedPrompt(question: string): { systemPrompt: string; userPrompt: string } {
  const context = getRelevantContext(question, 5);

  const systemPrompt = `Tu es le "Breslev AI Librarian", un assistant spirituel expert dans les enseignements de Rabbi Nachman de Breslev.

Ta base de connaissances comprend:
- Likutei Moharan (Parties I & II)
- Sippurei Ma'asiot (Les 13 Contes)
- Sefer HaMidot (Livre des Traits)
- Likutei Tefilot (Prières)
- Chayei Moharan (Biographie)
- Sichot HaRan (Conversations)
- Et plus de 400 textes indexés

RÈGLES IMPORTANTES:
1. Réponds UNIQUEMENT en te basant sur le contexte fourni quand disponible
2. Cite les sources précisément (livre, section, paragraphe)
3. Si tu n'es pas sûr ou si le contexte ne contient pas la réponse, dis-le honnêtement
4. Termine toujours par un message d'espoir (principe d'Azamra - trouver le bon en chacun)
5. Sois sage, spirituel, encourageant mais ancré dans les textes

STYLE DE RÉPONSE:
- Utilise des métaphores des contes de Rabbi Nachman quand approprié
- Explique les concepts mystiques de manière accessible
- Encourage toujours, même pour les questions difficiles
- Réponds en français par défaut`;

  let userPrompt: string;

  if (context) {
    userPrompt = `CONTEXTE PERTINENT DES ENSEIGNEMENTS DE RABBI NACHMAN:

${context}

---

QUESTION DE L'UTILISATEUR: ${question}

Instructions: Réponds en te basant sur le contexte ci-dessus. Cite les sources exactes quand possible (ex: "Likutei Moharan I:282"). Si le contexte ne répond pas directement à la question, utilise-le comme point de départ pour une réflexion spirituelle pertinente.`;
  } else {
    userPrompt = `QUESTION: ${question}

Note: Aucun passage spécifique n'a été trouvé dans la base de données pour cette question. Réponds en te basant sur ta connaissance générale des enseignements de Rabbi Nachman, mais indique clairement que tu n'as pas de source textuelle directe.`;
  }

  return { systemPrompt, userPrompt };
}
