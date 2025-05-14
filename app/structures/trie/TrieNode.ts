/**
 * Represents a node in a Trie data structure.
 * Each node contains a character, a flag indicating if it's the end of a word,
 * a map of child nodes, and coordinates for visualization.
 */
export class TrieNode {
  /** The character stored in this node */
  character: string;

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
    this.isEndOfWord = false;
    this.children = new Map<string, TrieNode>();
    this.coordinates = { x: 0, y: 0 };
  }
}
