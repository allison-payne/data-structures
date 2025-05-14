import type { AlgorithmType } from '../types';

export type AlgorithmStep = {
  description: string;
  nodeIds: number[];
  highlightedNodes?: number[];
  highlightedEdges?: { source: number; target: number }[];
};

export type AlgorithmStatusProps = {
  algorithm: AlgorithmType;
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
};

/**
 *
 * @param root0
 * @param root0.algorithm
 * @param root0.currentStep
 * @param root0.totalSteps
 * @param root0.stepDescription
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
