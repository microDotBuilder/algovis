import { useRef } from "react";
import { toast, Id } from "react-toastify";

export function useToast() {
  const toastId = useRef<Id | null>(null);
  const hasShownInitialToast = useRef(false);

  const showToast = (message: string) => {
    if (!hasShownInitialToast.current) {
      toastId.current = toast.info(message, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      hasShownInitialToast.current = true;
    }
  };

  const resetToast = () => {
    hasShownInitialToast.current = false;
    if (toastId.current) {
      toast.dismiss(toastId.current);
      toastId.current = null;
    }
  };

  return { showToast, resetToast };
}
