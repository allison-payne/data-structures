/**
 * Shared utilities for tree layout calculations
 * Provides functions for positioning nodes in tree data structures
 */

import {
  INITIAL_OFFSET,
  SPACE_BETWEEN_CHILDREN,
  SPACE_BETWEEN_SIBLINGS,
} from '~/structures/binary-tree/constants';
import type { Coordinates } from './types';

/**
 * Default spacing constants that can be overridden by specific visualizations
 */
export const DEFAULT_TREE_LAYOUT = {
  SPACE_BETWEEN_CHILDREN,
  SPACE_BETWEEN_SIBLINGS,
  INITIAL_OFFSET,
};

/**
 * Interface for tree node with parentage and coordinates for layout calculation
 * This interface is compatible with our TreeNode<T> structure
 */
export interface TreeLayoutNode {
  coordinates: Coordinates;
  parent?: TreeLayoutNode | null;
  left?: TreeLayoutNode | null;
  right?: TreeLayoutNode | null;
  data?: unknown; // For compatibility with existing tree nodes
}

/**
 * Calculates an appropriate horizontal offset for a node based on its depth
 * @param {TreeLayoutNode} node - The node to calculate offset for
 * @param {number} siblingSpace - Space between siblings at the same level
 * @param {number} childSpace - Space between parent and child
 * @returns {number} The calculated offset
 */
export function calculateNodeOffset(
  node: TreeLayoutNode,
  siblingSpace = DEFAULT_TREE_LAYOUT.SPACE_BETWEEN_SIBLINGS,
  childSpace = DEFAULT_TREE_LAYOUT.SPACE_BETWEEN_CHILDREN
): number {
  return siblingSpace / (node.coordinates.y / childSpace);
}

/**
 * Calculates Y coordinates for tree nodes based on their depth
 * @param {Array<TreeLayoutNode>} nodes - Array of tree nodes
 * @param {number} initialY - Starting Y position
 * @param {number} childSpace - Vertical space between levels
 */
export function calculateYCoordinates(
  nodes: TreeLayoutNode[],
  initialY = DEFAULT_TREE_LAYOUT.INITIAL_OFFSET,
  childSpace = DEFAULT_TREE_LAYOUT.SPACE_BETWEEN_CHILDREN
): void {
  nodes.forEach(node => {
    node.coordinates.y = node.parent ? node.parent.coordinates.y + childSpace : initialY;
  });
}

/**
 * Adjusts parent node X coordinates to center them between their children
 * @param {Array<TreeLayoutNode>} nodes - Array of tree nodes in pre-order traversal
 */
export function centerParentsBetweenChildren(nodes: TreeLayoutNode[]): void {
  nodes.forEach(node => {
    if (node.left && node.right) {
      node.coordinates.x =
        node.left.coordinates.x + (node.right.coordinates.x - node.left.coordinates.x) / 2;
    }
  });
}

/**
 * Distributes nodes horizontally for a balanced appearance
 * Useful for trees where in-order traversal doesn't make sense
 * @param {Map<number, Array<TreeLayoutNode>>} nodesByLevel - Map of nodes grouped by their level/depth
 * @param {number} maxDepth - Maximum depth of the tree
 */
export function distributeNodesHorizontally(
  nodesByLevel: Map<number, TreeLayoutNode[]>,
  maxDepth: number
): void {
  for (let depth = 0; depth <= maxDepth; depth++) {
    const nodes = nodesByLevel.get(depth) || [];
    const nodeCount = nodes.length;

    nodes.forEach((node, index) => {
      // Distribute nodes evenly across the horizontal space
      node.coordinates.x = nodeCount > 1 ? index / (nodeCount - 1) : 0.5;

      // Normalize Y coordinate
      node.coordinates.y = maxDepth > 0 ? depth / maxDepth : 0;
    });
  }
}

/**
 * Groups tree nodes by their depth level
 * @param {TreeLayoutNode} rootNode - Root node of the tree
 * @param {number} initialDepth - Starting depth (usually 0)
 * @returns {Map<number, Array<TreeLayoutNode>>} Map of nodes grouped by depth level
 */
