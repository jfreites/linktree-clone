import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function PATCH(req: Request) {
    try {
        const { userId } = getAuth(req as NextRequest)

        if (! userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await req.json()

        const updatedUser = await db.user.update({
            where: { id: userId },
            data,
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({
            message: "Error updating user",
            error: (error as Error).message || "Unknown error",
        })
    }
}