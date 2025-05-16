/**
 * Shared utilities for visualization coordinate calculations
 * These functions provide common operations needed across different
 * data structure visualizations.
 */

import { initialViewBox } from '~/components/svg/constants';
import type { Coordinates } from './types';

/**
 * Scales a coordinate value to SVG space
 * @param {number} value - The coordinate value to scale
 * @param {number} [scaleFactor] - Optional scale factor, defaults to initialViewBox
 * @returns {string} The scaled coordinate as a string
 */
export function scaleCoordinate(value: number, scaleFactor: number = initialViewBox): string {
  return `${value * scaleFactor}`;
}

/**
 * Converts normalized coordinates (0-1 range) to SVG viewport coordinates
 * @param {Coordinates} coordinates - Normalized coordinates (0-1 range)
 * @param {number} [scaleFactor] - Optional scale factor, defaults to initialViewBox
 * @returns {Coordinates} SVG viewport coordinates
 */
export function normalizedToViewport(
  coordinates: Coordinates,
  scaleFactor: number = initialViewBox
): Coordinates {
  return {
    x: coordinates.x * scaleFactor,
    y: coordinates.y * scaleFactor,
  };
}

/**
 * Creates a linear interpolation function for smooth animations
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @returns {Function} Function that takes a progress value (0-1) and returns the interpolated value
 */
export function createInterpolator(start: number, end: number): (progress: number) => number {
  return (progress: number) => start + (end - start) * progress;
}

/**
 * Calculates a midpoint between two coordinates
 * Useful for edge label positioning
 * @param {Coordinates} start - Starting coordinate
 * @param {Coordinates} end - Ending coordinate
 * @returns {Coordinates} The midpoint coordinates
 */
export function calculateMidpoint(start: Coordinates, end: Coordinates): Coordinates {
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
}

/**
 * Calculates the angle between two points
 * Useful for rotating edge labels to match edge direction
 * @param {Coordinates} start - Starting coordinate
 * @param {Coordinates} end - Ending coordinate
 * @returns {number} Angle in degrees
 */
export function calculateAngle(start: Coordinates, end: Coordinates): number {
  return Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
}

/**
 * Calculates distance between two coordinates
 * @param {Coordinates} a - First coordinate
 * @param {Coordinates} b - Second coordinate
 * @returns {number} The Euclidean distance
 */
export function calculateDistance(a: Coordinates, b: Coordinates): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}
