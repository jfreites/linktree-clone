import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { MoreInfoProps } from "./MoreInfo.types";
import { Ellipsis, TreePalm } from "lucide-react";
import Image from "next/image";

export function MoreInfo(props: MoreInfoProps) {
  const { user } = props;
  return (
    <div className="max-w-lg w-full mx-auto flex items-end justify-end">
    <Dialog>
    <DialogTrigger asChild>
        <div className="bg-slate-400 p-2 rounded-full opacity-90 hover:opacity-70 cursor-pointer">
            <Ellipsis strokeWidth={1} className="text-white" />
        </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Share your profile</DialogTitle>
        <div className="p-4 rounded-lg bg-teal-800 text-white flex-col items-center justify-center flex">
           <Image
            src={user.avatarUrl || "/images/default_avatar.png"}
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full aspect-square object-cover"
            />
            <p className="font-semibold text-2xl">@{user.username}</p>
            <div className="flex items-center gap-1 py-2">
                <TreePalm className="text-white" />
                @{user.username}
            </div>
        </div>
        <p>botones para compartir por distintas rdes sociales</p>
        </DialogHeader>
    </DialogContent>
    </Dialog>
    </div>
  )
}
