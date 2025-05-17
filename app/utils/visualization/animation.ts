/**
 * Shared utilities for animation calculations
 * Provides functions for creating smooth animations and transitions
 */

/**
 * Easing functions for animations
 */
export const easingFunctions = {
  /**
   * Linear easing (no easing)
   * @param {number} t - Progress (0 to 1)
   * @returns {number} Output value
   */
  linear: (t: number): number => t,

  /**
   * Ease-in-out (smooth acceleration and deceleration)
   * @param {number} t - Progress (0 to 1)
   * @returns {number} Output value
   */
  easeInOut: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  /**
   * Ease-in (acceleration from zero velocity)
   * @param {number} t - Progress (0 to 1)
   * @returns {number} Output value
   */
  easeIn: (t: number): number => t * t,

  /**
   * Ease-out (deceleration to zero velocity)
   * @param {number} t - Progress (0 to 1)
   * @returns {number} Output value
   */
  easeOut: (t: number): number => t * (2 - t),
};

/**
 * Animation speed presets in milliseconds
 */
export const animationSpeeds = {
  slow: 1000,
  medium: 500,
  fast: 250,
};

/**
 * Creates animation frames for transitioning between values
 * @param {number} startValue - Starting value
 * @param {number} endValue - Ending value
 * @param {number} frames - Number of animation frames
 * @param {Function} [easingFn] - Optional easing function
 * @returns {Array<number>} Array of interpolated values
 */
export function createAnimationFrames(
  startValue: number,
  endValue: number,
  frames: number,
  easingFn = easingFunctions.linear
): number[] {
  const result = [];
  for (let i = 0; i < frames; i++) {
    const progress = i / (frames - 1);
    const easedProgress = easingFn(progress);
    result.push(startValue + (endValue - startValue) * easedProgress);
  }
  return result;
}

/**
 * Calculates the appropriate animation duration based on operation complexity
 * @param {number} itemCount - Number of items being processed
 * @param {string} speed - Animation speed preset ('slow', 'medium', 'fast')
 * @param {number} [baseTime] - Base time for a single operation in ms
 * @returns {number} Calculated animation duration in milliseconds
 */
export function calculateAnimationDuration(
  itemCount: number,
  speed: keyof typeof animationSpeeds = 'medium',
  baseTime?: number
): number {
  const speedFactor = baseTime || animationSpeeds[speed];
  // For O(log n) algorithms
  return Math.max(speedFactor, Math.log2(itemCount + 1) * speedFactor * 0.5);
}

/**
 * Animation delay calculation based on index
 * @param {number} index - Current item index
 * @param {string} speed - Animation speed preset ('slow', 'medium', 'fast')
 * @returns {number} Delay in milliseconds
 */
export function calculateAnimationDelay(
  index: number,
  speed: keyof typeof animationSpeeds = 'medium'
): number {
  return index * (animationSpeeds[speed] / 2);
}

/**
 * Creates an animation for node position changes during tree restructuring
 * @param {object} startCoordinates - Starting coordinates
 * @param {number} startCoordinates.x - X coordinate of the starting position
 * @param {number} startCoordinates.y - Y coordinate of the starting position
 * @param {object} endCoordinates - Ending coordinates
 * @param {number} endCoordinates.x - X coordinate of the ending position
 * @param {number} endCoordinates.y - Y coordinate of the ending position
 * @param {number} _duration - Animation duration in milliseconds
 * @param {Function} [easingFn] - Easing function to use
 * @returns {Function} Animation function that takes a progress value (0 to 1) and returns current coordinates
 */
export function createNodePositionAnimation(
  startCoordinates: { x: number; y: number },
  endCoordinates: { x: number; y: number },
  _duration = animationSpeeds.medium,
  easingFn = easingFunctions.easeInOut
): (progress: number) => { x: number; y: number } {
  return (progress: number) => {
    const easedProgress = easingFn(progress);
    return {
      x: startCoordinates.x + (endCoordinates.x - startCoordinates.x) * easedProgress,
      y: startCoordinates.y + (endCoordinates.y - startCoordinates.y) * easedProgress,
    };
  };
}

