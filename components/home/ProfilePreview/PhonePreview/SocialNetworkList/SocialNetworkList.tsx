import { useUserInfo } from "@/hooks/use-user-info"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export function SocialNetworkList() {
  const {links} = useUserInfo()

  if (!links) return null

  return (
    <div className="flex flex-col gap-5 mt-10 w-full">
        {links?.map(link => (
          <div
              key={link.id}
              className="bg-cyan-900 text-white rounded-full w-full px-4 py-2 items-center justify-center shadow-md hover:bg-violet-200 hover:text-violet-800 transition-all duration-200"
          >
              <Link href={link.url || ''} target="_blank" className="flex justify-between items-center">
                  <Image 
                      src={link.icon || ''} 
                      alt={link.name || 'icon'} 
                      width={30} 
                      height={30} 
                      className="hover:scale-110 transition-all duration-200 filter grayscale"
                  />
                  <p className="font-medium">{link.name}</p>
                  <ExternalLink className="w-5 h-5" />
              </Link>
          </div>
        ))}
    </div>
  )
}

