import { Button } from "@/components/ui/button";
import { dataCreator } from "./StepTwo.data";
import { useStepConfig } from "@/hooks/use-step-config";

export function StepTwo() {
  const { setInfoUser, nextStep } = useStepConfig()

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">Which platform are you on?</h2>
      <p className="text-center">Pick the ones that you are on.</p>
      
      <div className="grid grid-cols-1 gap-2 mt-4">
        <p>iconos</p>
      </div>

      <div className="mt-6">
        <Button className="w-full bg-purple-600" onClick={nextStep}>Continue</Button>
      </div>
    </div>
  )
}