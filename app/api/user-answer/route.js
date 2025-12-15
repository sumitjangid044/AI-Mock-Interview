import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            mockIdRef,
            question,
            correctAns,
            userAns,
            feedback,
            rating,
            userEmail,
            createdAt,
        } = body;

        await db.insert(UserAnswer).values({
            mockIdRef,
            question,
            correctAns,
            userAns,
            feedback,
            rating,
            userEmail,
            createdAt,
        });

        return NextResponse.json({
            success: true,
            message: "User answer saved successfully",
        });

    } catch (error) {
        console.error("❌ Save Answer Error:", error);

        return NextResponse.json(
            { success: false, message: "Failed to save answer" },
            { status: 500 }
        );
    }
}
