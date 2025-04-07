import { ChevronLeft } from "lucide-react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/use-user-info";

export function TabDeleteImage(props: TabDeleteImageProps) {
  const { setShowDialog, setShowTab } = props;
  const { reloadUser } = useUserInfo()

  const onRemoveImage = async () => {
    await fetch("/api/update-user", {
      method: "PATCH",
      body: JSON.stringify({
        avatarUrl: "https://utfs.io/f/bpEOpEJjI8zKfrntqYKQYwi4Ps0tZFVEIkKl6JUbNDq3XOoA",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    setShowDialog(false);
    toast.success("Image removed successfully");
    reloadUser()
  }

  return (
    <div>
      <div 
      className="flex gap-1 items-center text-sm coursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Button className="bg-violet-600 text-white rounded-full" onClick={onRemoveImage}
          >
            Yes, remove it
        </Button>

        <Button variant="outline" className="rounded-full" onClick={() => setShowTab(null)}
          >
            Cancel
        </Button>
      </div>
    </div>
  )
}
