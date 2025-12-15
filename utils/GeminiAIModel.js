import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateInterviewQuestions(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
}
