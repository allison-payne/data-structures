import React from 'react';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Trie } from '~/structures/trie/Trie';
import { TrieNode } from '~/structures/trie/TrieNode';

/**
 * Props for the TrieProvider component
 */
interface TrieProviderProps {
  /** React children components */
  children: ReactNode;

  /** Optional initial words to populate the trie */
  initialWords?: Array<string>;
}

/**
 * Context interface providing trie state and operations
 * Provides access to the trie data structure and methods for manipulating it
 */
interface TrieContext {
  trie: Trie | null;
  words: Array<string>;
  selectedNode?: TrieNode;
  searchTerm: string;
  searchResult: boolean | null;
  prefixResult: string[] | null;
  addWord: (newWord: string) => void;
  removeWord: (word: string) => void;
  clearTrie: () => void;
  selectNode: (node: TrieNode) => void;
  searchWord: (word: string) => void;
  searchPrefix: (prefix: string) => void;
  setSearchTerm: (term: string) => void;
}

const defaultContext: TrieContext = {
  trie: null,
  words: [],
  searchTerm: '',
  searchResult: null,
  prefixResult: null,
  addWord: () => {},
  removeWord: () => {},
  clearTrie: () => {},
  selectNode: () => {},
  searchWord: () => {},
  searchPrefix: () => {},
  setSearchTerm: () => {},
};

const Context = createContext<TrieContext>(defaultContext);

/**
 * Provider component that wraps the application to provide trie context
 * @param {object} props Component props
 * @param {ReactNode} props.children Child components to render within the provider
 * @param {Array<string>} [props.initialWords] Initial words to populate the trie
 * @returns {React.Element} The provider component
 */
export function TrieProvider({ children, initialWords = [] }: TrieProviderProps) {
  const [trie] = useState<Trie>(new Trie());
  const [words, setWords] = useState<Array<string>>([]);
  const [selectedNode, setSelectedNode] = useState<TrieNode | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<boolean | null>(null);
  const [prefixResult, setPrefixResult] = useState<string[] | null>(null);

  const addWord = useCallback(
    (newWord: string) => {
      if (!newWord.trim()) return;

      trie.insert(newWord.trim());
      setWords(trie.getAllWords());
      trie.calculateNodeCoordinates();
    },
    [trie]
  );

  const removeWord = useCallback(
    (word: string) => {
      if (!word.trim()) return;

      trie.delete(word.trim());
      setWords(trie.getAllWords());
      trie.calculateNodeCoordinates();
    },
    [trie]
  );

  const clearTrie = useCallback(() => {
    // Create a new Trie instead of clearing existing one
    const newTrie = new Trie();
    Object.assign(trie, newTrie);
    setWords([]);
    setSelectedNode(undefined);
    setSearchResult(null);
    setPrefixResult(null);
  }, [trie]);

  const selectNode = useCallback((node: TrieNode) => {
    setSelectedNode(prev => (prev === node ? undefined : node));
  }, []);

  const searchWord = useCallback(
    (word: string) => {
      if (!word.trim()) {
        setSearchResult(null);
        return;
      }

      const result = trie.search(word.trim());
      setSearchResult(result);
      setPrefixResult(null);
    },
    [trie]
  );

  const searchPrefix = useCallback(
    (prefix: string) => {
      if (!prefix.trim()) {
        setPrefixResult(null);
        return;
      }

      // Check if there are words starting with this prefix
      const foundWords: string[] = [];
      const allWords = trie.getAllWords();
      const trimmedPrefix = prefix.trim().toLowerCase();

      allWords.forEach((word: string) => {
        if (word.toLowerCase().startsWith(trimmedPrefix)) {
          foundWords.push(word);
        }
      });

      setPrefixResult(foundWords);
      setSearchResult(null);
    },
    [trie]
  );

  // Initialize trie with initial words if provided
  useEffect(() => {
    initialWords.forEach(word => addWord(word));
    trie.calculateNodeCoordinates();
  }, [initialWords, addWord, trie]);

  const contextValue: TrieContext = {
    trie,
    words,
    selectedNode,
    searchTerm,
    searchResult,
    prefixResult,
    addWord,
    removeWord,
    clearTrie,
    selectNode,
    searchWord,
    searchPrefix,
    setSearchTerm,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

/**
 *
 */
/**
 * Custom hook to access the trie context
 * @returns {TrieContext} The trie context
 * @throws {Error} If used outside of a TrieProvider
 */
export function useTrieContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useTrieContext must be used within a TrieProvider');
  }
  return context;
}
