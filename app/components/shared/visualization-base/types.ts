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
