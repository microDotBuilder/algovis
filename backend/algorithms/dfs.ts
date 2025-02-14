import Node from "../../src/lib/node";

export interface DFSResult {
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

export const dfs = (startNode: Node, endNode: Node): DFSResult => {
  const stack: Node[] = [];
  const visited: Set<Node> = new Set();
  const visitedNodesInOrder: Node[] = [];
  const parentMap = new Map<Node, Node>();

  // Initialize with start node
  stack.push(startNode);
  visited.add(startNode);
  visitedNodesInOrder.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!currentNode) continue;

    // If we found the target node, reconstruct and return the path
    if (currentNode === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: reconstructPath(parentMap, endNode),
      };
    }

    // Get neighbors and reverse them to maintain top-to-bottom, left-to-right DFS order
    const neighbors = currentNode.getNeighbors().reverse();

    // Visit all unvisited neighbors
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !neighbor.isWall) {
        stack.push(neighbor);
        visited.add(neighbor);
        visitedNodesInOrder.push(neighbor);
        parentMap.set(neighbor, currentNode);
      }
    }
  }

  // If no path is found, return empty path
  return {
    visitedNodesInOrder,
    shortestPath: [],
  };
};

export default dfs;
