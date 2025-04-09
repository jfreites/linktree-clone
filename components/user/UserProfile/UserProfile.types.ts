import { User, Link } from "@prisma/client";

export type UserProfileProps = {
    user: User & { links: Link[] }
}