import { useCallback, useRef, useState } from 'react';
import { useTrieContext } from '~/context/TrieContext';

/**
 *
 */
export function TrieEditorForm() {
  const addWordInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'add' | 'search' | 'words'>('add');

  const {
    words,
    searchTerm,
    searchResult,
    prefixResult,
    addWord,
    removeWord,
    clearTrie,
    searchWord,
    searchPrefix,
    setSearchTerm,
  } = useTrieContext();

  const handleAddWord = useCallback(() => {
    const inputRef = addWordInputRef.current;
    if (!inputRef || !inputRef.value.trim()) {
      return;
    }

    addWord(inputRef.value);
    inputRef.value = '';
  }, [addWord]);

  const handleSearch = useCallback(() => {
    const inputRef = searchInputRef.current;
    if (!inputRef || !inputRef.value.trim()) {
      return;
    }

    setSearchTerm(inputRef.value);
    searchWord(inputRef.value);
  }, [searchWord, setSearchTerm]);

  const handleSearchPrefix = useCallback(() => {
    const inputRef = searchInputRef.current;
    if (!inputRef || !inputRef.value.trim()) {
      return;
    }

    setSearchTerm(inputRef.value);
    searchPrefix(inputRef.value);
  }, [searchPrefix, setSearchTerm]);

  const handleRemoveWord = useCallback(
    (word: string) => {
      removeWord(word);
    },
    [removeWord]
  );

  const handleClearTrie = useCallback(() => {
    clearTrie();
  }, [clearTrie]);

  return (
    <div className="h-[600px] border-l-2 p-2 pl-4 overflow-y-auto flex flex-col">
      <div className="flex mb-4 space-x-2">
        <button
          className={`px-3 py-2 rounded-t-lg ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('add')}
        >
          Add
        </button>
        <button
          className={`px-3 py-2 rounded-t-lg ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
        <button
          className={`px-3 py-2 rounded-t-lg ${activeTab === 'words' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('words')}
        >
          Words ({words.length})
        </button>
      </div>

      <div className="flex-1">
        {activeTab === 'add' && (
          <div>
            <label className="block mb-2" htmlFor="wordValue">
              Add Word
            </label>
            <div className="p-1 text-lg w-full max-w-[100%] relative">
              <input
                className="bg-white text-black border-2 rounded-l p-1 pl-2 w-[80%]"
                type="text"
                id="wordValue"
                placeholder="Enter a word"
                ref={addWordInputRef}
              />
              <button
                className="bg-blue-400 border-2 border-black rounded-r p-1 w-[20%] absolute top-[1px] right-0"
                type="button"
                onClick={handleAddWord}
              >
                Add
              </button>
            </div>

            <button
              className="block w-full p-4 text-center bg-red-400 rounded-lg mt-3"
              type="button"
              onClick={handleClearTrie}
            >
              Clear Trie
            </button>

            <div className="mt-4 p-2 bg-gray-100 rounded dark:bg-gray-700 dark:text-white">
              <h3 className="font-bold mb-2">About Tries</h3>
              <p className="text-sm mb-2">
                A Trie (also called digital tree or prefix tree) is a tree-like data structure used
                for storing a collection of strings, with each node representing a character.
              </p>
              <p className="text-sm">
                Tries excel at prefix-based operations and are commonly used in auto-complete
                features, spell checkers, and IP routing.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            <label className="block mb-2" htmlFor="searchValue">
              Search
            </label>
            <div className="p-1 text-lg w-full max-w-[100%] relative mb-4">
              <input
                className="bg-white text-black border-2 rounded p-1 pl-2 w-full"
                type="text"
                id="searchValue"
                placeholder="Enter search term"
                ref={searchInputRef}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 mb-4">
              <button
                className="bg-blue-400 border-2 border-black rounded p-2 flex-1"
                type="button"
                onClick={handleSearch}
              >
                Exact Match
              </button>
              <button
                className="bg-green-400 border-2 border-black rounded p-2 flex-1"
                type="button"
                onClick={handleSearchPrefix}
              >
                Prefix Match
              </button>
            </div>

            <div className="mt-4">
              {searchResult !== null && (
                <div
                  className={`p-2 rounded mb-4 ${searchResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  <p>
                    {searchResult
                      ? `"${searchTerm}" was found in the trie.`
                      : `"${searchTerm}" was not found in the trie.`}
                  </p>
                </div>
              )}

              {prefixResult !== null && (
                <div className="p-2 rounded mb-4 bg-blue-100 text-blue-800">
                  <p className="mb-2">Words starting with &quot;{searchTerm}&quot;:</p>
                  {prefixResult.length === 0 ? (
                    <p>No matches found.</p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {prefixResult.map((word, index) => (
                        <li key={index}>{word}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'words' && (
          <div>
            <h2 className="text-lg font-bold mb-2">Words in Trie ({words.length})</h2>

            {words.length === 0 ? (
              <p className="italic text-gray-500">No words added yet.</p>
            ) : (
              <ul className="space-y-2">
                {words.map((word, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-1">
                    <span>{word}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveWord(word)}
                      title="Remove word"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
