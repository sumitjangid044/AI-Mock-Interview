import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const cache =
    global.questionsCache || (global.questionsCache = {});

export async function POST(req) {
    try {
        const { category, experience, offset = 0 } = await req.json();

        const cacheKey = `${category}-${experience}`;

        // total questions cache
        if (!cache[cacheKey]) {
            cache[cacheKey] = [];
        }

        // if already generated enough
        if (cache[cacheKey].length >= offset + 5) {
            return NextResponse.json({
                success: true,
                questions: cache[cacheKey].slice(offset, offset + 5),
                hasMore: cache[cacheKey].length < 15,
            });
        }

        const remaining = 15 - cache[cacheKey].length;
        const generateCount = Math.min(5, remaining);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content:
                        "You are a senior technical interviewer. Return valid JSON only.",
                },
                {
                    role: "user",
                    content: `
Generate exactly ${generateCount} interview questions.

Role: ${category}
Experience: ${experience} years

Rules:
- Match difficulty to experience
- Mix theory + JavaScript coding
- Do NOT include answers

Return JSON only:
{
  "questions": [{ "question": "text" }]
}
`,
                },
            ],
            temperature: 0.4,
        });

        const parsed = JSON.parse(
            completion.choices[0].message.content
        );

        cache[cacheKey].push(...parsed.questions);

        return NextResponse.json({
            success: true,
            questions: parsed.questions,
            hasMore: cache[cacheKey].length < 15,
        });
    } catch (err) {
        console.error("GET QUESTIONS ERROR:", err);

        return NextResponse.json(
            { success: false, error: "Failed to generate questions" },
            { status: 500 }
        );
    }
}
