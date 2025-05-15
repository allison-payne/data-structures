import React from 'react';
import TrieEditorForm from '~/components/trie/editor-form';
import TrieSVGViewer from '~/components/trie/svg-viewer';
import { TrieProvider } from '~/context/TrieContext';

export const TRIE_ROUTE = 'trie';

/**
 * Trie data structure route component for visualizing trie operations
 * @returns {React.Element} The rendered Trie page
 */
export default function Trie() {
  const initialWords = ['tree', 'trie', 'try', 'trial', 'triangle', 'trend'];

  return (
    <TrieProvider initialWords={initialWords}>
      <div className="flex flex-col md:flex-row items-start justify-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
        <div className="flex-shrink-0 w-full md:w-auto md:mr-4 mb-4 md:mb-0">
          <TrieSVGViewer />
        </div>
        <div className="flex-grow max-w-full md:max-w-md">
          <TrieEditorForm />
        </div>
      </div>
    </TrieProvider>
  );
}
