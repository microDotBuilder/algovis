import React, { useEffect, useState } from "react";
import { initializeGrid } from "../../utils/grid";
import Node from "../../lib/node";
import { toast } from "react-toastify";
import { useAlgorithm } from "../../Providers/AlgorithmContext";
import { bfs } from "../../../backend/algorithms/bfs";
import { GRAPH_ALGORITHMS } from "../../utils/consts";

type NodeSelection = "START" | "END" | "WALL" | null;

const Visualizer: React.FC = () => {
  const [grid, setGrid] = useState<Node[][]>([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [selectionMode, setSelectionMode] = useState<NodeSelection>(null);
  const [startNode, setStartNode] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [endNode, setEndNode] = useState<{ row: number; col: number } | null>(
    null
  );
  const { algorithm, isSolving, stopSolving } = useAlgorithm();

  useEffect(() => {
    const newGrid = initializeGrid();
    setGrid(newGrid);

    // Show toast after 1 second
    const timer = setTimeout(() => {
      toast.info("Please select a start node by clicking on the grid", {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
      setSelectionMode("START");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSolving && algorithm === GRAPH_ALGORITHMS.BFS) {
      handleVisualize();
    }
  }, [isSolving, algorithm]);

  const handleVisualize = async () => {
    if (!startNode || !endNode) {
      toast.error("Please select both start and end nodes first!");
      stopSolving();
      return;
    }

    // Note: grid[row][col] gives us the node at (col, row) in our coordinate system
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];

    // Run BFS algorithm
    const result = bfs(start, end);

    // Animate the visited nodes
    for (let i = 0; i < result.visitedNodesInOrder.length; i++) {
      if (!isSolving) break;

      const node = result.visitedNodesInOrder[i];
      if (!node.isStart && !node.isEnd) {
        await new Promise((resolve) => setTimeout(resolve, 20));
        const newGrid = grid.slice();
        // Node's x is column, y is row in our coordinate system
        const visualNode = newGrid[node.getY()][node.getX()];
        visualNode.setIsVisited(true);
        setGrid(newGrid);
      }
    }

    // Animate the shortest path
    for (let i = 0; i < result.shortestPath.length; i++) {
      if (!isSolving) break;

      const node = result.shortestPath[i];
      if (!node.isStart && !node.isEnd) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        const newGrid = grid.slice();
        // Node's x is column, y is row in our coordinate system
        const visualNode = newGrid[node.getY()][node.getX()];
        visualNode.setDistance(1);
        setGrid(newGrid);
      }
    }

    stopSolving();
  };

  const handleNodeSelection = (row: number, col: number) => {
    const newGrid = grid.slice();

    // Clear previous start/end node if exists
    if (selectionMode === "START" && startNode) {
      const prevNode = newGrid[startNode.row][startNode.col];
      prevNode.setIsStart(false);
    } else if (selectionMode === "END" && endNode) {
      const prevNode = newGrid[endNode.row][endNode.col];
      prevNode.setIsEnd(false);
    }

    const node = newGrid[row][col];

    if (selectionMode === "START") {
      node.setIsStart(true);
      setStartNode({ row, col }); // Store as row, col for grid access
      setSelectionMode("END");
      toast.dismiss();
      toast.info("Now select an end node", {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    } else if (selectionMode === "END") {
      node.setIsEnd(true);
      setEndNode({ row, col }); // Store as row, col for grid access
      setSelectionMode("WALL");
      toast.dismiss();
      toast.success(
        "You can now draw walls by clicking or dragging on the grid!",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }

    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-[repeat(50,1fr)] gap-0 p-4 bg-white rounded-lg shadow-lg">
      {grid.map((row, rowIdx) =>
        row.map((node, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            className={`
              w-6 h-6 border border-gray-200
              ${node.getIsStart() ? "bg-green-500" : ""}
              ${node.getIsEnd() ? "bg-red-500" : ""}
              ${node.getIsWall() ? "bg-gray-800" : ""}
              ${
                node.getIsVisited() && !node.getIsStart() && !node.getIsEnd()
                  ? "bg-blue-200"
                  : ""
              }
              ${
                node.getDistance() === 1 &&
                !node.getIsStart() &&
                !node.getIsEnd()
                  ? "bg-yellow-400"
                  : ""
              }
              transition-colors duration-300
            `}
            onMouseDown={() => {
              setIsMousePressed(true);
              handleNodeSelection(rowIdx, colIdx);
            }}
            onMouseEnter={() => {
              if (isMousePressed && selectionMode === "WALL") {
                const newGrid = grid.slice();
                const node = newGrid[rowIdx][colIdx];
                if (!node.getIsStart() && !node.getIsEnd()) {
                  node.setIsWall(!node.getIsWall());
                  setGrid(newGrid);
                }
              }
            }}
            onMouseUp={() => setIsMousePressed(false)}
            onMouseLeave={() => setIsMousePressed(false)}
          />
        ))
      )}
    </div>
  );
};

export default Visualizer;
