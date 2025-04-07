import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"
import { useUserInfo } from "@/hooks/use-user-info"
import { Pencil } from "lucide-react"
import { ProfileImageSelector } from "./ProfileImageSelector"

export function ProfileImage() {
  const [showDialog, setShowDialog] = useState(false)

  const { user } = useUserInfo()

  if (!user) return null

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className="text-left">
        <div className="relative">
          <Image
            src={user.avatarUrl || '/images/default_avatar.png'}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full object-cover aspect-square"
          />
          <div className="bg-white rounded-full flex items-center justify-center border absolute right-[-5px] bottom-[-15px] p-1.5 cursor-pointer">
            <Pencil className="text-slate-300 w-4 h-4" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Display name & bio</DialogTitle>
          <DialogDescription asChild>
            <ProfileImageSelector setShowDialog={setShowDialog} />
          </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
