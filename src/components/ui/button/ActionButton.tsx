import { Button } from "../button";
import { PauseIcon, Play, PlayIcon } from "lucide-react";
import { useAlgorithm } from "../../../Providers/AlgorithmContext";
import { toast } from "react-toastify";

export function ActionButton() {
  const {
    algorithm,
    startSolving,
    isPaused,
    pauseSolving,
    resumeSolving,
    isSolving,
  } = useAlgorithm();

  const handleClick = () => {
    if (!isSolving) {
      if (algorithm) {
        startSolving();
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
