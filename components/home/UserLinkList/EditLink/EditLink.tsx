"use client"
 
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditLinkProps } from "./EditLink.types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./EditLink.form"
import { useUserInfo } from "@/hooks/use-user-info"
import { toast } from "sonner"

export function EditLink(props: EditLinkProps) {
  const { link, onReload } = props
  const [showDialog, setShowDialog] = useState(false)
  const { reloadUser } = useUserInfo()

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: link?.url || '',
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await fetch(`/api/link/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            link: values.link,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    toast.success("Link updated successfully")

    setShowDialog(false)
    onReload(true)
    reloadUser()
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
            <Button variant="outline">
                <Pencil className="w-4 h-4" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit this link</DialogTitle>
            <DialogDescription>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Social network full URL</FormLabel>
                        <FormControl>
                            <Input placeholder="your link" {...field} />
                        </FormControl>
                        <FormDescription>
                            Example: https://www.instagram.com/yourusername
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full rounded-full bg-purple-500 hover:bg-purple-700 cursor-pointer">Save</Button>
                </form>
                </Form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
