import { useState } from "react"
import { TabUploadImageProps } from "./TabUploadImage.types"
import { ChevronLeft } from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useUserInfo } from "@/hooks/use-user-info"

export function TabUploadImage(props: TabUploadImageProps) {
    const { setShowDialog, setShowTab } = props
    const [photo, setPhoto] = useState('')
    const { reloadUser } = useUserInfo()

    const onUploadPhoto = async () => {
        await fetch('/api/update-user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatarUrl: photo,
            }),
        })

        setShowDialog(false)
        toast.success('Profile image updated successfully')
        
        reloadUser()
    }
    
  return (
    <div>
        <div 
            className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
            onClick={() => setShowTab(null)}
        >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
        </div>

        <div className="my-4">
            <UploadButton className="rounded-md text-slate-800 bg-slate-200 h-full w-full p-4" endpoint="profileImage" onClientUploadComplete={(res) => {
                console.log(res)
                setPhoto(res?.[0].ufsUrl)
            }} onUploadError={(error) => console.log(error)}
            />
        </div>

        <div>
            <Button onClick={onUploadPhoto} disabled={!photo} className="w-full bg-purple-600 text-white rounded-full cursor-pointer">Upload</Button>
        </div>
    </div>
  )
}
