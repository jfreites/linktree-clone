import { useState } from "react";
import { EditBackgroundProps } from "./EditBackground.types";
import { useUserInfo } from "@/hooks/use-user-info";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Ellipsis, ImagePlus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";

export function EditBackground(props: EditBackgroundProps) {
  const { onReload } = props
  const [showDialog, setShowDialog] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')
  const { reloadUser } = useUserInfo()

  const onChangeBackground = async () => {
    try {
        await fetch('/api/update-user', {
            method: 'PATCH',
            body: JSON.stringify({ backgroundImage: photoUrl }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        reloadUser()
        setShowDialog(false)
        onReload(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="p-2 bg-[#e0e2d9] rounded-full ">
                <Ellipsis fill="black" strokeWidth={1} onClick={() => setShowDialog(true)} />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <DialogTrigger>
                    <div className="flex gap-1 items-center">
                        <ImagePlus className="h-4 w-4" />
                        Edit or add background
                    </div>
                </DialogTrigger>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Change background image</DialogTitle>
            <DialogDescription>
                <div className="my-4">
                {photoUrl ? (
                    <div>
                        <Image 
                            src={photoUrl} 
                            alt="background" 
                            width={300} 
                            height={300} 
                        />
                    </div>
                ) : (
                    <UploadButton 
                       className="rounded-md text-slate-800 bg-slate-200 bg-slate h-full py-10"
                       endpoint="profileImage"
                       onClientUploadComplete={(res) => {
                        setPhotoUrl(res[0].ufsUrl)
                       }}
                       onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                       }}
                    />
                )}
                </div>
                <Button className="w-full rounded-full" onClick={onChangeBackground} disabled={!photoUrl}>Change background</Button>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
