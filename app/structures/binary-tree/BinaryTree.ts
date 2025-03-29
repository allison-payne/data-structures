import { INITIAL_OFFSET, SPACE_BETWEEN_CHILDREN, SPACE_BETWEEN_SIBLINGS } from "./constants";
import { TreeNode } from "./TreeNode";

export class BinaryTree<T> {

  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  add(treeNode: T): void | null {
    const node = this.root;
    if (node === null) {
      this.root = new TreeNode(treeNode);
      return;
    } else {
      const searchTree = (node: TreeNode<T>): null | void => {
        if (treeNode < node.data) {
          if (node.left === null) {
            node.left = new TreeNode(treeNode, node);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (treeNode > node.data) {
          if (node.right === null) {
            node.right = new TreeNode(treeNode, node);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  addMultiple(data: Array<T>): BinaryTree<T> {
    data.forEach((datum) => this.add(datum));
    return this;
  }

  findMin(node = this.root): TreeNode<T> {
    let current = node as TreeNode<T>;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  findMax(node = this.root): TreeNode<T> {
    let current = node as TreeNode<T>;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  find(data: T): TreeNode<T> | null {
    let current: TreeNode<T> | null = this.root as TreeNode<T>;
    while (data !== current.data) {
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

  remove(data: T): null | void {
    const removeNode = (node: TreeNode<T> | null, data: T) => {
      if (node == null) {
        return null;
      }
      if (data == node.data) {
        // node has no children 
        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child 
        if (node.left == null) {
          return node.right;
        }
        // node has no right child 
        if (node.right == null) {
          return node.left;
        }
        // node has two children 
        var tempNode = node.right;
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
    }
    this.root = removeNode(this.root, data);
  }

  isBalanced(): boolean {
    return (this.findMinHeight() >= this.findMaxHeight() - 1)
  }

  findMinHeight(node = this.root): number {
    if (node == null) {
      return -1;
    };
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    };
  }

  findMaxHeight(node = this.root): number {
    if (node == null) {
      return -1;
    };
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    };
  }

  inOrder(): Array<TreeNode<T>> {
    if (this.root == null) {
      return [];
    } else {
      var result = Array<TreeNode<T>>();

      const traverseInOrder = (node: TreeNode<T>) => {
        node.left && traverseInOrder(node.left);
        result.push(node);
        node.right && traverseInOrder(node.right);
      }

      traverseInOrder(this.root);
      return result;
    };
  }

  preOrder(): Array<TreeNode<T>> | null {
    if (this.root == null) {
      return null;
    } else {
      let result = new Array<TreeNode<T>>();
      const traversePreOrder = (node: TreeNode<T>) => {
        result.push(node);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      };
      traversePreOrder(this.root);
      return result;
    };
  }

  postOrder(): Array<TreeNode<T>> | null {
    if (this.root == null) {
      return null;
    } else {
      let result = new Array<TreeNode<T>>();
      const traversePostOrder = (node: TreeNode<T>) => {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node);
      };
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder(): Array<TreeNode<T>> | null {
    let result = new Array<TreeNode<T>>();
    let Q = new Array<TreeNode<T>>();
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        node && result.push(node);
        if (node && node.left != null) {
          Q.push(node.left);
        };
        if (node && node.right != null) {
          Q.push(node.right);
        };
      };
      return result;
    } else {
      return null;
    };
  }

  calculateNodeX(): void {
    const offset = (node: TreeNode<T>)=>(SPACE_BETWEEN_SIBLINGS / (node.coordinates.y / SPACE_BETWEEN_CHILDREN))
    
    const calcNextX = (xValue: number, node: TreeNode<T>): number => {
      return xValue + offset(node);
    }

    let xAcc = INITIAL_OFFSET;
    const orderedNodes = this.inOrder();
    orderedNodes?.forEach((node) => {
      if (node === this.root) xAcc = 0.5;
      node.coordinates.x = xAcc;
      xAcc = + calcNextX(xAcc, node);
    });

    const preOrderNodes = this.preOrder();
    preOrderNodes?.forEach((node) => {
      if (node.left && node.right) {
        node.coordinates.x = node.left.coordinates.x + ((node.right.coordinates.x - node.left.coordinates.x) / 2);
      }
    });
  }
}