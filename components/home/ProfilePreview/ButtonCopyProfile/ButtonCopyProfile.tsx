import { useState } from "react"
import { useUserInfo } from "@/hooks/use-user-info"
import { Button } from "@/components/ui/button"

export function ButtonCopyProfile() {
  const [isCopyProfile, setIsCopyProfile] = useState(false)
  const { user } = useUserInfo()

  const copyProfile = () => {
    const url = `${window.location.origin}/${user?.username}`

    navigator.clipboard.writeText(url)
    setIsCopyProfile(true)

    setTimeout(() => {
      setIsCopyProfile(false)
    }, 2000)
  }
  
  return (
    <div className="pl-6 mt-6">
        <div className="border py-2 rounded-full flex justify-between items-center px-4 cursor-pointer" onClick={copyProfile}>
            <span className="pl-4">
                {window.location.origin}/<span className="font-semibold">{user?.username}</span>
            </span>
            <Button 
                className="bg-[#d2e823] rounded-full py-1 px-4 text-black font-semibold hover:bg-[#d8e823]" 
            >
                {isCopyProfile ? 'Copied!' : 'Copy'}
            </Button>
        </div>
    </div>
  )
}
