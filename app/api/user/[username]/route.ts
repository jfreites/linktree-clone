import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: NextRequest, 
    { params }: { params: { username: string } }
) {
    try {
        const username = (await params).username

        if (!username) {
            return NextResponse.json({ error: "Missing username param" }, { status: 400 })
        }

        const user = await db.user.findUnique({
            where: {
                username: username,
            },
            include: { links: true}
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("Error fetching user profile:", error)
        return NextResponse.json({
            message: "Error fetching user profile",
            error: (error as Error).message || "Unknown error",
        })
    }
}