import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import Node from "./node";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function saveCurrentState(grid: Node[][], saveGridState: any) {
//   const { startNode, endNode, wallNodes } = getStartEndWallNodes(grid);
//   saveGridState({
//     grid,
//     startNode,
//     endNode,
//     wallNodes,
//   });
// }

// export function getStartEndWallNodes(grid: Node[][]) {
//   const startNode = grid.find((row) => row.some((node) => node.isStart));
//   const endNode = grid.find((row) => row.some((node) => node.isEnd));
//   const wallNodes = grid.flatMap((row) => row.filter((node) => node.isWall));
//   return { startNode, endNode, wallNodes };
// }
