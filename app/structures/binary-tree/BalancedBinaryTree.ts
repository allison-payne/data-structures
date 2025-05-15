import { BinaryTree } from './BinaryTree';
import { TreeNode } from './TreeNode';

/**
 * Extension of BinaryTree that provides balancing operations
 * This class ensures the tree remains balanced for optimal search operations
 * @template T The type of data stored in the tree, must support comparison operations
 */
export class BalancedBinaryTree<T> extends BinaryTree<T> {
  /**
   * Balance the tree by converting it to a balanced tree
   * It uses the in-order traversal of the tree to get a sorted array
   * Then it builds a new balanced tree from that array
   * @returns {object} Object containing visualization steps and the balanced tree
   * @property {Array<BalanceStep<T>>} steps Steps for visualization
   * @property {BinaryTree<T>} balancedTree The balanced binary tree
   */
  balance(): { steps: Array<BalanceStep<T>>; balancedTree: BinaryTree<T> } {
    // Get in-order traversal to have nodes in sorted order
    const nodes = this.inOrder();
    const steps: Array<BalanceStep<T>> = [];

    // Step 1: Show the current unbalanced tree
    steps.push({
      description: 'Starting tree balancing operation...',
      highlightedNodes: [],
      treeState: structuredClone(this),
    });

    // Step 2: Convert tree to array (in-order traversal ensures sorted array)
    steps.push({
      description: 'Converting tree to sorted array via in-order traversal',
      highlightedNodes: nodes.map(node => Number(node.data)),
      treeState: structuredClone(this),
    });

    // Create a new tree for the balanced version
    const balancedTree = new BinaryTree<T>();

    // Build a balanced BST from the sorted array
    this.buildBalancedBST(nodes, 0, nodes.length - 1, balancedTree, steps);

    // Final step: Show the balanced tree
    steps.push({
      description: 'Tree balancing complete!',
      highlightedNodes: [],
      treeState: structuredClone(balancedTree),
    });

    return { steps, balancedTree };
  }

  /**
   * Builds a balanced binary search tree from a sorted array
   * Uses a divide and conquer approach to create a balanced tree
   * @param {Array<TreeNode<T>>} nodes Sorted array of nodes (from in-order traversal)
   * @param {number} start Starting index of the current subarray
   * @param {number} end Ending index of the current subarray
   * @param {BinaryTree<T>} balancedTree Reference to the new balanced tree
   * @param {Array<BalanceStep<T>>} steps Array to collect visualization steps for the animation
   * @returns {void}
   * @private
   */
  private buildBalancedBST(
    nodes: Array<TreeNode<T>>,
    start: number,
    end: number,
    balancedTree: BinaryTree<T>,
    steps: Array<BalanceStep<T>>
  ): void {
    if (start > end) return;

    // Calculate the middle element and use it as the root
    const mid = Math.floor((start + end) / 2);
    const nodeValue = nodes[mid].data;

    // Add the middle element to the balanced tree
    balancedTree.add(nodeValue);

    // Update the coordinates for visualization
    balancedTree.calculateNodeY();
    balancedTree.calculateNodeX();

    // Add a step showing this node being inserted
    steps.push({
      description: `Adding node ${String(nodeValue)} to the balanced tree`,
      highlightedNodes: [Number(nodeValue)],
      treeState: structuredClone(balancedTree),
    });

    // Recursively build the left and right subtrees
    this.buildBalancedBST(nodes, start, mid - 1, balancedTree, steps);
    this.buildBalancedBST(nodes, mid + 1, end, balancedTree, steps);
  }
}

/**
 * Interface for a balance step used in visualization
 * Each step represents a state of the tree during the balancing process
 * @template T The type of data stored in the tree nodes
 */

/**
 * Represents a step in the tree balancing visualization process
 * Contains the state of the tree and UI information for each step of the algorithm
 * @template T The type of data stored in the tree nodes
 */
export interface BalanceStep<T> {
  /** A descriptive text explaining the current step in the balancing process */
  description: string;

  /** Array of node values that should be highlighted during this step */
  highlightedNodes: number[];

  /** A snapshot of the tree state at this step in the balancing process */
  treeState: BinaryTree<T>;
}
