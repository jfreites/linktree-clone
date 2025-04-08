import Image from "next/image";
import { UserLinkListProps } from "./UserLinkList.types";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditLink } from "./EditLink";
import { DeleteLink } from "./DeleteLink";


export function UserLinkList(props: UserLinkListProps) {
  const {links, onReload} = props
  
  return (
    <div className="grid gap-6 mt-8 max-w-2xl mx-auto">
        {links.map((link) => (
            <div key={link.id} className="bg-white rounded-full gap-4 items-center justify-between px-8 py-4 flex">
                <div className="flex gap-2 items-center">
                    <Image 
                        src={link.icon || ''} 
                        alt="icon" 
                        width={50} 
                        height={50}
                        className="w-10 h-10"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm">{link.name}</span>
                        <span className="text-xs text-slate-500">{link.url}</span>
                    </div>  
                </div>

                <div className="flex gap-4 items-center">
                    <Button asChild variant="outline">
                        <Link href={`http://domain.com/${link.url}`} target="_blank">
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </Button>

                    <EditLink link={link} onReload={onReload} />

                    <DeleteLink link={link} onReload={onReload} />
                </div>
            </div>
        ))}
    </div>
  )
}
