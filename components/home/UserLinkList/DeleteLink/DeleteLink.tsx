// import { useState } from "react";
import { useUserInfo } from "@/hooks/use-user-info";
import { DeleteLinkProps } from "./DeleteLink.types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteLink(props: DeleteLinkProps) {
    const { link, onReload } = props
    //const [showDialog, setShowDialog] = useState(false)

    const { reloadUser } = useUserInfo()

    const onDelete = async () => {
        const res = await fetch(`/api/link/${link.id}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            toast.error("Error deleting link")
            return
        }

        toast.success("Link deleted 👌🏽")

        //setShowDialog(false)
        onReload(true)
        reloadUser()
    }

    {/* TODO: replace with a dialog instead of just a button */}
  return (
    <Button variant="destructive" onClick={onDelete}>
        <Trash2 className="w-4 h-4" /> 
    </Button>
  )
}
