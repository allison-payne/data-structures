import React, { useState } from 'react';
import BinaryTreeForm from '~/components/binary-tree/editor-form';
import BinaryTreeSVGViewer from '~/components/binary-tree/svg-viewer';
import { BinaryTreeProvider } from '~/context/BinaryTreeContext';

export const BST_ROUTE = 'binary-search-tree';

/**
 * Binary Search Tree route component for visualizing binary search tree operations
 * Provides an interactive interface for learning tree operations and algorithms
 * @returns {React.Element} The rendered Binary Search Tree page
 */
export default function BST() {
  // Predefined tree patterns
  const treePatterns = {
    random: 'Random',
    balanced: 'Balanced (Perfect)',
    unbalanced: 'Unbalanced (Skewed)',
    zigzag: 'Zigzag Pattern',
  };

  // Generate a random array of integers for the initial tree data
  const generateRandomTreeData = () => {
    // Random length between 10 and 20
    const length = Math.floor(Math.random() * 11) + 10; // 10 to 20
    const data: number[] = [];

    // Generate random integers between 1 and 100
    for (let i = 0; i < length; i++) {
      const randomValue = Math.floor(Math.random() * 100) + 1;
      // Ensure no duplicates (BST doesn't handle duplicates well)
      if (!data.includes(randomValue)) {
        data.push(randomValue);
      } else {
        i--; // Try again to get a unique value
      }
    }

    return {
      type: 'random',
      title: 'Random Tree',
      values: data,
      length: data.length,
      min: Math.min(...data),
      max: Math.max(...data),
    };
  };

  const generateBalancedTree = () => {
    // Generate a perfect binary tree (balanced at all levels)
    // For example: [50, 25, 75, 15, 35, 65, 85, 10, 20, 30, 40, 60, 70, 80, 90]
    const values = [50, 25, 75, 15, 35, 65, 85, 10, 20, 30, 40, 60, 70, 80, 90];

    return {
      type: 'balanced',
      title: 'Balanced Tree (Perfect)',
      values,
      length: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const generateUnbalancedTree = () => {
    // Generate a right-skewed tree
    // Each node has only right children, creating maximum height
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return {
      type: 'unbalanced',
      title: 'Unbalanced Tree (Right-Skewed)',
      values,
      length: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const generateZigzagTree = () => {
    // Generate a zigzag pattern tree
    // Alternating between left and right children
    const values = [50, 25, 75, 30, 70, 35, 65, 40, 60, 45, 55];

    return {
      type: 'zigzag',
      title: 'Zigzag Pattern Tree',
      values,
      length: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  };

  const getTreeDataByPattern = (pattern: string) => {
    switch (pattern) {
      case 'balanced':
        return generateBalancedTree();
      case 'unbalanced':
        return generateUnbalancedTree();
      case 'zigzag':
        return generateZigzagTree();
      case 'random':
      default:
        return generateRandomTreeData();
    }
  };

  const [treeData, setTreeData] = useState(() => generateRandomTreeData());
  const [pattern, setPattern] = useState('random');
  const initialTreeData = treeData.values;

  const handlePatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    setTreeData(getTreeDataByPattern(newPattern));
  };

  const handleRefreshTree = () => {
    setTreeData(getTreeDataByPattern(pattern));
  };

  return (
    <div>
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
          <p className="text-sm">
            <strong>{treeData.title}:</strong> {treeData.length} nodes, ranging from {treeData.min}{' '}
            to {treeData.max}
          </p>
          <button
            onClick={handleRefreshTree}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-1 px-3 rounded text-sm"
          >
            Regenerate
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="pattern-select" className="text-sm font-medium">
            Tree Pattern:
          </label>
          <select
            id="pattern-select"
            value={pattern}
            onChange={handlePatternChange}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {Object.entries(treePatterns).map(([key, label]) => (
              <option key={key} value={key} className="dark:bg-gray-800">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <BinaryTreeProvider<number> initialData={initialTreeData}>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
          <div className="flex-shrink-0 w-full lg:w-1/2 lg:min-w-0 overflow-hidden">
            <BinaryTreeSVGViewer<number> />
          </div>
          <div className="w-full lg:w-1/2 lg:min-w-0">
            <BinaryTreeForm<number> />
          </div>
        </div>
      </BinaryTreeProvider>
    </div>
  );
}
