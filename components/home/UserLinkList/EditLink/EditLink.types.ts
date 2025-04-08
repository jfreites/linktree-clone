import { Link } from "@prisma/client"

export type EditLinkProps = {
    link: Link
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}