import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog/dialog";

interface WelcomeDialogProps {
  showOnboarding: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
}

export function WelcomeDialog({
  showOnboarding,
  setCurrentStep,
  completeOnboarding,
}: WelcomeDialogProps) {
  const handleNext = () => {
    setCurrentStep(1); // Move to the next step (header tooltip)
  };

  return (
    <Dialog open={showOnboarding} onOpenChange={completeOnboarding}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Algorithm Visualizer! 🎉</DialogTitle>
          <DialogDescription>
            This tool helps you visualize and understand how different
            algorithms work. Let's get you started with a quick tour.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={completeOnboarding}>
            Skip Tour
          </Button>
          <Button onClick={handleNext}>Start Tour</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
