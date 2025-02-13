import { Button } from "../components/ui/button";
import { Dialog, DialogContent } from "../components/ui/dialog/dialog";

export const WelcomeDialog = ({
  showOnboarding,
  currentStep,
  setCurrentStep,
  completeOnboarding,
}: {
  showOnboarding: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
}) => {
  return (
    <Dialog open={showOnboarding && currentStep === 0}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight">Welcome!</h2>
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Ready to explore algorithms visually? Let's get you started with a
              quick tour.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="text-[10px] h-8"
              onClick={completeOnboarding}
            >
              Skip tutorial
            </Button>
            <Button
              className="text-[10px] h-8"
              onClick={() => setCurrentStep(1)}
            >
              Start tour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
