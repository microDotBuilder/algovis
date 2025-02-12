import { createContext, useContext, useState, ReactNode } from "react";
import { GRAPH_ALGORITHMS } from "@/utils/consts";

export type Algorithm =
  | (typeof GRAPH_ALGORITHMS)[keyof typeof GRAPH_ALGORITHMS]
  | "";

interface AlgorithmContextType {
  algorithm: Algorithm;
  setAlgorithm: (algo: Algorithm) => void;
  isSolving: boolean;
  isPaused: boolean;
  isReset: boolean;
  startSolving: () => void;
  pauseSolving: () => void;
  resumeSolving: () => void;
  stopSolving: () => void;
  setIsReset: (value: boolean) => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined
);

export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("");
  const [isSolving, setIsSolving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const startSolving = () => {
    setIsSolving(true);
    setIsPaused(false);
    setIsReset(false);
  };

  const pauseSolving = () => {
    setIsPaused(true);
  };

  const resumeSolving = () => {
    setIsPaused(false);
  };

  const stopSolving = () => {
    setIsSolving(false);
    setIsPaused(false);
  };

  return (
    <AlgorithmContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        isSolving,
        isPaused,
        isReset,
        startSolving,
        pauseSolving,
        resumeSolving,
        stopSolving,
        setIsReset,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
}

export function useAlgorithm() {
  const context = useContext(AlgorithmContext);
  if (context === undefined) {
    throw new Error("useAlgorithm must be used within an AlgorithmProvider");
  }
  return context;
}
