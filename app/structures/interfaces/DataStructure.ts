/**
 * Generic interface for all data structure nodes
 * Defines the common properties that all nodes should have
 * @template T The type of data stored in the node
 */
export interface IDataNode<T> {
  /** The data value stored in this node */
  data: T;

  /** Coordinates for visual representation of the node */
  coordinates: { x: number; y: number };
}

/**
 * Base interface for all data structures
 * Defines the common methods that all data structures should implement
 * @template T The type of data stored in the structure
 * @template N The specific node type used in the structure, extending DataNode<T>
 */
export interface IDataStructure<T, N extends IDataNode<T> = IDataNode<T>> {
  /**
   * Adds a new value to the data structure
   * @param value The value to add
   */
  add(value: T): void | null;

  /**
   * Checks if a value exists in the data structure
   * @param value The value to check for
   * @returns true if the value exists, false otherwise
   */
  isPresent(value: T): boolean;

  /**
   * Removes a value from the data structure
   * @param value The value to remove
   */
  remove(value: T): void | boolean | null;

  /**
   * The size of the data structure (number of elements)
   */
  size: number;
}

/**
 * Interface for tree-like data structures
 * Extends the base IDataStructure interface with tree-specific methods
 * @template T The type of data stored in the tree
 * @template N The specific node type used in the tree, extending IDataNode<T>
 */
export interface ITreeStructure<T, N extends IDataNode<T>> extends IDataStructure<T, N> {
  /**
   * Reference to the root node of the tree
   */
  root: N | null;

  /**
   * Traverses the tree in a specific order and returns an array of nodes
   * @returns Array of nodes in the specified order
   */
  traverse(): N[];
}

/**
 * Interface for binary tree nodes
 * Extends the base DataNode interface with binary tree specific properties
 * @template T The type of data stored in the node
 */
export interface IBinaryTreeNode<T> extends IDataNode<T> {
  /** Reference to the left child node, or null if none exists */
  left: IBinaryTreeNode<T> | null;

  /** Reference to the right child node, or null if none exists */
  right: IBinaryTreeNode<T> | null;

  /** Reference to the parent node, or null if this is the root node */
  parent: IBinaryTreeNode<T> | null;
}

/**
 * Interface for binary tree-like data structures
 * Extends the TreeStructure interface with binary tree-specific methods
 * @template T The type of data stored in the binary tree
 * @template N The specific node type used in the binary tree, extending BinaryTreeNode<T>
 */
export interface IBinaryTreeStructure<T, N extends IBinaryTreeNode<T>>
  extends ITreeStructure<T, N> {
  /**
   * Finds the minimum value in the tree
   * @returns The node with the minimum value
   */
  findMin(node?: N | null): N;

  /**
   * Finds the maximum value in the tree
   * @returns The node with the maximum value
   */
  findMax(node?: N | null): N;

  /**
   * Checks if the tree is balanced
   * @returns true if the tree is balanced, false otherwise
   */
  isBalanced(): boolean;

  /**
   * Performs an in-order traversal of the tree
   * @returns Array of nodes in in-order traversal order
   */
  inOrder(): N[];

  /**
   * Performs a pre-order traversal of the tree
   * @returns Array of nodes in pre-order traversal order
   */
  preOrder(): N[];

  /**
   * Performs a post-order traversal of the tree
   * @returns Array of nodes in post-order traversal order
   */
  postOrder(): N[];

  /**
   * Performs a level-order traversal of the tree
   * @returns Array of nodes in level-order traversal order
   */
  levelOrder(): N[];
}

/**
 * Interface for trie nodes
 * Extends the base IDataNode interface with trie-specific properties
 */
export interface ITrieNode extends IDataNode<string> {
  /** The character stored in this node */
  character: string;

  /** Flag indicating if this node represents the end of a complete word */
  isEndOfWord: boolean;

  /** Map of child nodes, with characters as keys */
  children: Map<string, ITrieNode>;
}

/**
 * Interface for trie data structures
 * Extends the base DataStructure interface with trie-specific methods
 * @template N The specific node type used in the trie, extending TrieNode
 */
export interface ITrieStructure<N extends ITrieNode> extends IDataStructure<string, N> {
  /**
   * Checks if any word in the trie starts with the given prefix
   * @param prefix The prefix to check for
   * @returns true if any word starts with the prefix, false otherwise
   */
  startsWith(prefix: string): boolean;

  /**
   * Retrieves all words in the trie
   * @returns Array of all words in the trie
   */
  getAllWords(): string[];

  /**
   * Reference to the root node of the trie
   */
  root: N;
}
