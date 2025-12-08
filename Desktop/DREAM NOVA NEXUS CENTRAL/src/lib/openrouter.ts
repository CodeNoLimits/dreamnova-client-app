import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// Initialize OpenRouter client
// We use the OpenAI compatibility layer provided by the 'ai' SDK
const openrouter = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '',
});

export const model = openrouter('anthropic/claude-3-sonnet');

export async function generateAIResponse(prompt: string, systemPrompt: string = 'You are a helpful assistant.') {
    try {
        const { text } = await generateText({
            model: model,
            system: systemPrompt,
            prompt: prompt,
        });
        return text;
    } catch (error) {
        console.error('OpenRouter API Error:', error);
        return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}

export async function streamAIResponse(prompt: string, systemPrompt: string = 'You are a helpful assistant.') {
    try {
        const result = await streamText({
            model: model,
            system: systemPrompt,
            prompt: prompt,
        });
        return result;
    } catch (error) {
        console.error('OpenRouter Stream Error:', error);
        throw error;
    }
}
