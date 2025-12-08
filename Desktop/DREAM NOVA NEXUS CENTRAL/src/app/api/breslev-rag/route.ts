import { streamAIResponse } from '@/lib/openrouter';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        const systemPrompt = `
      You are the "Breslev AI Librarian".
      Your knowledge base consists of the writings of Rebbe Nachman of Breslev (Likutei Moharan, Sippurei Ma'asiot, Sefer HaMiddot).
      
      Goal: Answer the user's question using the wisdom of Rebbe Nachman.
      Tone: Wise, spiritual, encouraging, yet grounded. Use metaphors from the stories when appropriate.
      
      If asked about specific texts, quote them (or paraphrase accurately).
      Always end with a message of hope (Azamra).
    `;

        const result = await streamAIResponse(lastMessage, systemPrompt);
        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Breslev RAG API Error:', error);
        return new Response('Error', { status: 500 });
    }
}
