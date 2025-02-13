import { OnboardingStep } from "../types/types";

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Algorithm Visualizer!",
    description:
      "Let's take a quick tour to help you get started. You can skip this tutorial at any time.",
    target: ".algorithm-select",
    placement: "bottom",
  },
  {
    title: "Choose an Algorithm",
    description:
      "Start by selecting an algorithm from the dropdown. We have pathfinding and sorting algorithms available.",
    target: ".algorithm-select",
    placement: "bottom",
  },
  {
    title: "Visualization Grid",
    description:
      "This is where the magic happens! You'll see the algorithm's execution visualized step by step. For pathfinding algorithms, you can draw walls by clicking and dragging on the grid.",
    target: ".visualization-grid",
    placement: "middle",
  },
  {
    title: "Control Panel",
    description:
      "Use these buttons to control the visualization. Click 'Solve' to start, and use 'Reset' to clear the grid.",
    target: ".action-buttons",
    placement: "bottom",
  },
];
