import { streamAIResponse } from '@/lib/openrouter';
import { buildEnhancedPrompt, getCorpusStats } from '@/lib/breslev-rag/rag-service';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        // Use RAG to build enhanced prompt with relevant context
        const { systemPrompt, userPrompt } = buildEnhancedPrompt(lastMessage);

        console.log('[Breslev RAG] Processing question:', lastMessage.substring(0, 50) + '...');

        const result = await streamAIResponse(userPrompt, systemPrompt);
        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Breslev RAG API Error:', error);
        return new Response('Error processing request', { status: 500 });
    }
}

// GET endpoint for corpus stats
export async function GET() {
    try {
        const stats = getCorpusStats();
        return Response.json({
            status: 'ok',
            stats,
            message: 'Breslev RAG Service - Rabbi Nachman Teachings'
        });
    } catch (error) {
        console.error('Breslev RAG Stats Error:', error);
        return Response.json({ error: 'Failed to get stats' }, { status: 500 });
    }
}
