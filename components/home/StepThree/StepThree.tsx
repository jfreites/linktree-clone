import { Button } from "@/components/ui/button"
import { useStepConfig } from "@/hooks/use-step-config"
import Image from "next/image"

export function StepThree() {
  const { setInfoUser, infoUser, nextStep } = useStepConfig()

  const handleContinue = () => {
    const updatedPlatforms = infoUser.platforms.map(({ icon, name }) => {
        // Get the input value for each platform
        const inputElement = document.getElementById(`${name}-input`) as HTMLInputElement | null
        const url = inputElement ? inputElement.value : ''
        
        // TODO: make a fix to add the domain for each platform and append the handle
        return {
            icon,
            name,
            url: url.trim() ? url : '', // Ensure we don't save empty strings
        }
    })

    setInfoUser((prevInfoUser) => ({
        ...prevInfoUser,
        platforms: updatedPlatforms, // Update the platforms with the new URLs
    }))

    nextStep()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center">Add your links</h2>
      <p className="text-center">Complete the fields to add your links.</p>

      {infoUser.platforms.map(({ icon, url, name}) => (
        <div key={name} className="flex items-center gap-2 mt-4">
            <div className="flex flex-col gap-2 items-center">
                <Image src={icon} alt={name} width={40} height={40} />
            </div>
            <input 
                type="text" 
                id={`${name}-input`} 
                placeholder={`Add your ${name} handle`} 
                className="w-full rounded-lg border p-2 text-md" 
                defaultValue={url} 
            />
        </div>
      ))}

      <div className="mt-6">
        <Button className="w-full bg-purple-600" onClick={handleContinue}>
            Continue
        </Button>
      </div>
    </div>
  )
}