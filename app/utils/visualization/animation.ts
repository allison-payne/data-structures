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
