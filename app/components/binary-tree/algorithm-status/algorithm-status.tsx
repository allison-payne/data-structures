import React from 'react';

import type { AlgorithmType } from '../types';

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
      <div className="mt-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-700 text-center">
        <p>Select an algorithm to visualize</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
      <div className="text-sm font-semibold mb-2">{getAlgorithmDisplayName(algorithm)}</div>
      <div className="flex justify-between text-xs mb-1">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm">
        <strong>Current action:</strong> {stepDescription}
      </div>
    </div>
  );
}
