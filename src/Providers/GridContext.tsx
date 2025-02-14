import { createContext, useContext, ReactNode } from "react";
import Node from "../lib/node";
import { useGridReducer, GridState } from "../hooks/useGridReducer";

interface GridContextType {
  state: GridState;
  setGrid: (grid: Node[][]) => void;
  setMousePressed: (pressed: boolean) => void;
  setSelectionMode: (mode: "START" | "END" | "WALL" | null) => void;
  setStartNode: (node: { row: number; col: number } | null) => void;
  setEndNode: (node: { row: number; col: number } | null) => void;
  updateNode: (row: number, col: number, updates: Partial<Node>) => void;
  clearNode: (row: number, col: number) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export function GridProvider({ children }: { children: ReactNode }) {
  const {
    state,
    setGrid,
    setMousePressed,
    setSelectionMode,
    setStartNode,
    setEndNode,
    updateNode,
    clearNode,
  } = useGridReducer();

  return (
    <GridContext.Provider
      value={{
        state,
        setGrid,
        setMousePressed,
        setSelectionMode,
        setStartNode,
        setEndNode,
        updateNode,
        clearNode,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
}
