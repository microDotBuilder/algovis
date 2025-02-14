import { gridDb } from "../localdb/dexie";
import { GridState } from "../types/types";
import Node from "../lib/node";

export async function saveGridState(
  grid: Node[][],
  name: string = `Grid State ${new Date().toLocaleString()}`
) {
  // Find start and end nodes
  let startNode = null;
  let endNode = null;
  const walls: { row: number; col: number }[] = [];

  // Scan the grid to collect state
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const node = grid[row][col];
      if (node.getIsStart()) {
        startNode = { row, col };
      } else if (node.getIsEnd()) {
        endNode = { row, col };
      } else if (node.getIsWall()) {
        walls.push({ row, col });
      }
    }
  }

  const state: Omit<GridState, "id" | "createdAt"> = {
    startNode,
    endNode,
    walls,
    name,
  };
  console.log("the saved state is ", state);

  return await gridDb.saveGridState(state);
}

export async function loadGridState(id: number) {
  return await gridDb.loadGridState(id);
}

export async function getAllGridStates() {
  return await gridDb.getAllGridStates();
}

export async function deleteGridState(id: number) {
  return await gridDb.deleteGridState(id);
}

// Helper function to apply a grid state to an existing grid
export function applyGridState(grid: Node[][], state: GridState) {
  // Reset all nodes
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const node = grid[row][col];
      node.setIsStart(false);
      node.setIsEnd(false);
      node.setIsWall(false);
    }
  }

  // Apply start node
  if (state.startNode) {
    grid[state.startNode.row][state.startNode.col].setIsStart(true);
  }

  // Apply end node
  if (state.endNode) {
    grid[state.endNode.row][state.endNode.col].setIsEnd(true);
  }

  // Apply walls
  for (const wall of state.walls) {
    grid[wall.row][wall.col].setIsWall(true);
  }
}
