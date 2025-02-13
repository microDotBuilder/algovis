import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface OnboardingContextType {
  showOnboarding: boolean;
  currentStep: number;
  setShowOnboarding: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const completed = localStorage.getItem("onboardingCompleted");
    return completed !== "true";
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Debug logs
  useEffect(() => {
    console.log("Onboarding state:", { showOnboarding, currentStep });
  }, [showOnboarding, currentStep]);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    setCurrentStep(0);
    localStorage.setItem("onboardingCompleted", "true");
  };

  return (
    <OnboardingContext.Provider
      value={{
        showOnboarding,
        currentStep,
        setShowOnboarding,
        setCurrentStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
