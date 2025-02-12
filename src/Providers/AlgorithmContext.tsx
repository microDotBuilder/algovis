import { createContext, useContext, useState, ReactNode } from "react";
import { GRAPH_ALGORITHMS } from "@/utils/consts";

export type Algorithm =
  | (typeof GRAPH_ALGORITHMS)[keyof typeof GRAPH_ALGORITHMS]
  | "";

interface AlgorithmContextType {
  algorithm: Algorithm;
  setAlgorithm: (algo: Algorithm) => void;
  isSolving: boolean;
  startSolving: () => void;
  stopSolving: () => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined
);

export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("");
  const [isSolving, setIsSolving] = useState(false);

  const startSolving = () => setIsSolving(true);
  const stopSolving = () => setIsSolving(false);

  return (
    <AlgorithmContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        isSolving,
        startSolving,
        stopSolving,
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
