import { cn } from "@/lib/utils";
import { OnboardingStep } from "@/types/types";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-steps";

export const OnboardingTooltip = ({
  step,
  currentStep,
  setCurrentStep,
  completeOnboarding,
}: {
  step: OnboardingStep;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
}) => {
  return (
    <div
      className={cn(
        "absolute z-50 w-80 bg-white rounded-lg shadow-lg p-4 border",
        {
          "top-full mt-2": step.placement === "bottom",
          "bottom-full mb-2": step.placement === "top",
          "left-full ml-2": step.placement === "right",
          "right-full mr-2": step.placement === "left",
        }
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-xs">{step.title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={completeOnboarding}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-[10px] leading-relaxed text-muted-foreground mb-4">
        {step.description}
      </p>
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-[10px] h-8"
          onClick={completeOnboarding}
        >
          Skip
        </Button>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] h-8"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          <Button
            size="sm"
            className="text-[10px] h-8"
            onClick={() => {
              if (currentStep === onboardingSteps.length - 1) {
                completeOnboarding();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === onboardingSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
