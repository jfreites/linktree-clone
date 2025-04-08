import { useUserInfo } from "@/hooks/use-user-info"
import Image from "next/image"


export function SocialNetworkList() {
  const {links} = useUserInfo()

  if (!links) return null

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        {links?.map(link => (
            <li key={link.id}>
                <a href={link.url || ''} target="_blank" rel="noreferrer">
                    <Image src={link.icon || ''} alt="icon" width={40} height={40} className="bg-white rounded-full object-cover aspect-square" />
                </a>
            </li>
        ))}
    </ul>
  )
}

