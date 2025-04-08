import { z } from "zod"

export const formSchema = z.object({
    url: z.string().min(5).max(200),
    name: z.string().min(2).max(50),
    icon: z.string({
        required_error: "Icon is required",
    })
})