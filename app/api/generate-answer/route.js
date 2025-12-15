import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { question, category, experience } = await req.json();

        if (!question || !category || !experience) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompt = `
You are a senior technical interviewer.

Answer the following interview question based on the candidate profile.

Rules:
- If the question is a coding question:
  - Provide clean JavaScript code
  - Explain the logic clearly
- If the question is theoretical:
  - Give an interview-ready explanation
- Keep the answer appropriate for the experience level
- Be clear, structured, and concise

Candidate Role: ${category}
Experience: ${experience} years
Question: ${question}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const answer = completion.choices[0].message.content;

        return NextResponse.json({
            success: true,
            answer,
        });
    } catch (error) {
        console.error("GET ANSWER ERROR:", error);

        return NextResponse.json(
            { success: false, error: "Failed to generate answer" },
            { status: 500 }
        );
    }
}
