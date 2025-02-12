import Node from "../lib/node";

export const GRID_ROWS = 20; // Reasonable size for visualization
export const GRID_COLS = 50; // Wider grid for better visualization

export function initializeGrid(): Node[][] {
  const grid: Node[][] = [];

  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(new Node(col, row));
    }
    grid.push(currentRow);
  }

  // Set up neighbors for each node
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const node = grid[row][col];
      const neighbors: Node[] = [];

      // Check all 4 directions (up, right, down, left)
      const directions = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
      ];

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < GRID_ROWS &&
          newCol >= 0 &&
          newCol < GRID_COLS
        ) {
          neighbors.push(grid[newRow][newCol]);
        }
      }

      node.setNeighbors(neighbors);
    }
  }

  return grid;
}

// Helper function to reset the grid to its initial state
export function resetGrid(grid: Node[][]): void {
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const node = grid[row][col];
      node.setIsVisited(false);
      node.setDistance(Infinity);
      node.setPrevious(null);
      // Don't reset walls, start, and end positions
    }
  }
}
