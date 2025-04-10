'use client'

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Login() {
    return (
        <>
        <h1>Login</h1>
        <Button
            variant="outline"
            onClick={() =>
                    toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        >
            Login
        </Button>
        </>
        
    )
}