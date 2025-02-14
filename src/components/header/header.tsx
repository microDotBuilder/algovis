import { Button } from "../../components/ui/button";
import { NewAlgorithmSelector } from "../ui/select/AlgorithmSelector";
import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { PauseIcon, PlayIcon } from "lucide-react";
import WarnDialog from "../ui/dialog/warnDialog";
import { useState } from "react";
import { toast } from "react-toastify";
// import { saveGridState } from "../../utils/grid";
/**
 * @deprecated This component is deprecated and will be removed in a future version.
 * Please use the NewHeader component instead.
 */
export default function Header() {
  const {
    algorithm,
    setAlgorithm,
    startSolving,
    stopSolving,
    isPaused,
    pauseSolving,
    resumeSolving,
    isSolving,
    setIsReset,
  } = useAlgorithm();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleSolveClick = () => {
    if (algorithm) {
      // want to store the current state of the grid in the local db
      // saveGridState(grid);
      startSolving();
    } else {
      toast.error("Please select an algorithm first");
    }
  };

  const handlePauseResumeClick = () => {
    if (isPaused) {
      resumeSolving();
    } else {
      pauseSolving();
    }
  };

  const handleResetClick = () => {
    if (isSolving) {
      pauseSolving();
    }
    setIsResetDialogOpen(true);
  };

  const handleResetConfirm = () => {
    // toast.info("Resetting grid...");
    // Stop any running animation first
    stopSolving();
    // Set reset state to true
    setIsReset(true);
    setIsResetDialogOpen(false);
    toast.success("Grid has been reset! Select a start node to begin.");
  };

  const handleResetCancel = () => {
    if (isSolving) {
      resumeSolving();
    }
    setIsResetDialogOpen(false);
  };

  return (
    <>
      <header className="bg-gray-200 p-4 h-full flex w-full justify-center items-center">
        <div className="flex gap-4 justify-between w-full">
          <div className="flex gap-4 font-mono text-2xl">
            ALGORITHM VISUALIZER
          </div>
          <NewAlgorithmSelector setAlgo={setAlgorithm} />
          <nav>
            <ul className="flex gap-4">
              <Button
                variant="default"
                onClick={handleSolveClick}
                disabled={isSolving}
              >
                Solve
              </Button>
              {isSolving && (
                <Button variant="secondary" onClick={handlePauseResumeClick}>
                  {isPaused ? (
                    <>
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <PauseIcon className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
              )}
              <Button variant="destructive" onClick={handleResetClick}>
                Reset
              </Button>
            </ul>
          </nav>
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
