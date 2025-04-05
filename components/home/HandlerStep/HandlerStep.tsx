import { useState } from "react";
import {
  AlertDialog,
  // AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { HandlerStepProps } from "./HandlerStep.types";
import { useStepConfig } from "@/hooks/use-step-config";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StepOne } from "../StepOne";
import { StepTwo } from "../StepTwo";

export function HandlerStep(props: HandlerStepProps) {
  const { onReload } = props
  const [openDialog, setOpenDialog] = useState(true)
  const { totalSteps, setStep, step, nextStep } = useStepConfig()

  const progressValue = (step / totalSteps) * 100

  const onCloseDialog = () => {
    onReload(true)
    setOpenDialog(false) // Close the dialog
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-1">
            {step > 1 && step < 5 && (
              <Button variant="outline" className="mr-2" onClick={() => {}}>
                Back <ArrowLeft />
              </Button>
            )}
            <div className="mb-2 text-center">
              Step {step} of {totalSteps}
            </div>
            <Progress value={progressValue} className="w-full" />
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <p>Step three</p>}
              {step === 4 && (
                <p>
                  Final step! You are almost done. Please review your information and click continue.
                </p>
              )}
              {step === 5 && <p>Final step</p>}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}