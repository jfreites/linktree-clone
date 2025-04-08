import { Link } from "@prisma/client"

export type DeleteLinkProps = {
    link: Link
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}