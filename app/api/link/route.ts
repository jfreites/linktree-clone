import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(
    req: NextRequest
) {
    try {
        const { userId } = getAuth(req)
        const data = await req.json()

        if (! userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const createdLink = await db.link.create({
            data: {
                userId,
                url: data.url,
                icon: data.icon,
                name: data.name
            }
        })

        return NextResponse.json(createdLink, { status: 201 })
    } catch (error) {
        console.error("Error creating link:", error)
        return NextResponse.json({
            message: "Error creating link",
            error: (error as Error).message || "Unknown error",
        })
    }
}