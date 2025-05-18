import React from 'react';

import type { AlgorithmType } from '~/utils/visualization/types';

/**
 * Represents a single step in an algorithm visualization
 */
export type AlgorithmStep = {
  /** Description of what happens in this step */
  description: string;

  /** IDs of nodes involved in this step */
  nodeIds: number[];

  /** Optional array of node IDs that should be highlighted */
  highlightedNodes?: number[];

  /** Optional array of edges that should be highlighted */
  highlightedEdges?: { source: number; target: number }[];
};

/**
 * Props for the AlgorithmStatus component
 */
export type AlgorithmStatusProps = {
  /** The currently selected algorithm */
  algorithm: AlgorithmType;

  /** Current step in the algorithm animation */
  currentStep: number;

  /** Total number of steps in the animation */
  totalSteps: number;

  /** Description of the current algorithm step */
  stepDescription: string;
};

/**
 * Component that displays the current status of algorithm animation
 * Shows the algorithm name, step counter, and step description
 * @param {object} props Component properties
 * @param {AlgorithmType} props.algorithm The currently selected algorithm
 * @param {number} props.currentStep Current step in the algorithm animation
 * @param {number} props.totalSteps Total number of steps in the animation
 * @param {string} props.stepDescription Description of the current algorithm step
 * @returns {React.Element} The algorithm status display
 */
export function AlgorithmStatus({
  algorithm,
  currentStep,
  totalSteps,
  stepDescription,
}: AlgorithmStatusProps) {
  const getAlgorithmDisplayName = (algorithm: AlgorithmType): string => {
    switch (algorithm) {
      case 'inOrderTraversal':
        return 'In-order Traversal';
      case 'preOrderTraversal':
        return 'Pre-order Traversal';
      case 'postOrderTraversal':
        return 'Post-order Traversal';
      case 'levelOrderTraversal':
        return 'Level-order Traversal';
      case 'insertion':
        return 'Node Insertion';
      case 'deletion':
        return 'Node Deletion';
      case 'balancing':
        return 'Tree Balancing';
      default:
        return 'No Algorithm Selected';
    }
  };

  if (algorithm === 'none') {
    return (
      <div className="mt-5 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-center">
        <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
          <p className="text-sm font-medium">Select an algorithm to begin visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center mb-3 text-gray-800 dark:text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2h8a2 2 0 012 2v14l-6-3-6 3V5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-semibold">{getAlgorithmDisplayName(algorithm)}</span>
      </div>

      <div className="flex justify-between text-xs mb-1.5 text-gray-600 dark:text-gray-400">
        <span className="font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-3">
        <div
          className="bg-blue-500 dark:bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="mt-3 p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
        <div className="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5 mt-0.5 text-blue-500 dark:text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>{stepDescription}</span>
        </div>
      </div>
    </div>
  );
}
