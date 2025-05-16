import { type IBinaryTreeNode } from '../interfaces/DataStructure';

/**
 * Represents a node in a binary tree data structure.
 * Each node contains data, references to left and right children,
 * a reference to its parent, and coordinates for visualization.
 * @template T The type of data stored in the node
 */
export class TreeNode<T> implements IBinaryTreeNode<T> {
  /** The data value stored in this node */
  data: T;

  /** Coordinates for visual representation of the node */
  coordinates: { x: number; y: number };

  /** Reference to the left child node, or null if none exists */
  left: TreeNode<T> | null;

  /** Reference to the right child node, or null if none exists */
  right: TreeNode<T> | null;

  /** Reference to the parent node, or null if this is the root node */
  parent: TreeNode<T> | null;

  /**
   * Creates a new TreeNode instance
   * @param {T} data The value to be stored in this node
   * @param {TreeNode<T>} [parent] Optional parent node reference
   */
  constructor(data: T, parent?: TreeNode<T>) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = parent ? parent : null;
    this.coordinates = {
      x: 0,
      y: 0,
    };
  }
}
