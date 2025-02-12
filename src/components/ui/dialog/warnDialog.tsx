import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Button } from "../button";

interface WarnDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WarnDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
}: WarnDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Grid</DialogTitle>
          <DialogDescription>
            Are you sure you want to reset the grid? This will clear all walls
            and stop the current animation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
