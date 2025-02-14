import { Button } from "../../components/ui/button";
import { NewAlgorithmSelector } from "../ui/select/AlgorithmSelector";
import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { RefreshCcw, FolderOpen } from "lucide-react";
import WarnDialog from "../ui/dialog/warnDialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "../ui/button/ActionButton";
import { useOnboarding } from "../../Providers/OnboardingContext";
import { OnboardingTooltip } from "../onboarding/onboarding";
import { onboardingSteps } from "../../lib/onboarding-steps";
import { useGrid } from "../../Providers/GridContext";
import { getAllGridStates, applyGridState } from "../../utils/gridState";

export default function NewHeader() {
  const {
    state: { grid },
    setStartNode,
    setEndNode,
  } = useGrid();
  const { stopSolving, isSolving, pauseSolving, setIsReset, setAlgorithm } =
    useAlgorithm();
  const { showOnboarding, currentStep, setCurrentStep, completeOnboarding } =
    useOnboarding();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleResetClick = () => {
    if (isSolving) {
      pauseSolving();
    }
    setIsResetDialogOpen(true);
  };

  const handleResetConfirm = () => {
    stopSolving();
    setIsReset(true);
    setIsResetDialogOpen(false);
    toast.success("Grid has been reset! Select a start node to begin.");
  };

  const handleResetCancel = () => {
    setIsResetDialogOpen(false);
  };

  const handleReloadState = async () => {
    try {
      const states = await getAllGridStates();
      if (states.length > 0) {
        const lastState = states[0]; // Get the most recent state
        // Reset visualization state for all nodes
        for (let row = 0; row < grid.length; row++) {
          for (let col = 0; col < grid[0].length; col++) {
            const node = grid[row][col];
            node.setIsVisited(false);
            node.setDistance(Infinity);
            node.setPrevious(null);
          }
        }
        applyGridState(grid, lastState);
        // Update internal state tracking
        setStartNode(lastState.startNode);
        setEndNode(lastState.endNode);
        toast.success("Successfully loaded the last saved grid state!");
      } else {
        toast.info("No saved grid states found.");
      }
    } catch (error) {
      console.error("Failed to load grid state:", error);
      toast.error("Failed to load the grid state.");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-20 items-center justify-between gap-4">
          <h1 className=" text-2xl font-semibold font-mono tracking-tight">
            Algorithm Visualizer
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative algorithm-select">
              <NewAlgorithmSelector setAlgo={setAlgorithm} />
              {showOnboarding && currentStep === 1 && (
                <OnboardingTooltip
                  step={onboardingSteps[1]}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  completeOnboarding={completeOnboarding}
                />
              )}
            </div>
            <div className="relative action-buttons">
              <div className="flex items-center gap-2">
                <ActionButton />
                <Button variant="outline" size="sm" onClick={handleReloadState}>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Reload State
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-10"
                  onClick={handleResetClick}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
              {showOnboarding && currentStep === 3 && (
                <OnboardingTooltip
                  step={onboardingSteps[3]}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  completeOnboarding={completeOnboarding}
                />
              )}
            </div>
          </div>
        </div>
      </header>
      <WarnDialog
        isOpen={isResetDialogOpen}
        onOpenChange={setIsResetDialogOpen}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
      />
    </>
  );
}
