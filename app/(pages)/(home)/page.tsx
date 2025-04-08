'use client'

import { useEffect, useState } from "react"
import { HandlerStep, LinkProfile, ProfileInfo, ProfilePreview } from "@/components/home"
import { useUser } from "@clerk/nextjs"
import { TreePalm } from "lucide-react"
import { User, Link } from "@prisma/client"
import { LoaderProfile } from "@/components/shared"
import { StepConfigUserProvider, UserProvider } from "@/contexts"

export default function Home() {
  const { user } = useUser()
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [reload, setReload] = useState(false)
  const [infoUser, setInfoUser] = useState<(User & { links: Link[]}) | null>(null)

  useEffect(() => {
    const checkFirstTime = async () => {
      const response = await fetch("/api/info-user")
      const data = await response.json()
      setInfoUser(data)
      setIsFirstTime(data.firstLogin) // Set the user info
    }
    checkFirstTime()

    if (reload) {
      checkFirstTime()
      setReload(false) // Reset reload after fetching
    }
  }, [user?.id, reload, user])

  if (!user || !infoUser) {
    return <LoaderProfile />
  }

  if (isFirstTime) {
    return (
      <StepConfigUserProvider>
        <HandlerStep onReload={setReload} />
        <p>es la primera visita</p>
      </StepConfigUserProvider>
    )
  }

  return (
    <UserProvider>
      <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
        <div>
          {/* Link Profile */}
          <LinkProfile />

          {/* Profile info */}
          <ProfileInfo onReload={setReload} />

          <div className="mt-20 flex flex-col items-center">
            <div className="py-10 text-center justify-center flex flex-col items-center text-gray-400 font-semibold">
              <TreePalm className="h-20 w-20" strokeWidth={1} />
              <p>Show the world who you are</p>
              <p>Add a link to get started</p>
            </div>
          </div>

        </div>

        {/* Profile preview */}
        <ProfilePreview />
      </div>
    </UserProvider>
  );
}