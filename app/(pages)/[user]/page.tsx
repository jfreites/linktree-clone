'use client'

import { NotUserFound } from "@/components/home/NotUserFound";
import { LoaderProfile } from "@/components/shared";
import { Link, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPage() {
  const params = useParams();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User & {links: Link[]}>(null);

  const router = useRouter()
  const username = params?.user;

  useEffect(() => {
    const fetchUserProfile = async () => {
        if (!username) {
            router.push('/')
        }

        setIsLoading(true)

        try {
            const res = await fetch(`/api/user/${username}`)

            if (!res.ok) {
                throw new Error('Error fetching user')
            }

            const data = await res.json()
            console.log(data)
            setUser(data)   
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    fetchUserProfile()

    if (reload) {
        fetchUserProfile()
        setReload(false)
    }

  }, [username, reload, router])

  if (isLoading) {
    return <LoaderProfile />
  }

  if (!user) {
    return <NotUserFound />
  }

  return (
    <div className="max-w-6xl mx-auto items-center">
        page {username}
    </div>
  )
}