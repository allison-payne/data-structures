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
