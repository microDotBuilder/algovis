import { useAlgorithm } from "../../Providers/AlgorithmContext";
import Visualizer from "../ui/visualizer";
import { useOnboarding } from "../../Providers/OnboardingContext";
import { OnboardingTooltip } from "../onboarding/onboarding";
import { onboardingSteps } from "../../lib/onboarding-steps";

export default function Main() {
  const { algorithm, isSolving } = useAlgorithm();
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding } =
    useOnboarding();

  return (
    <main className="flex-1 bg-gray-300 p-4">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex">
          {algorithm && isSolving && (
            <p className="text-2xl font-mono"> Running {algorithm}</p>
          )}
        </div>
      </div>
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
