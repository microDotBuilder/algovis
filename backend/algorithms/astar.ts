import Node from "../../src/lib/node";

export interface AStarResult {
  visitedNodesInOrder: Node[];
  shortestPath: Node[];
}

// Manhattan distance heuristic
const heuristic = (node: Node, endNode: Node): number => {
  return (
    Math.abs(node.getX() - endNode.getX()) +
    Math.abs(node.getY() - endNode.getY())
  );
};

const reconstructPath = (parentMap: Map<Node, Node>, endNode: Node): Node[] => {
  const path: Node[] = [];
  let current: Node | undefined = endNode;

  while (current) {
    path.unshift(current);
    current = parentMap.get(current);
  }

  return path;
};

export const astar = (startNode: Node, endNode: Node): AStarResult => {
  const visitedNodesInOrder: Node[] = [];
  const openSet: Node[] = [startNode];
  const closedSet = new Set<Node>();
  const parentMap = new Map<Node, Node>();

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known
  const gScore = new Map<Node, number>();
  gScore.set(startNode, 0);

  // For node n, fScore[n] = gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how cheap a path could be from start to finish if it goes through n
  const fScore = new Map<Node, number>();
  fScore.set(startNode, heuristic(startNode, endNode));

  while (openSet.length > 0) {
    // Get node with lowest fScore
    openSet.sort(
      (a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity)
    );
    const current = openSet.shift();
    if (!current) continue;

    visitedNodesInOrder.push(current);

    if (current === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: reconstructPath(parentMap, endNode),
      };
    }

    closedSet.add(current);

    for (const neighbor of current.getNeighbors()) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;

      // tentative_gScore is the distance from start to the neighbor through current
      const tentative_gScore = (gScore.get(current) ?? Infinity) + 1;

      // If this path to neighbor is better than any previous one, record it
      if (
        !openSet.includes(neighbor) ||
        tentative_gScore < (gScore.get(neighbor) ?? Infinity)
      ) {
        parentMap.set(neighbor, current);
        gScore.set(neighbor, tentative_gScore);
        fScore.set(neighbor, tentative_gScore + heuristic(neighbor, endNode));

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found
  return {
    visitedNodesInOrder,
    shortestPath: [],
  };
};

export default astar;
