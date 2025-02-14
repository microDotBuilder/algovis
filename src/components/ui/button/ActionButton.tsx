import { Button } from "../button";
import { PauseIcon, Play, PlayIcon } from "lucide-react";
import { useAlgorithm } from "../../../Providers/AlgorithmContext";
import { toast } from "react-toastify";
import { saveGridState } from "../../../utils/gridState";
import { useGrid } from "../../../Providers/GridContext";

export function ActionButton() {
  const {
    state: { grid },
  } = useGrid();
  const {
    algorithm,
    startSolving,
    isPaused,
    pauseSolving,
    resumeSolving,
    isSolving,
  } = useAlgorithm();

  const handleClick = async () => {
    if (!isSolving) {
      if (algorithm) {
        try {
          console.log("Saving grid state");
          // Save grid state before starting
          await saveGridState(
            grid,
            `${algorithm} - ${new Date().toLocaleString()}`
          );
          console.log("Grid state saved");
          startSolving();
        } catch (error) {
          console.error("Failed to save grid state:", error);
          // Continue with solving even if saving fails
          startSolving();
        }
      } else {
        toast.error("Please select an algorithm first");
      }
    } else {
      if (isPaused) {
        resumeSolving();
      } else {
        pauseSolving();
      }
    }
  };

  const getButtonContent = () => {
    if (!isSolving) {
      return (
        <>
          <Play className="mr-2 h-4 w-4" />
          Solve
        </>
      );
    }

    if (isPaused) {
      return (
        <>
          <PlayIcon className="w-4 h-4 mr-2" />
          Resume
        </>
      );
    }

    return (
      <>
        <PauseIcon className="w-4 h-4 mr-2" />
        Pause
      </>
    );
  };

  return (
    <Button
      size="sm"
      className="text-[10px] h-10"
      variant={isSolving && isPaused ? "secondary" : "default"}
      onClick={handleClick}
    >
      {getButtonContent()}
    </Button>
  );
}