export function groupNodesByDepth(
  rootNode: TreeLayoutNode,
  initialDepth = 0
): Map<number, TreeLayoutNode[]> {
  const nodesByLevel = new Map<number, TreeLayoutNode[]>();

  /**
   * Recursive function to traverse the tree and group nodes by depth
   * @param {TreeLayoutNode} node - Current node to process
   * @param {number} depth - Current depth in the tree
   */
  function traverse(node: TreeLayoutNode, depth: number) {
    if (!nodesByLevel.has(depth)) {
      nodesByLevel.set(depth, []);
    }

    nodesByLevel.get(depth)!.push(node);

    // Traverse children (works for both binary trees and more generic trees)
    if (node.left) traverse(node.left, depth + 1);
    if (node.right) traverse(node.right, depth + 1);

    // For non-binary trees with a children collection
    const extendedNode = node as { children?: Array<TreeLayoutNode> };
    if (extendedNode.children && typeof extendedNode.children.forEach === 'function') {
      extendedNode.children.forEach((child: TreeLayoutNode) => {
        traverse(child, depth + 1);
      });
    }
  }

  if (rootNode) {
    traverse(rootNode, initialDepth);
  }

  return nodesByLevel;
}

/**
 * Implementation of the Reingold-Tilford algorithm for positioning tree nodes.
 * This algorithm ensures optimal horizontal spacing in binary trees by:
 * - Computing best positions for subtrees recursively
 * - Ensuring no overlap between left and right subtree nodes
 * - Centering parent nodes over their children
 * @param {TreeLayoutNode} rootNode - Root node of the tree
 * @param {number} horizontalSpacing - Minimum horizontal distance between adjacent nodes
 * @param {number} verticalSpacing - Vertical distance between parent and child nodes
 */
