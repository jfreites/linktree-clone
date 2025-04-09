import Image from "next/image";
import { UserProfileProps } from "./UserProfile.types";
import { ExternalLink, TreePalm } from "lucide-react";
import { MoreInfo } from "./MoreInfo";
import Link from "next/link";

export function UserProfile(props: UserProfileProps) {
  const { user } = props;

  return (
    <div className="flex flex-col items-center justify-between gap-2 h-screen max-w-2xl mx-auto">
        {user?.backgroundImage ? (
            <Image
                src={user.backgroundImage}
                alt="background image"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full"
            />
        ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-[#e4e9ed]" />
        )}

        <div className="flex flex-col items-center gap-2 pt-32 w-full px-5 z-10">
            <MoreInfo user={user} />

            <div>
                <Image
                    src={user.avatarUrl || "/images/default_avatar.png"}
                    alt="avatar"
                    width={96}
                    height={96}
                    className="rounded-full aspect-square object-cover"
                />
            </div>

            <div>
                <p className="font-semibold text-2xl text-blue-700 text-center">@{user.username}</p>

                {user?.bio && (
                    <div className="my-2">
                        <p className="text-center">{user.bio}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-5 mt-10">
                {user.links.map((link) => (
                    <div
                        key={link.id}
                        className="bg-cyan-900 text-white rounded-full w-[400px] px-8 py-4 items-center justify-center hover:bg-violet-200 hover:text-violet-800 transition-all duration-200"
                    >
                        <Link href={link.url || ''} target="_blank" className="flex justify-between items-center">
                            <Image 
                                src={link.icon || ''} 
                                alt={link.name || 'icon'} 
                                width={30} 
                                height={30} 
                                className="hover:scale-110 transition-all duration-200"
                            />
                            <p className="text-lg font-medium">{link.name}</p>
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
 
        <div className="pb-5 z-10">
           <div className="flex gap-2 items-center justify-center py-2 px-5 bg-white shadow-lg rounded-full">
                Linktree Clone <TreePalm className="w-5 h-5 text-black" />
           </div>
        </div>
    </div>
  )
}
