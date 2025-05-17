import React, { useCallback, useRef, useState } from 'react';
import { useTrieContext } from '~/context/TrieContext';

/**
 * Form component for interacting with the trie visualization
 * Provides controls for adding words, searching the trie, and viewing all words
 * @returns {React.Element} The rendered trie control form
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
    <div className="h-[600px] border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-r-lg">
      <div className="flex mb-5 space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'add'
              ? 'bg-blue-500 dark:bg-blue-600 text-white border-t border-l border-r border-blue-500 dark:border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('add')}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add
          </div>
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'search'
              ? 'bg-blue-500 dark:bg-blue-600 text-white border-t border-l border-r border-blue-500 dark:border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('search')}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </div>
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'words'
              ? 'bg-blue-500 dark:bg-blue-600 text-white border-t border-l border-r border-blue-500 dark:border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('words')}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Words ({words.length})
          </div>
        </button>
      </div>

      <div className="flex-1">
        {activeTab === 'add' && (
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="wordValue"
            >
              Add Word to Trie
            </label>
            <div className="relative">
              <input
                className="block w-full p-3 pr-24 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
                type="text"
                id="wordValue"
                placeholder="Enter a word"
                ref={addWordInputRef}
              />
              <button
                className="absolute right-0 top-0 h-full px-4 font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={handleAddWord}
              >
                Add
              </button>
            </div>

            <button
              className="flex items-center justify-center w-full mt-4 p-3 text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              type="button"
              onClick={handleClearTrie}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Clear Trie
            </button>

            <div className="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                About Tries
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>
                  A Trie (also called digital tree or prefix tree) is a tree-like data structure
                  used for storing a collection of strings, with each node representing a character.
                </p>
                <p>
                  Tries excel at prefix-based operations and are commonly used in auto-complete
                  features, spell checkers, and IP routing.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="searchValue"
            >
              Search Trie
            </label>
            <div className="mb-5">
              <input
                className="block w-full p-3 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
                type="text"
                id="searchValue"
                placeholder="Enter search term"
                ref={searchInputRef}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-3 mb-5">
              <button
                className="flex flex-1 items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Exact Match
              </button>
              <button
                className="flex flex-1 items-center justify-center p-3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                type="button"
                onClick={handleSearchPrefix}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Prefix Match
              </button>
            </div>

            <div className="space-y-4">
              {searchResult !== null && (
                <div
                  className={`p-4 rounded-lg border ${
                    searchResult
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center">
                    {searchResult ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="font-medium">
                      {searchResult
                        ? `"${searchTerm}" was found in the trie.`
                        : `"${searchTerm}" was not found in the trie.`}
                    </p>
                  </div>
                </div>
              )}

              {prefixResult !== null && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <p className="mb-3 font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Words starting with &quot;{searchTerm}&quot;:
                  </p>
                  {prefixResult.length === 0 ? (
                    <p className="text-sm italic pl-7">No matches found.</p>
                  ) : (
                    <ul className="space-y-1 pl-7">
                      {prefixResult.map((word, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>{word}</span>
                        </li>
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
            <div className="flex items-center mb-4 text-gray-800 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <h2 className="text-lg font-medium">Words in Trie ({words.length})</h2>
            </div>

            {words.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-center font-medium">No words added yet</p>
                <p className="text-center text-sm mt-1">Add words using the Add tab</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                {words.map((word, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">{word}</span>
                    <button
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => handleRemoveWord(word)}
                      title="Remove word"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
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
