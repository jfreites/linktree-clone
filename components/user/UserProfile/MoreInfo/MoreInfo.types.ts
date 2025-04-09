import { User, Link } from "@prisma/client";

export type MoreInfoProps = {
    user: User & { links: Link[] }
}