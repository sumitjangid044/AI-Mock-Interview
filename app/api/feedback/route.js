import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        console.log("🔥 /api/feedback HIT");

        const { question, answer } = await req.json();

        if (!question || !answer) {
            return NextResponse.json(
                { success: false, message: "Missing data" },
                { status: 400 }
            );
        }

        const prompt = `
You are an interview evaluator.

Question: ${question}
User Answer: ${answer}

Respond ONLY in valid JSON.
No explanation.

Format:
{
  "rating": number (1-10),
  "feedback": "3 to 5 lines of improvement feedback"
}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        const text = completion.choices[0].message.content;

        const parsed = JSON.parse(text);

        return NextResponse.json({
            success: true,
            data: parsed,
        });

    } catch (error) {
        console.error("❌ Feedback API Error:", error);

        return NextResponse.json(
            { success: false, message: "Feedback failed" },
            { status: 500 }
        );
    }
}
