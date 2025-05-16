import { TrieNode } from './TrieNode';
import type { ITrieStructure } from '../interfaces/DataStructure';

/**
 * Trie (Prefix Tree) data structure implementation.
 * A trie is an efficient information retrieval data structure specialized
 * for string keys, typically used for dictionary implementations, auto-completions,
 * and prefix-based searches. Each node in the tree represents a character in a word.
 */
export class Trie implements ITrieStructure<TrieNode> {
  /** Reference to the root node of the trie (empty character) */
  root: TrieNode;

  /** Number of complete words stored in the trie */
  size: number;

  /**
   * Creates a new empty Trie
   */
  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  /**
   * Inserts a word into the trie
   * @param {string} word The word to insert
   */
  insert(word: string): void {
    if (!word) return;

    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode(char));
      }
      current = current.children.get(char)!;
    }

    // Mark the end of the word if it's not already marked
    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      this.size++;
    }
  }

  /**
   * Adds a new value to the trie (alias of insert for DataStructure interface)
   * @param {string} value The string value to add
   * @returns {void}
   */
  add(value: string): void {
    this.insert(value);
  }

  /**
   * Checks if a word exists in the trie
   * @param {string} word The word to search for
   * @returns {boolean} true if the word exists, false otherwise
   */
  search(word: string): boolean {
    if (!word) return false;

    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Checks if a value exists in the trie (alias of search for DataStructure interface)
   * @param {string} value The string value to check
   * @returns {boolean} true if the value exists, false otherwise
   */
  isPresent(value: string): boolean {
    return this.search(value);
  }

  /**
   * Checks if any word in the trie starts with the given prefix
   * @param {string} prefix The prefix to check
   * @returns {boolean} true if any word starts with the prefix, false otherwise
   */
  startsWith(prefix: string): boolean {
    if (!prefix) return false;

    return this.findNode(prefix) !== null;
  }

  /**
   * Removes a word from the trie
   * @param {string} word The word to remove
   * @returns {boolean} true if the word was removed, false if it didn't exist
   */
  delete(word: string): boolean {
    if (!word) return false;

    return this._deleteWord(this.root, word, 0);
  }

  /**
   * Removes a value from the trie (alias of delete for DataStructure interface)
   * @param {string} value The string value to remove
   * @returns {boolean} true if the value was removed, false otherwise
   */
  remove(value: string): boolean {
    return this.delete(value);
  }

  /**
   * Retrieves all words in the trie
   * @returns {string[]} Array of all words in the trie
   */
  getAllWords(): string[] {
    const words: string[] = [];
    this._collectWords(this.root, '', words);
    return words;
  }

  /**
   * Finds nodes that match the given prefix
   * @param {string} prefix The prefix to search for
   * @returns {TrieNode[]} Array of nodes that match the prefix
   */
  findNodesWithPrefix(prefix: string): TrieNode[] {
    const result: TrieNode[] = [];
    const startNode = this.findNode(prefix);

    if (startNode) {
      if (startNode.isEndOfWord) {
        result.push(startNode);
      }

      this._collectNodes(startNode, result);
    }

    return result;
  }

  /**
   * Find a node corresponding to a word/prefix
   * @param {string} str The word/prefix to find
   * @returns {TrieNode | null} The node if found, null otherwise
   */
  findNode(str: string): TrieNode | null {
    let current = this.root;

    for (let i = 0; i < str.length; i++) {
      const char = str[i].toLowerCase();
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }

  /**
   * Helper method to delete a word from the trie recursively
   * Traverses the trie and removes nodes that are no longer needed
   * @param {TrieNode} current The current node being examined
   * @param {string} word The word to be deleted
   * @param {number} index Current index in the word
   * @returns {boolean} true if the current node should be deleted (no more references), false otherwise
   * @private
   */
  private _deleteWord(current: TrieNode, word: string, index: number): boolean {
    // If we've reached the end of the word
    if (index === word.length) {
      // Word not found
      if (!current.isEndOfWord) return false;

      current.isEndOfWord = false;
      this.size--;

      // Return true if this node should be deleted (no children)
      return current.children.size === 0;
    }

    const char = word[index].toLowerCase();
    if (!current.children.has(char)) {
      return false; // Word not found
    }

    const shouldDeleteChild = this._deleteWord(current.children.get(char)!, word, index + 1);

    // If the child node should be deleted
    if (shouldDeleteChild) {
      current.children.delete(char);
      // Return true if this node should be deleted (no children and not end of another word)
      return current.children.size === 0 && !current.isEndOfWord;
    }

    return false;
  }

  /**
   * Helper method to collect all words in the trie recursively
   * Performs a depth-first traversal of the trie to gather all complete words
   * @param {TrieNode} node Current node in the traversal
   * @param {string} prefix Current string prefix built up to this node
   * @param {string[]} words Array to collect complete words
   * @private
   */
  private _collectWords(node: TrieNode, prefix: string, words: string[]): void {
    // If this node marks the end of a word, add it to our results
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    // Continue traversing all children
    for (const [char, childNode] of node.children) {
      this._collectWords(childNode, prefix + char, words);
    }
  }

  /**
   * Helper method to collect all nodes in the trie recursively
   * Collects all nodes that represent the end of a word
   * @param {TrieNode} node Current node in the traversal
   * @param {TrieNode[]} nodes Array to collect nodes that are end of words
   * @private
   */
  private _collectNodes(node: TrieNode, nodes: TrieNode[]): void {
    for (const childNode of node.children.values()) {
      if (childNode.isEndOfWord) {
        nodes.push(childNode);
      }
      this._collectNodes(childNode, nodes);
    }
  }

  /**
   * Calculate coordinates for visualizing the trie in a 2D space
   * Maps each node to x,y coordinates for visualization
   *
   * This is a simple implementation that positions nodes based on:
   * - y-coordinate: depth in the trie (level)
   * - x-coordinate: relative position among siblings at the same level
   *
   * Note: More sophisticated visualization algorithms can be implemented
   * to handle larger tries more effectively.
   */
  calculateNodeCoordinates(): void {
    const words = this.getAllWords();
    const maxDepth = Math.max(...words.map(word => word.length));
    const nodesAtDepth: Map<number, TrieNode[]> = new Map();

    // Group nodes by their depth
    this._groupNodesByDepth(this.root, 0, nodesAtDepth);

    // Calculate X coordinates
    for (let depth = 0; depth <= maxDepth; depth++) {
      const nodes = nodesAtDepth.get(depth) || [];
      const nodeCount = nodes.length;

      nodes.forEach((node, index) => {
        // Distribute nodes horizontally
        node.coordinates.x = nodeCount > 1 ? index / (nodeCount - 1) : 0.5;

        // Set depth as Y coordinate (normalized to 0-1 range)
        node.coordinates.y = maxDepth > 0 ? depth / maxDepth : 0;
      });
    }
  }

  /**
   * Helper method to group nodes by their depth in the trie
   * @param {TrieNode} node Current node in the traversal
   * @param {number} depth Current depth in the trie
   * @param {Map<number, TrieNode[]>} nodesAtDepth Map to collect nodes by their depth
   * @private
   */
  private _groupNodesByDepth(
    node: TrieNode,
    depth: number,
    nodesAtDepth: Map<number, TrieNode[]>
  ): void {
    if (!nodesAtDepth.has(depth)) {
      nodesAtDepth.set(depth, []);
    }

    nodesAtDepth.get(depth)!.push(node);

    for (const childNode of node.children.values()) {
      this._groupNodesByDepth(childNode, depth + 1, nodesAtDepth);
    }
  }
}
