/**
 * Shared utilities for responsive visualization layout
 * Provides functions for adapting visualizations to different screen sizes
 */

/**
 * Calculates dimensions that maintain aspect ratio when resizing
 * @param {number} containerWidth - Available width
 * @param {number} containerHeight - Available height
 * @param {number} targetAspectRatio - Desired width/height ratio (default: 1)
 * @returns {object} Object containing calculated width and height
 */
export function calculateMaintainedAspectRatio(
  containerWidth: number,
  containerHeight: number,
  targetAspectRatio = 1
): { width: number; height: number } {
  const containerAspectRatio = containerWidth / containerHeight;

  if (containerAspectRatio > targetAspectRatio) {
    // Container is wider than target aspect ratio
    const width = containerHeight * targetAspectRatio;
    return { width, height: containerHeight };
  } else {
    // Container is taller than target ratio
    const height = containerWidth / targetAspectRatio;
    return { width: containerWidth, height };
  }
}

/**
 * Calculates appropriate zoom level based on node count and container size
 * @param {number} nodeCount - Number of nodes in the visualization
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @returns {number} Appropriate zoom level (scale factor)
 */
export function calculateOptimalZoomLevel(
  nodeCount: number,
  containerWidth: number,
  containerHeight: number
): number {
  const minDimension = Math.min(containerWidth, containerHeight);

  // Base scale that works well for small trees
  let scale = 1.0;

  // Adjust scale based on node count (more nodes = zoom out more)
  if (nodeCount > 10) {
    scale = 0.9;
  }
  if (nodeCount > 20) {
    scale = 0.8;
  }
  if (nodeCount > 30) {
    scale = 0.7;
  }
  if (nodeCount > 50) {
    scale = 0.5;
  }

  // Adjust for container size (smaller containers need closer zoom)
  if (minDimension < 400) {
    scale *= 1.2;
  }
  if (minDimension < 300) {
    scale *= 1.3;
  }

  return scale;
}

/**
 * Calculates appropriate node size based on container dimensions and node count
 * @param {number} nodeCount - Number of nodes in the visualization
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @param {number} [baseSizePercent] - Base node size as percentage of container
 * @returns {number} Appropriate node radius
 */
export function calculateNodeSize(
  nodeCount: number,
  containerWidth: number,
  containerHeight: number,
  baseSizePercent = 3
): number {
  const minDimension = Math.min(containerWidth, containerHeight);
  let size = (minDimension * baseSizePercent) / 100;

  // Adjust size based on node count (more nodes = smaller nodes)
  if (nodeCount > 10) {
    size *= 0.9;
  }
  if (nodeCount > 20) {
    size *= 0.8;
  }
  if (nodeCount > 30) {
    size *= 0.7;
  }

  return Math.max(size, 4); // Ensure minimum visibility
}

/**
 * Calculates appropriate font size based on container and node size
 * @param {number} nodeRadius - Node radius
 * @param {number} containerWidth - Container width
 * @returns {number} Appropriate font size
 */
export function calculateFontSize(nodeRadius: number, containerWidth: number): number {
  // Font size as a function of node radius and container width
  const size = Math.min(nodeRadius * 1.2, containerWidth * 0.015);
  return Math.max(size, 9); // Ensure minimum readability
}

/**
 * Returns the appropriate SVG viewBox for the visualization
 * @param {number} width - Width of the SVG container
 * @param {number} height - Height of the SVG container
 * @param {number} [padding] - Padding as proportion of total size
 * @returns {string} viewBox attribute string
 */
export function calculateViewBox(width: number, height: number, padding = 0.1): string {
  const paddingX = width * padding;
  const paddingY = height * padding;
  return `-${paddingX} -${paddingY} ${width + paddingX * 2} ${height + paddingY * 2}`;
}
