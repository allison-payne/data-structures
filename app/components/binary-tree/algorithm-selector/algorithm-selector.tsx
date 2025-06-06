import React, { useCallback } from 'react';
import type { AlgorithmType } from '~/utils/visualization/types';

export type AlgorithmSelectorProps = {
  onSelectAlgorithm: (algorithm: AlgorithmType) => void;
  currentAlgorithm: AlgorithmType;
};

/**
 * Component for selecting which tree algorithm to visualize
 * @param {object} props Component properties
 * @param {Function} props.onSelectAlgorithm Callback function when algorithm is selected
 * @param {AlgorithmType} props.currentAlgorithm The currently selected algorithm
 * @returns {React.Element} The algorithm selector dropdown
 */
export function AlgorithmSelector({ onSelectAlgorithm, currentAlgorithm }: AlgorithmSelectorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectAlgorithm(e.target.value as AlgorithmType);
    },
    [onSelectAlgorithm]
  );

  return (
    <div className="mb-5">
      <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        Select Algorithm
      </div>
      <div className="relative">
        <select
          value={currentAlgorithm}
          onChange={handleChange}
          className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="none">Select an algorithm...</option>
          <optgroup label="Traversals" className="font-medium">
            <option value="inOrderTraversal">In-order Traversal</option>
            <option value="preOrderTraversal">Pre-order Traversal</option>
            <option value="postOrderTraversal">Post-order Traversal</option>
            <option value="levelOrderTraversal">Level-order Traversal</option>
          </optgroup>
          <optgroup label="Operations" className="font-medium">
            <option value="insertion">Node Insertion</option>
            <option value="deletion">Node Deletion</option>
          </optgroup>
          <optgroup label="Advanced" className="font-medium">
            <option value="balancing">Tree Balancing</option>
          </optgroup>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
