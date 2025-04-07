import Image from "next/image";
import { dataAvatars } from "./StepFour.data";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { Plus } from "lucide-react";
import { useStepConfig } from "@/hooks/use-step-config";
import { toast } from "sonner";

export function StepFour() {
    const { infoUser, setInfoUser, nextStep } = useStepConfig()
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [showUploadPhoto, setShowUploadPhoto] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState("")

    const handleSelectPhoto = (src: string) => {
        setSelectedPhoto(src)
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            avatarUrl: src,
        }))
    }

    const handleContinue = async () => {
        if (!name || !username) {
            alert("Please fill in both name and username.")
            return
        }

        // Set the infoUser state before continuing
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            name,
            username
        }))

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    avatarUrl: infoUser.avatarUrl,
                    links: infoUser.platforms,
                    userType: infoUser.userType,
                })
            })

            if (response.status === 200) {
                nextStep()
            }
        } catch (error) {
            toast('There was an error saving your profile. Please try again.')
            console.error("Error saving profile:", error);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center">
                Add profile details
            </h2>
            <p className="text-center">Select your profile image or upload it</p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
                {dataAvatars.map(({ src }) => (
                    <div 
                        key={src}
                        className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer *:
                                ${selectedPhoto === src ? 'bg-violeto-500': 'hover:bg-violet-300'}
                            `}
                        onClick={() => handleSelectPhoto(src)}
                    >
                        <Image
                            src={src}
                            alt="Avatar"
                            width={300}
                            height={300}
                            className="h-20 w-20 rounded-full"
                        />
                    </div>
                ))}
        
                {photoUrl && (
                    <div className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer *:
                        ${selectedPhoto === photoUrl ? 'bg-violeto-500': 'hover:bg-violet-300'}
                    `}
                        onClick={() => handleSelectPhoto(photoUrl)}
                    >
                        <Image
                            src={photoUrl}
                            alt="Avatar"
                            width={300}
                            height={300}
                            className="h-20 w-20 rounded-full object-cover aspect-square"
                        />
                    </div>
                )}

                {showUploadPhoto ? (
                    <UploadButton 
                        className="rounded-md text-slate-800 bg-slate-200 h-full" 
                        endpoint="profileImage" 
                        onClientUploadComplete={(res) => {
                            setPhotoUrl(res?.[0].ufsUrl)
                            setShowUploadPhoto(false)
                        }}
                        onUploadError={(error) => console.log(error)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center hover:bg-slate-100 h-full rounded-full cursor-pointer border" onClick={() => setShowUploadPhoto(!showUploadPhoto)}>
                        <Plus className="w-7 h-7" />
                    </div>
                )}
            </div>

            <div className="mt-5">
                <h3 className="text-lg my-3 text-center">Add your username</h3>
                <div className="grid gap-4">
                    <Input 
                        placeholder="Name" 
                        className="w-full" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <Input 
                        placeholder="Username" 
                        className="w-full" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
            </div>

            <div className="mt-6 md:mt-16">
                <Button className="w-full bg-purple-600" onClick={handleContinue}>
                    Continue
                </Button>
            </div>
        </div>
    )
}