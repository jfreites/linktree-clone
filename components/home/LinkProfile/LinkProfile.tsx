'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LinkProfile() {
    const [isCopiedLink, setIsCopiedLink] = useState(false)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.origin + "/@jfreites")
        setIsCopiedLink(true)
        setTimeout(() => {
            setIsCopiedLink(false)
        }, 2000)
    }

    return (
        <div className="bg-indigo-100 rounded-3xl">
            <div className="flex flex-col justify-center text-center py-4 px-4 items-center gap-2 md:flex-row md:justify-between md:text-left">
                <span className="text-sm">
                    <span>🔥 Your LinkTree Clone is live: </span>
                    {window.location.origin}/@jfreites
                </span>

                <Button 
                    variant="outline" 
                    className="rounded-full px-4 bg-white font-semibold text-xs md:text-base cursor-pointer"
                    onClick={handleCopyLink}
                >
                    {isCopiedLink ? "Copied!" : "Copy your URL"}
                </Button>
            </div>
        </div>
    )
}