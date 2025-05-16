import { type ITrieNode } from '../interfaces/DataStructure';

/**
 * Represents a node in a Trie data structure.
 * Each node contains a character, a flag indicating if it's the end of a word,
 * a map of child nodes, and coordinates for visualization.
 */
export class TrieNode implements ITrieNode {
  /** The character stored in this node */
  character: string;

  /** The data value stored in this node (same as character for Trie) */
  data: string;

  /** Flag indicating if this node represents the end of a complete word */
  isEndOfWord: boolean;

  /** Map of child nodes, with characters as keys */
  children: Map<string, TrieNode>;

  /** Coordinates for visual representation of the node */
  coordinates: { x: number; y: number };

  /**
   * Creates a new TrieNode instance
   * @param {string} [character] The character to be stored in this node, defaults to empty string for root node
   */
  constructor(character: string = '') {
    this.character = character;
    this.data = character; // Set data to be the same as character
    this.isEndOfWord = false;
    this.children = new Map<string, TrieNode>();
    this.coordinates = { x: 0, y: 0 };
  }
}
