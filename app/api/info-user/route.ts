import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    try {
        const { userId } = getAuth(req as NextRequest)
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        let existingUser = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: { links: true}
        })

        if (!existingUser) {
            existingUser = await db.user.create({
                data: {
                    id: userId,
                    name: "User",
                    username: `user_${Date.now()}`,
                    links: {
                        create: []
                    }
                },
                include: { links: true } // Include links in the response
            })
        }

        return NextResponse.json(existingUser)
    } catch (error) {
        console.error("Error fetching user info:", error)
        return NextResponse.json({
            message: "Error fetching user info",
            error: (error as Error).message || "Unknown error",
        })
    }
}