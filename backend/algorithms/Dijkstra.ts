import Node from "../../src/lib/node";

export interface DijkstraResult {
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

export const dijkstra = (startNode: Node, endNode: Node): DijkstraResult => {
  const visitedNodesInOrder: Node[] = [];
  const unvisited = new Set<Node>();
  const distances = new Map<Node, number>();
  const parentMap = new Map<Node, Node>();

  // Initialize distances
  distances.set(startNode, 0);

  // Helper function to get unvisited node with minimum distance
  const getClosestNode = (): Node | null => {
    let minDistance = Infinity;
    let closestNode: Node | null = null;

    for (const node of unvisited) {
      const distance = distances.get(node) ?? Infinity;
      if (distance < minDistance) {
        minDistance = distance;
        closestNode = node;
      }
    }

    return closestNode;
  };

  // Add start node to unvisited set
  unvisited.add(startNode);

  while (unvisited.size > 0) {
    const currentNode = getClosestNode();
    if (!currentNode) break;

    // If we found the target node, reconstruct and return the path
    if (currentNode === endNode) {
      visitedNodesInOrder.push(currentNode);
      return {
        visitedNodesInOrder,
        shortestPath: reconstructPath(parentMap, endNode),
      };
    }

    // If the closest node is at infinity, we're trapped
    if (distances.get(currentNode) === Infinity) {
      return {
        visitedNodesInOrder,
        shortestPath: [],
      };
    }

    // Remove node from unvisited set and add to visited nodes
    unvisited.delete(currentNode);
    visitedNodesInOrder.push(currentNode);

    // Update all neighbors
    for (const neighbor of currentNode.getNeighbors()) {
      if (neighbor.isWall) continue;

      // Since this is an unweighted graph, the weight is always 1
      const distance = (distances.get(currentNode) ?? Infinity) + 1;

      if (distance < (distances.get(neighbor) ?? Infinity)) {
        // If we found a shorter path, update distance and parent
        distances.set(neighbor, distance);
        parentMap.set(neighbor, currentNode);
        unvisited.add(neighbor);
      }
    }
  }

  // No path found
  return {
    visitedNodesInOrder,
    shortestPath: [],
  };
};

export default dijkstra;
