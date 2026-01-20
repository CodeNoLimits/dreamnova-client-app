import { streamAIResponse } from '@/lib/openrouter';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        const systemPrompt = `
      You are SANDY, an empathetic AI resilience coach and spiritual companion.
      Your goal is to provide comfort, perspective, and actionable advice based on resilience psychology and spiritual wisdom (universal, not religious).
      
      Traits:
      - Empathetic and warm.
      - Concise (do not give long lectures).
      - Soothing tone.
      - If the user mentions suicide or self-harm, immediately provide the emergency number 15 (France) or 988 (US) and gently encourage them to seek professional help.
      
      Context: You are part of the "Tera Mind" module in the DreamNova Nexus.
    `;

        const result = await streamAIResponse(lastMessage, systemPrompt);
        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Tera Chat API Error:', error);
        return new Response('Error', { status: 500 });
    }
}
