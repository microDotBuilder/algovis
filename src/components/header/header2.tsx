import { Button } from "../../components/ui/button";
import { NewAlgorithmSelector } from "../ui/select/AlgorithmSelector";
import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { RefreshCcw } from "lucide-react";
import WarnDialog from "../ui/dialog/warnDialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "../ui/button/ActionButton";

export default function NewHeader() {
  const { stopSolving, isSolving, pauseSolving, setIsReset, setAlgorithm } =
    useAlgorithm();

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
            </div>
            <div className="relative action-buttons">
              <div className="flex items-center gap-2">
                <ActionButton />
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
