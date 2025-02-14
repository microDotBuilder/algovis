import { useAlgorithm } from "../../Providers/AlgorithmContext";
import Visualizer from "../ui/visualizer";
import { useOnboarding } from "../../Providers/OnboardingContext";
import { OnboardingTooltip } from "../onboarding/onboarding";
import { onboardingSteps } from "../../lib/onboarding-steps";
import { useEffect, useRef } from "react";
import { toast, Id } from "react-toastify";

export default function Main() {
  const { algorithm, isSolving } = useAlgorithm();
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding } =
    useOnboarding();
  const toastId = useRef<Id | null>(null);

  useEffect(() => {
    if (algorithm && isSolving) {
      if (!toastId.current || !toast.isActive(toastId.current)) {
        toastId.current = toast.info(`Running ${algorithm}`, {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    }

    return () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    };
  }, [algorithm, isSolving]);

  return (
    <main className="flex-1 bg-gray-300 p-4">
      <div className="relative">
        {showOnboarding && currentStep === 2 && (
          <div className="absolute  inset-0 flex items-center justify-center">
            <OnboardingTooltip
              step={onboardingSteps[2]}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              completeOnboarding={completeOnboarding}
            />
          </div>
        )}
        <Visualizer />
      </div>
    </main>
  );
}
