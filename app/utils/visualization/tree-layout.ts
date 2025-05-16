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
  data?: any; // For compatibility with existing tree nodes
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
   *
   * @param node
   * @param depth
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
    const anyNode = node as any;
    if (anyNode.children && typeof anyNode.children.forEach === 'function') {
      anyNode.children.forEach((child: any) => {
        traverse(child, depth + 1);
      });
    }
  }

  if (rootNode) {
    traverse(rootNode, initialDepth);
  }

  return nodesByLevel;
}
