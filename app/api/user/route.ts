import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req)
        const data = await req.json()
        const { name, username, avatarUrl, links, userType } = data

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await db.user.update({
            where: { id: userId },
            data: {
                name, 
                username, 
                avatarUrl, 
                userType,
                firstLogin: false, 
                links: { create: links }
            }
        })

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("Error in POST /api/user:", error);
        return NextResponse.json({
            message: "There was an error saving your profile.",
            error: (error as Error).message || "Unknown error", // Provide a fallback message
        }, {
            status: 500
        })
    }
}