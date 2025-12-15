import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, email))
            .orderBy(desc(MockInterview.id));

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Interview list error ❌", error);
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