/**
 * Animation stages for different tree operations
 */
export const animationStages = {
  /**
   * Creates animation stages for tree rotation operations
   * @param {string} direction - Direction of rotation ('left' or 'right')
   * @param {object} pivotNode - The pivot node of the rotation
   * @param {object} rotatedNode - The node being rotated
   * @returns {Array} Array of animation stages with descriptions and durations
   */
  treeRotation: (direction: 'left' | 'right', pivotNode: unknown, rotatedNode: unknown) => [
    {
      description: `Preparing for ${direction} rotation`,
      duration: animationSpeeds.medium * 0.5,
      highlightNodes: [pivotNode, rotatedNode],
    },
    {
      description: `Performing ${direction} rotation`,
      duration: animationSpeeds.medium,
      highlightNodes: [pivotNode, rotatedNode],
    },
    {
      description: 'Stabilizing tree structure after rotation',
      duration: animationSpeeds.medium * 0.5,
      highlightNodes: [],
    },
  ],

  /**
   * Creates animation stages for node insertion
   * @param {object} newNode - The node being inserted
   * @param {object} parentNode - The parent node where insertion happens
   * @returns {Array} Array of animation stages with descriptions and durations
   */
  nodeInsertion: (newNode: unknown, parentNode: unknown) => [
    {
      description: 'Finding insertion point',
      duration: animationSpeeds.medium * 0.7,
      highlightNodes: [parentNode],
    },
    {
      description: 'Inserting new node',
      duration: animationSpeeds.medium,
      highlightNodes: [newNode, parentNode],
      effect: 'pulse',
    },
    {
      description: 'Stabilizing tree structure',
      duration: animationSpeeds.medium * 0.5,
      highlightNodes: [],
    },
  ],

  /**
   * Creates animation stages for node deletion
   * @param {object} nodeToDelete - The node being deleted
   * @param {object} parentNode - The parent of the node being deleted
   * @returns {Array} Array of animation stages with descriptions and durations
   */
  nodeDeletion: (nodeToDelete: unknown, parentNode: unknown) => [
    {
      description: 'Finding node to delete',
      duration: animationSpeeds.medium * 0.7,
      highlightNodes: [nodeToDelete],
    },
    {
      description: 'Removing node',
      duration: animationSpeeds.medium,
      highlightNodes: [nodeToDelete],
      effect: 'fadeOut',
    },
    {
      description: 'Reorganizing tree structure',
      duration: animationSpeeds.medium * 0.8,
      highlightNodes: [parentNode],
    },
  ],
};

/**
 * Visual effects for tree operations
 */
export const nodeEffects = {
  /**
   * Creates a pulse effect for highlighting newly inserted nodes
   * @param {number} progress - Animation progress (0 to 1)
   * @returns {object} Style attributes for the pulse effect
   */
  pulse: (progress: number) => {
    const scale = 1 + Math.sin(progress * Math.PI) * 0.3; // Scale between 1 and 1.3
    const opacity = 0.7 + Math.sin(progress * Math.PI) * 0.3; // Opacity between 0.7 and 1

    return {
      transform: `scale(${scale})`,
      opacity,
    };
  },

  /**
   * Creates a fade-out effect for deleted nodes
   * @param {number} progress - Animation progress (0 to 1)
   * @returns {object} Style attributes for the fade-out effect
   */
  fadeOut: (progress: number) => {
    const opacity = 1 - progress;
    const scale = 1 - progress * 0.3;

    return {
      opacity,
      transform: `scale(${scale})`,
    };
  },

  /**
   * Creates a highlight effect for nodes involved in operations
   * @param {number} progress - Animation progress (0 to 1)
   * @param {string} color - Base color to use for highlighting
   * @returns {object} Style attributes for the highlight effect
   */
  highlight: (progress: number, color = '#ffcc00') => {
    // Pulse the highlight color
    const intensity = 0.7 + Math.sin(progress * Math.PI * 2) * 0.3;

    return {
      filter: `drop-shadow(0 0 5px ${color})`,
      strokeWidth: 2 + intensity,
    };
  },
};
