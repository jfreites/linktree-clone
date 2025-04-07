"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { useUserInfo } from "@/hooks/use-user-info";
import { zodResolver } from "@hookform/resolvers/zod"
import { EditDetailsFormProps } from "./EditDetailsForm.types";
import { formSchema } from "./EditDetailsForm.form";
import { toast } from "sonner"

export function EditDetailsForm(props: EditDetailsFormProps) {
  const { setOpenDialog } = props
  const { user, reloadUser } = useUserInfo()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: user?.username || "",
        name: user?.name || "",
        bio: user?.bio || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        await fetch("/api/update-user", {
            method: "PATCH",
            body: JSON.stringify({
                username: values.username,
                name: values.name,
                bio: values.bio,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        setOpenDialog(false)
        reloadUser()
        toast.success("Profile updated successfully 🔥")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@profile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-purple-600 text-white rounded-full w-full py-6 text-lg hover:bg-purple-800" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
