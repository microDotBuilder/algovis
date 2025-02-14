export interface OnboardingStep {
  title: string;
  description: string;
  target: string;
  placement: "top" | "bottom" | "left" | "right" | "middle";
}

export interface GridState {
  id?: number;
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
  walls: { row: number; col: number }[];
  createdAt: Date;
  name?: string;
}

export interface VisualizerState {
  id?: number;
  algorithm: string;
  grid: GridNode[][];
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
  walls: { row: number; col: number }[];
  createdAt: Date;
  name?: string;
  description?: string;
}

export interface GridNode {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
}
