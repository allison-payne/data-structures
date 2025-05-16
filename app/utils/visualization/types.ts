/**
 * Types of algorithms that can be visualized on the binary tree
 * - none: No algorithm selected
 * - inOrderTraversal: Visit left subtree, then root, then right subtree
 * - preOrderTraversal: Visit root, then left subtree, then right subtree
 * - postOrderTraversal: Visit left subtree, then right subtree, then root
 * - levelOrderTraversal: Visit nodes level by level from top to bottom
 * - insertion: Add a new node to the tree
 * - deletion: Remove a node from the tree
 * - balancing: Convert an unbalanced tree to a balanced one
 */
export type AlgorithmType =
  | 'none'
  | 'inOrderTraversal'
  | 'preOrderTraversal'
  | 'postOrderTraversal'
  | 'levelOrderTraversal'
  | 'insertion'
  | 'deletion'
  | 'balancing';

/**
 * Animation speed options for algorithm visualizations
 */
export type AnimationSpeed = 'slow' | 'medium' | 'fast';

/**
 * Props for the animation controls component
 * Provides functions and state for controlling algorithm animations
 */
export type AnimationControlsProps = {
  /** Starts the animation playback */
  onPlay: () => void;

  /** Pauses the animation playback */
  onPause: () => void;

  /** Advances the animation by one step */
  onStepForward: () => void;

  /** Moves the animation back by one step */
  onStepBackward: () => void;

  /** Changes the animation playback speed */
  onSpeedChange: (speed: AnimationSpeed) => void;

  /** Whether the animation is currently playing */
  isPlaying: boolean;

  /** The current animation speed */
  currentSpeed: AnimationSpeed;

  /** Whether stepping forward is possible (not at the end) */
  canStepForward: boolean;

  /** Whether stepping backward is possible (not at the beginning) */
  canStepBackward: boolean;
};

/**
 * Common type definitions shared across visualization components
 */

/**
 * Coordinates for rendering nodes in a 2D visualization
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Common node properties for visualization
 */
export interface VisualizationNodeProps<T> {
  /**
   * Node identifier (optional, used for debugging/testing)
   */
  id?: string | number;

  /**
   * The data stored in this node
   */
  data: T;

  /**
   * The coordinates for rendering this node
   */
  coordinates: Coordinates;

  /**
   * Whether this node is currently selected
   */
  isSelected?: boolean;

  /**
   * Whether this node is highlighted (e.g., during algorithm animation)
   */
  isHighlighted?: boolean;

  /**
   * Optional CSS class to apply to this node
   */
  className?: string;

  /**
   * Optional styles to apply to this node
   */
  style?: React.CSSProperties;

  /**
   * Click handler for this node
   */
  onClick?: (node: VisualizationNodeProps<T>) => void;
}

/**
 * Common edge/connection properties for visualization
 */
export interface VisualizationEdgeProps {
  /**
   * Edge identifier (optional, used for debugging/testing)
   */
  id?: string | number;

  /**
   * Starting x-coordinate of the edge
   */
  x1: string | number;

  /**
   * Starting y-coordinate of the edge
   */
  y1: string | number;

  /**
   * Ending x-coordinate of the edge
   */
  x2: string | number;

  /**
   * Ending y-coordinate of the edge
   */
  y2: string | number;

  /**
   * Whether this edge is highlighted
   */
  isHighlighted?: boolean;

  /**
   * Optional label for the edge
   */
  label?: string;

  /**
   * Optional CSS class to apply to this edge
   */
  className?: string;

  /**
   * Optional styles to apply to this edge
   */
  style?: React.CSSProperties;
}
