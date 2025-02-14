import Node from "../../src/lib/node";

export interface BellmanFordResult {
  visitedNodesInOrder: Node[];
  shortestPath: Node[];
}

const reconstructPath = (parentMap: Map<Node, Node>, endNode: Node): Node[] => {
  const path: Node[] = [];
  let current: Node | undefined = endNode;

  while (current) {
    path.unshift(current);
    current = parentMap.get(current);
  }

  return path;
};

// Helper function to get all edges in the grid
const getAllEdges = (grid: Node[][]): { from: Node; to: Node }[] => {
  const edges: { from: Node; to: Node }[] = [];

  for (const row of grid) {
    for (const node of row) {
      if (!node.isWall) {
        const neighbors = node.getNeighbors();
        for (const neighbor of neighbors) {
          if (!neighbor.isWall) {
            edges.push({ from: node, to: neighbor });
          }
        }
      }
    }
  }

  return edges;
};

export const bellmanFord = (
  startNode: Node,
  endNode: Node,
  grid: Node[][]
): BellmanFordResult => {
  const visitedNodesInOrder: Node[] = [];
  const distances = new Map<Node, number>();
  const parentMap = new Map<Node, Node>();
  const edges = getAllEdges(grid);

  // Initialize distances
  for (const row of grid) {
    for (const node of row) {
      distances.set(node, Infinity);
    }
  }
  distances.set(startNode, 0);

  // Relax edges |V| - 1 times
  const V = grid.length * grid[0].length; // Total number of vertices
  for (let i = 0; i < V - 1; i++) {
    let hasChanges = false;

    for (const { from, to } of edges) {
      const fromDist = distances.get(from) ?? Infinity;
      const toDist = distances.get(to) ?? Infinity;

      // Since our graph is unweighted, edge weight is 1
      if (fromDist !== Infinity && fromDist + 1 < toDist) {
        distances.set(to, fromDist + 1);
        parentMap.set(to, from);
        if (!visitedNodesInOrder.includes(to)) {
          visitedNodesInOrder.push(to);
        }
        hasChanges = true;
      }
    }

    // If no changes in this iteration, we can stop early
    if (!hasChanges) break;
  }

  // Check for negative weight cycles (shouldn't occur in our case)
  for (const { from, to } of edges) {
    const fromDist = distances.get(from) ?? Infinity;
    const toDist = distances.get(to) ?? Infinity;
    if (fromDist !== Infinity && fromDist + 1 < toDist) {
      console.warn("Negative weight cycle detected");
      return {
        visitedNodesInOrder,
        shortestPath: [],
      };
    }
  }

  // If end node is not reachable
  if (distances.get(endNode) === Infinity) {
    return {
      visitedNodesInOrder,
      shortestPath: [],
    };
  }

  return {
    visitedNodesInOrder,
    shortestPath: reconstructPath(parentMap, endNode),
  };
};

export default bellmanFord;
