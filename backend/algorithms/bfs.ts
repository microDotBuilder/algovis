import Node from "../../src/lib/node";

export interface BFSResult {
  visitedNodesInOrder: Node[];
  shortestPath: Node[];
}

export const bfs = (
  grid: Node[][],
  startNode: Node,
  endNode: Node
): BFSResult => {
  const queue: Node[] = [];
  const visited: Set<Node> = new Set();
  const visitedNodesInOrder: Node[] = [];
  const parentMap = new Map<Node, Node>();

  queue.push(startNode);
  visited.add(startNode);
  visitedNodesInOrder.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (!currentNode) continue;

    if (currentNode === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: reconstructPath(parentMap, endNode),
      };
    }

    const neighbors = currentNode.getNeighbors();
    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !neighbor.isWall) {
        visited.add(neighbor);
        visitedNodesInOrder.push(neighbor);
        parentMap.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }

  return {
    visitedNodesInOrder,
    shortestPath: [],
  };
};

const reconstructPath = (parentMap: Map<Node, Node>, endNode: Node): Node[] => {
  const path: Node[] = [];
  let currentNode: Node | undefined = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = parentMap.get(currentNode);
  }

  return path;
};

export default bfs;
