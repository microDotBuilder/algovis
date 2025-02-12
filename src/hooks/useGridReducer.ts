import { useReducer } from "react";
import Node from "../lib/node";
import { initializeGrid } from "../utils/grid";

export type NodeSelection = "START" | "END" | "WALL" | null;

export interface GridState {
  grid: Node[][];
  isMousePressed: boolean;
  selectionMode: NodeSelection;
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
}

export type GridAction =
  | { type: "SET_GRID"; payload: Node[][] }
  | { type: "SET_MOUSE_PRESSED"; payload: boolean }
  | { type: "SET_SELECTION_MODE"; payload: NodeSelection }
  | { type: "SET_START_NODE"; payload: { row: number; col: number } | null }
  | { type: "SET_END_NODE"; payload: { row: number; col: number } | null }
  | {
      type: "UPDATE_NODE";
      payload: { row: number; col: number; updates: Partial<Node> };
    }
  | { type: "CLEAR_NODE"; payload: { row: number; col: number } };

const initialState: GridState = {
  grid: [],
  isMousePressed: false,
  selectionMode: null,
  startNode: null,
  endNode: null,
};

function resetNodeState(node: Node) {
  node.setIsStart(false);
  node.setIsEnd(false);
  node.setIsWall(false);
  node.setIsVisited(false);
  node.setDistance(Infinity);
  node.setPrevious(null);
}

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case "SET_GRID":
      return { ...state, grid: action.payload };

    case "SET_MOUSE_PRESSED":
      return { ...state, isMousePressed: action.payload };

    case "SET_SELECTION_MODE":
      return { ...state, selectionMode: action.payload };

    case "SET_START_NODE":
      return { ...state, startNode: action.payload };

    case "SET_END_NODE":
      return { ...state, endNode: action.payload };

    case "UPDATE_NODE": {
      const newGrid = state.grid.slice();
      const node = newGrid[action.payload.row][action.payload.col];
      Object.assign(node, action.payload.updates);
      return { ...state, grid: newGrid };
    }

    case "CLEAR_NODE": {
      const newGrid = state.grid.slice();
      const node = newGrid[action.payload.row][action.payload.col];
      resetNodeState(node);
      return { ...state, grid: newGrid };
    }

    default:
      return state;
  }
}

export function useGridReducer() {
  const [state, dispatch] = useReducer(gridReducer, {
    ...initialState,
    grid: initializeGrid(),
  });

  return {
    state,
    dispatch,
    // Helper functions to make common operations easier
    setGrid: (grid: Node[][]) => dispatch({ type: "SET_GRID", payload: grid }),
    setMousePressed: (pressed: boolean) =>
      dispatch({ type: "SET_MOUSE_PRESSED", payload: pressed }),
    setSelectionMode: (mode: NodeSelection) =>
      dispatch({ type: "SET_SELECTION_MODE", payload: mode }),
    setStartNode: (node: { row: number; col: number } | null) =>
      dispatch({ type: "SET_START_NODE", payload: node }),
    setEndNode: (node: { row: number; col: number } | null) =>
      dispatch({ type: "SET_END_NODE", payload: node }),
    updateNode: (row: number, col: number, updates: Partial<Node>) =>
      dispatch({
        type: "UPDATE_NODE",
        payload: { row, col, updates },
      }),
    clearNode: (row: number, col: number) =>
      dispatch({ type: "CLEAR_NODE", payload: { row, col } }),
  };
}