export function applyReingoldTilfordLayout(
  rootNode: TreeLayoutNode,
  horizontalSpacing = DEFAULT_TREE_LAYOUT.SPACE_BETWEEN_SIBLINGS,
  verticalSpacing = DEFAULT_TREE_LAYOUT.SPACE_BETWEEN_CHILDREN
): void {
  // If tree is empty, do nothing
  if (!rootNode) return;

  // Track the x-coordinate and contours of subtrees
  interface ContourInfo {
    minX: number;
    maxX: number;
    leftContour: Map<number, number>; // Level -> min X at level
    rightContour: Map<number, number>; // Level -> max X at level
  }

  /**
   * First pass of the algorithm: compute initial positions and contours
   * @param {TreeLayoutNode} node - Current node being processed
   * @param {number} depth - Current depth level in the tree
   * @returns {ContourInfo} Information about subtree contours and bounds
   */
  function firstPass(node: TreeLayoutNode, depth = 0): ContourInfo {
    // Base case for leaf nodes
    if (!node.left && !node.right) {
      const leftContour = new Map<number, number>();
      const rightContour = new Map<number, number>();
      leftContour.set(depth, 0);
      rightContour.set(depth, 0);

      return {
        minX: 0,
        maxX: 0,
        leftContour,
        rightContour,
      };
    }

    let leftInfo: ContourInfo | null = null;
    let rightInfo: ContourInfo | null = null;
    let shift = 0;

    // Process left subtree
    if (node.left) {
      leftInfo = firstPass(node.left, depth + 1);
    }

    // Process right subtree
    if (node.right) {
      rightInfo = firstPass(node.right, depth + 1);
    }

    // Calculate positions based on children
    if (leftInfo && rightInfo) {
      // Find the required shift to avoid overlap
      const leftLevels = [...leftInfo.leftContour.keys()];
      const rightLevels = [...rightInfo.rightContour.keys()];
      const maxLevel = Math.max(...leftLevels, ...rightLevels);

      for (let level = depth + 1; level <= maxLevel; level++) {
        const leftX = leftInfo.rightContour.get(level) ?? leftInfo.maxX;
        const rightX = rightInfo.leftContour.get(level) ?? rightInfo.minX;

        // Calculate minimum required shift to avoid overlap
        const requiredSpace = horizontalSpacing / Math.pow(2, level - depth - 1);
        const requiredShift = leftX + requiredSpace - rightX;

        if (requiredShift > 0) {
          shift = Math.max(shift, requiredShift);
        }
      }

      // Apply shift to right subtree
      if (shift > 0) {
        rightInfo.minX += shift;
        rightInfo.maxX += shift;
        for (const [level, x] of rightInfo.leftContour.entries()) {
          rightInfo.leftContour.set(level, x + shift);
        }
        for (const [level, x] of rightInfo.rightContour.entries()) {
          rightInfo.rightContour.set(level, x + shift);
        }
      }
    }

    // Merge contours from children
    const mergedLeftContour = new Map<number, number>();
    const mergedRightContour = new Map<number, number>();

    // Add current node to contours
    mergedLeftContour.set(depth, 0);
    mergedRightContour.set(depth, 0);

    // Merge left subtree contour
    if (leftInfo) {
      for (const [level, x] of leftInfo.leftContour.entries()) {
        mergedLeftContour.set(level, x);
      }
    }

    // Merge right subtree contour
    if (rightInfo) {
      for (const [level, x] of rightInfo.rightContour.entries()) {
        mergedRightContour.set(level, x);
      }
    }

    // Calculate node position
    let minX = 0;
    let maxX = 0;

    if (leftInfo && rightInfo) {
      minX = Math.min(leftInfo.minX, rightInfo.minX);
      maxX = Math.max(leftInfo.maxX, rightInfo.maxX);
    } else if (leftInfo) {
      minX = leftInfo.minX;
      maxX = leftInfo.maxX;
    } else if (rightInfo) {
      minX = rightInfo.minX;
      maxX = rightInfo.maxX;
    }

    return {
      minX,
      maxX,
      leftContour: mergedLeftContour,
      rightContour: mergedRightContour,
    };
  }

  /**
   * Second pass of the algorithm: position nodes based on calculated positions
   * @param {TreeLayoutNode} node - Current node being processed
   * @param {number} depth - Current depth level in the tree
   * @param {number} offsetX - X-coordinate offset for the current node
   */
  function secondPass(node: TreeLayoutNode, depth = 0, offsetX = 0): void {
    if (!node) return;

    // Set Y coordinate by depth
    node.coordinates.y = depth * verticalSpacing;

    if (node.left && node.right) {
      // Position left and right children
      secondPass(node.left, depth + 1, offsetX);
      secondPass(node.right, depth + 1, offsetX);

      // Center parent between children
      node.coordinates.x = (node.left.coordinates.x + node.right.coordinates.x) / 2;
    } else if (node.left) {
      // Only left child
      secondPass(node.left, depth + 1, offsetX);
      node.coordinates.x = node.left.coordinates.x;
    } else if (node.right) {
      // Only right child
      secondPass(node.right, depth + 1, offsetX);
      node.coordinates.x = node.right.coordinates.x;
    } else {
      // Leaf node
      node.coordinates.x = offsetX;
    }
  }

  // Run the algorithm
  firstPass(rootNode);
  secondPass(rootNode);

  // Final normalization to ensure coordinates are within 0-1 range
  normalizeCoordinates(rootNode);
}

/**
 * Normalize tree node coordinates to 0-1 range by finding min/max and scaling
 * @param {TreeLayoutNode} rootNode - Root node of the tree
 */
function normalizeCoordinates(rootNode: TreeLayoutNode): void {
  if (!rootNode) return;

  // Collect all nodes
  const nodes: TreeLayoutNode[] = [];
  collectAllNodes(rootNode, nodes);

  // Find bounds
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of nodes) {
    minX = Math.min(minX, node.coordinates.x);
    maxX = Math.max(maxX, node.coordinates.x);
    minY = Math.min(minY, node.coordinates.y);
    maxY = Math.max(maxY, node.coordinates.y);
  }

  // Normalize coordinates
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;

  for (const node of nodes) {
    // Normalize to 0-1 range
    node.coordinates.x = (node.coordinates.x - minX) / xRange;
    node.coordinates.y = (node.coordinates.y - minY) / yRange;
  }
}

/**
 * Helper function to collect all nodes in a tree
 * @param {TreeLayoutNode} node - Current node to process
 * @param {TreeLayoutNode[]} result - Array to collect nodes into
 */
function collectAllNodes(node: TreeLayoutNode, result: TreeLayoutNode[]): void {
  if (!node) return;

  result.push(node);

  if (node.left) collectAllNodes(node.left, result);
  if (node.right) collectAllNodes(node.right, result);
}
