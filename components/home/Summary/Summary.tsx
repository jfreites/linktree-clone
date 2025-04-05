import { useStepConfig } from "@/hooks/use-step-config";
import { SummaryProps } from "./Summary.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/shared/Confetti";

export function Summary(props: SummaryProps) {
    const { onReload } = props;
    const { infoUser } = useStepConfig()
    const { avatarUrl, name, username, userType, platforms } = infoUser

    return (
        <div>
            <h2 className="text-2xl text-center font-semibold">
                Your profile is ready
            </h2>
            <p className="text-center">It&apos;s time top share to the world.</p>

            <div className="relative">
                <div className="flex justify-center mt-4">
                    <Image src={avatarUrl} alt={username} width={120} height={120} className="rounded-full border-4 border-white shadow-xl aspect-square object-cover" />
                </div>
                <div>
                    <div className="text-center space-y-2 mt-2">
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        <p className="text-sm text-ggray-500">@{username}</p>
                        <p className="text-sm text-gray-400">{userType}</p>
                    </div>
                    <div className="space-y-3 mt-4">
                        {platforms.map((platform) => (
                            <div key={platform.name}className="flex items-center gap-2">
                                <Image
                                    src={platform.icon}
                                    alt={platform.name}
                                    width={24}
                                    height={24}
                                    className="inline-block mr-2"
                                />
                                <p className="text-sm font-medium text-gray-700">{platform.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Confetti />

                <div>
                    <Button 
                        className="w-full bg-purple-600 mt-5"
                        onClick={onReload}
                    >
                        Continue to the profile
                    </Button>
                </div>
            </div>
        </div>
    );
}