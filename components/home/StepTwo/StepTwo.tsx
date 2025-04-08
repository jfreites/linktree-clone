import { Button } from "@/components/ui/button";
import { data } from "@/data/socialNetworkList";
import { useStepConfig } from "@/hooks/use-step-config";
import Image from "next/image";
import { useState } from "react";

export function StepTwo() {
  const { setInfoUser, infoUser, nextStep } = useStepConfig()

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    infoUser?.platforms?.map((platform) => platform.name) || []
  )

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatforms((prevSelected) => {
      if (prevSelected.includes(platform)) {
        // If already selected, remove it from the array
        return prevSelected.filter((item) => item !== platform)
      } else {
        // If not selected, add it to the array
        return [...prevSelected, platform]
      }
    })
  }

  const handleContinue = () => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      platforms: data.filter(({ name }) => selectedPlatforms.includes(name))
    }))

    nextStep() // Proceed to the next step
  }

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Which platform are you on?</h2>
      <p className="text-center">Pick the ones that you are on.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-4 bg-white">
        {data.map(({ icon, name }) => (
          <div 
            key={name} 
            className={`flex flex-col gap-1 items-center rounded-lg py-3 hover:bg-violet-300 transition-all duration-300 cursor-pointer 
              ${selectedPlatforms.includes(name) ? 'bg-violet-700 text-white' : 'bg-slate-200 text-violet-900'}`}
            onClick={() => handleSelectPlatform(name)}
          >
            <Image src={icon} alt={name} width={40} height={40} />
            <p className="text-sm">{name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="w-full bg-purple-600" onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  )
}