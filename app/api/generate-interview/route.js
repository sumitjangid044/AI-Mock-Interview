import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function POST(req) {
    try {
        const body = await req.json();
        const { jobPosition, jobDesc, jobExperience, createdBy } = body;

        const prompt = `
Generate 5 interview questions WITH answers in JSON format only.

[
    { "question": "", "answer": "" }
]

Job Role: ${jobPosition}
Description: ${jobDesc}
Experience: ${jobExperience} years
`;

        const res = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                }),
            }
        );

        const aiData = await res.json();

        if (!aiData.choices || !aiData.choices[0]) {
            throw new Error("AI response invalid");
        }

        const text = aiData.choices[0].message.content;

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedJson = JSON.parse(cleanText);

        const mockId = uuidv4();

        await db.insert(MockInterview).values({
            mockId,
            jsonMockResp: JSON.stringify(parsedJson),
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy,
            createdAt: moment().format("DD-MM-YYYY"),
        });

        return NextResponse.json({
            success: true,
            mockId,
        });

    } catch (error) {
        console.error("API ERROR:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
