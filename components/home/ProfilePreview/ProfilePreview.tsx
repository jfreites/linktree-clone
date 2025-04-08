import { useUserInfo } from "@/hooks/use-user-info";
import { Lock } from "lucide-react";
import { ButtonHeader } from "./ButtonHeader";
import { ButtonCopyProfile } from "./ButtonCopyProfile";
import { PhonePreview } from "./PhonePreview";

export function ProfilePreview() {
    const { user } = useUserInfo()

  return (
    <div className="border-l-[#e0e2d9] border-[1px] border-transparent px-2">
        <ButtonHeader />

        <ButtonCopyProfile />

        <PhonePreview />

        <div className="flex items-center justify-center mt-10">
            <p className="flex gap-1 items-center font-semibold cursor-pointer">hide Linktree logo</p>
            <Lock className="h-4 w-4" />
        </div>
    </div> 
  )
}
