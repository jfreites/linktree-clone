'use client'

import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./AddLinkForm.form"
import { useUserInfo } from "@/hooks/use-user-info"

import { AddLinkFormProps } from "./AddLinkForm.types";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { data } from "@/data/socialNetworkList";
import Image from "next/image"
import { toast } from "sonner"

export function AddLinkForm(props: AddLinkFormProps) {
  const { onReload } = props
  const { reloadUser } = useUserInfo()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      url: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/link", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      toast.error("Error creating link")
      return
    }

    toast.success("Link created successfully")
    reloadUser()
    onReload(true)
    form.reset()
  }

  return (
    <div className="mt-6 mb-12 border-2 border-gray-200 px-4 py-2 rounded-lg">
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Select your icon</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={(value) => {
                          field.onChange(value)
                          const selectedIcon = data.find((item) => item.icon === value)
                          if (selectedIcon) {
                            form.setValue("name", selectedIcon.name)
                          }
                        }} 
                        value={field.value || ""}
                        className="grid grid-cols-4 space-x-1"
                      >
                        {data.map((item) => (
                          <FormItem key={item.icon} className="flex items-center space-y-0 space-x-0 gap-1">
                            <FormControl>
                              <RadioGroupItem value={item.icon} id={item.name} />
                            </FormControl>
                            <Label className="font-normal">
                              <Image src={item.icon} alt={item.name} width={40} height={40} />
                            </Label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Social network name</FormLabel>
                  <FormControl>
                      <Input placeholder="autofill name" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Social network URL</FormLabel>
                  <FormControl>
                      <Input placeholder="your url" {...field} />
                  </FormControl>
                  <FormDescription>
                      bla bla bla description
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-full bg-purple-500 hover:bg-purple-700 cursor-pointer">Create new link</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
