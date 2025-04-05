import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
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
import { StepThree } from "../StepThree";
import { StepFour } from "../StepFour";
import { Summary } from "../Summary";

export function HandlerStep(props: HandlerStepProps) {
  const { onReload } = props
  const [openDialog, setOpenDialog] = useState(true)
  const { totalSteps, step, prevStep } = useStepConfig()

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
              <Button variant="outline" className="mr-2" onClick={prevStep}>
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
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour />}
              {step === 5 && <Summary onReload={onCloseDialog} />}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}