import React from 'react';
import TrieEditorForm from '~/components/trie/editor-form';
import TrieVisualizationAdapter from '~/components/trie/svg-viewer';
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
      <div className="flex flex-col lg:flex-row items-start justify-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
        <div className="flex-shrink-0 w-full lg:w-1/2 lg:min-w-0 overflow-hidden">
          {/* Using the new generic visualization adapter */}
          <TrieVisualizationAdapter />
        </div>
        <div className="w-full lg:w-1/2 lg:min-w-0">
          <TrieEditorForm />
        </div>
      </div>
    </TrieProvider>
  );
}
