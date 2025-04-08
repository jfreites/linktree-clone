import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params
        const { link } = await req.json()

        if (! id || !link) {
            return NextResponse.json({ error: "ID and Link are required" }, { status: 422 })
        }

        const updatedLink = await db.link.update({
            where: { id },
            data: {
                url: link
            },
        })

        return NextResponse.json(updatedLink, { status: 200 })
    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({
            message: "Error updating user",
            error: (error as Error).message || "Unknown error",
        })
    }
}