import { generateAIResponse } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { companyName, industry, currentTech, goal } = await req.json();

        const prompt = `
      Analyze the AI readiness for the following company:
      Name: ${companyName}
      Industry: ${industry}
      Current Tech Stack: ${currentTech}
      Main Goal: ${goal}

      Provide a concise, high-impact "Velocity Audit" (max 150 words).
      1. Give a "Velocity Score" out of 100.
      2. Identify 1 critical bottleneck.
      3. Propose 1 immediate AI automation to fix it.
      
      Tone: Professional, direct, slightly futuristic (DreamNova style).
    `;

        const response = await generateAIResponse(prompt, "You are a Senior AI Strategy Consultant for DreamNova.");

        return NextResponse.json({ result: response });
    } catch (error) {
        console.error('Audit API Error:', error);
        return NextResponse.json({ error: 'Failed to generate audit' }, { status: 500 });
    }
}
