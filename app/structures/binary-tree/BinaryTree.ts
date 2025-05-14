import { INITIAL_OFFSET, SPACE_BETWEEN_CHILDREN, SPACE_BETWEEN_SIBLINGS } from './constants';
import { TreeNode } from './TreeNode';

/**
 * Binary Search Tree implementation.
 * A binary search tree is a tree data structure in which each node has at most two children,
 * and for each node, all elements in its left subtree are less than the node,
 * and all elements in its right subtree are greater than the node.
 * @template T The type of data stored in the tree, must support comparison operations
 */
export class BinaryTree<T> {
  /** Reference to the root node of the tree */
  root: TreeNode<T> | null;

  /**
   * Creates a new empty Binary Search Tree
   */
  constructor() {
    this.root = null;
  }

  /**
   * Adds a new value to the tree, maintaining binary search tree properties
   * @param value The value to add to the tree
   * @returns void or null if the value already exists in the tree
   */
  add(value: T): void | null {
    const node = this.root;
    if (node === null) {
      this.root = new TreeNode(value);
      return;
    } else {
      const searchTree = (node: TreeNode<T>): null | void => {
        if (value < node.data) {
          if (node.left === null) {
            node.left = new TreeNode(value, node);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (value > node.data) {
          if (node.right === null) {
            node.right = new TreeNode(value, node);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null; // Value already exists
        }
      };
      return searchTree(node);
    }
  }

  /**
   * Adds multiple values to the tree at once
   * @param data Array of values to add to the tree
   * @returns The tree instance for method chaining
   */
  addMultiple(data: Array<T>): BinaryTree<T> {
    data.forEach(datum => this.add(datum));
    return this;
  }

  /**
   * Finds the node with the minimum value in the specified subtree
   * @param node Root node of the subtree to search, defaults to the tree's root
   * @returns TreeNode containing the minimum value
   */
  findMin(node = this.root): TreeNode<T> {
    let current = node as TreeNode<T>;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * Finds the node with the maximum value in the specified subtree
   * @param node Root node of the subtree to search, defaults to the tree's root
   * @returns TreeNode containing the maximum value
   */
  findMax(node = this.root): TreeNode<T> {
    let current = node as TreeNode<T>;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  /**
   * Finds a node with the specified value
   * @param data The value to search for
   * @returns The node containing the value, or null if not found
   */
  find(data: T): TreeNode<T> | null {
    let current: TreeNode<T> | null = this.root as TreeNode<T>;
    while (current && data !== current.data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  /**
   * Checks if a value exists in the tree
   * @param data The value to check for
   * @returns true if the value exists in the tree, false otherwise
   */
  isPresent(data: T): boolean {
    let current: TreeNode<T> | null = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  /**
   * Removes a node with the specified value from the tree
   * @param data The value to remove
   * @returns null if the tree is empty or void
   */
  remove(data: T): null | void {
    const removeNode = (node: TreeNode<T> | null, data: T) => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // node has no left child
        if (node.left === null) {
          return node.right;
        }
        // node has no right child
        if (node.right === null) {
          return node.left;
        }
        // node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        if (node.left) {
          node.left.parent = node;
        }
        return node;
      } else {
        node.right = removeNode(node.right, data);
        if (node.right) {
          node.right.parent = node;
        }
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }

  /**
   * Checks if the tree is balanced
   * A balanced tree has a difference between min and max height of at most 1
   * @returns true if the tree is balanced, false otherwise
   */
  isBalanced(): boolean {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  /**
   * Finds the minimum height of the tree
   * The minimum height is the length of the shortest path from the root to any leaf
   * @param node The root node of the subtree, defaults to the tree's root
   * @returns The minimum height
   */
  findMinHeight(node = this.root): number {
    if (node === null) {
      return -1;
    }
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  /**
   * Finds the maximum height of the tree
   * The maximum height is the length of the longest path from the root to any leaf
   * @param node The root node of the subtree, defaults to the tree's root
   * @returns The maximum height
   */
  findMaxHeight(node = this.root): number {
    if (node === null) {
      return -1;
    }
    const left = this.findMaxHeight(node.left);
    const right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  /**
   * Performs an in-order traversal of the tree
   * In-order traversal visits left subtree, then root, then right subtree
   * For a binary search tree, this visits nodes in ascending order
   * @returns Array of tree nodes in in-order sequence
   */
  inOrder(): Array<TreeNode<T>> {
    if (this.root === null) {
      return [];
    } else {
      const result = Array<TreeNode<T>>();

      const traverseInOrder = (node: TreeNode<T>) => {
        node.left && traverseInOrder(node.left);
        result.push(node);
        node.right && traverseInOrder(node.right);
      };

      traverseInOrder(this.root);
      return result;
    }
  }

  /**
   * Performs a pre-order traversal of the tree
   * Pre-order traversal visits root, then left subtree, then right subtree
   * @returns Array of tree nodes in pre-order sequence, or null if the tree is empty
   */
  preOrder(): Array<TreeNode<T>> | null {
    if (this.root === null) {
      return null;
    } else {
      const result = new Array<TreeNode<T>>();
      const traversePreOrder = (node: TreeNode<T>) => {
        result.push(node);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      };
      traversePreOrder(this.root);
      return result;
    }
  }

  /**
   * Performs a post-order traversal of the tree
   * Post-order traversal visits left subtree, then right subtree, then root
   * @returns Array of tree nodes in post-order sequence, or null if the tree is empty
   */
  postOrder(): Array<TreeNode<T>> | null {
    if (this.root === null) {
      return null;
    } else {
      const result = new Array<TreeNode<T>>();
      const traversePostOrder = (node: TreeNode<T>) => {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node);
      };
      traversePostOrder(this.root);
      return result;
    }
  }

  /**
   * Performs a level-order (breadth-first) traversal of the tree
   * Level-order traversal visits nodes level by level, from top to bottom, left to right
   * @returns Array of tree nodes in level-order sequence, or null if the tree is empty
   */
  levelOrder(): Array<TreeNode<T>> | null {
    const result = new Array<TreeNode<T>>();
    const Q = new Array<TreeNode<T>>();
    if (this.root !== null) {
      Q.push(this.root);
      while (Q.length > 0) {
        const node = Q.shift();
        node && result.push(node);
        if (node && node.left !== null) {
          Q.push(node.left);
        }
        if (node && node.right !== null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }

  /**
   * Calculates the x-coordinates for each node in the tree for visualization
   * Uses a combination of in-order traversal (for initial positioning)
   * and pre-order traversal (for parent positioning)
   */
  calculateNodeX(): void {
    const offset = (node: TreeNode<T>) =>
      SPACE_BETWEEN_SIBLINGS / (node.coordinates.y / SPACE_BETWEEN_CHILDREN);

    const calcNextX = (xValue: number, node: TreeNode<T>): number => {
      return xValue + offset(node);
    };

    let xAcc = INITIAL_OFFSET;
    const orderedNodes = this.inOrder();
    orderedNodes?.forEach(node => {
      if (node === this.root) xAcc = 0.5;
      node.coordinates.x = xAcc;
      xAcc = +calcNextX(xAcc, node); // Note: This should be xAcc += calcNextX(xAcc, node)
    });

    const preOrderNodes = this.preOrder();
    preOrderNodes?.forEach(node => {
      if (node.left && node.right) {
        node.coordinates.x =
          node.left.coordinates.x + (node.right.coordinates.x - node.left.coordinates.x) / 2;
      }
    });
  }

  /**
   * Calculates the y-coordinates for each node in the tree for visualization
   * Y-coordinates are based on the node's depth in the tree
   */
  calculateNodeY(): void {
    const calcNextY = (node: TreeNode<T>): number => {
      return node.parent ? node.parent.coordinates.y + SPACE_BETWEEN_CHILDREN : INITIAL_OFFSET;
    };

    const preOrderNodes = this.preOrder();
    preOrderNodes?.forEach(node => {
      node.coordinates.y = calcNextY(node);
    });
  }
}
