import React, { type JSX } from 'react';
import type { AlgorithmType } from '../types';

/**
 * Props for the AlgorithmExplanation component
 */
export type AlgorithmExplanationProps = {
  /** The currently selected algorithm to explain */
  algorithm: AlgorithmType;
};

/**
 * Component that displays educational content about the selected algorithm
 * Provides explanations and descriptions of how various tree algorithms work
 * @param {object} props Component properties
 * @param {AlgorithmType} props.algorithm The algorithm type to display the explanation for
 * @returns {React.Element} JSX element with the algorithm explanation or empty fragment if no algorithm selected
 */
export function AlgorithmExplanation({ algorithm }: AlgorithmExplanationProps) {
  if (algorithm === 'none') {
    return <></>;
  }

  const explanation = getAlgorithmExplanation(algorithm);

  return (
    <div className="mt-5 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center mb-3 text-gray-800 dark:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="text-md font-semibold">About this algorithm</h4>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded border border-gray-100 dark:border-gray-600">
        {explanation}
      </div>
    </div>
  );
}

/**
 * Retrieves the educational explanation content for a specific algorithm
 * @param {AlgorithmType} algorithm The algorithm to get the explanation for
 * @returns {React.Element} JSX Element containing the explanation content
 */
function getAlgorithmExplanation(algorithm: AlgorithmType): JSX.Element {
  switch (algorithm) {
    case 'inOrderTraversal':
      return (
        <>
          <p className="mb-2">
            <strong>In-order traversal</strong> visits nodes in the following order:
          </p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Visit left subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Visit root node</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Visit right subtree</span>
            </li>
          </ol>
          <p>
            For a binary search tree, this traversal visits nodes in ascending order. It&apos;s
            commonly used when you need the elements in sorted order.
          </p>
        </>
      );

    case 'preOrderTraversal':
      return (
        <>
          <p className="mb-2">
            <strong>Pre-order traversal</strong> visits nodes in the following order:
          </p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Visit root node</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Visit left subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Visit right subtree</span>
            </li>
          </ol>
          <p>
            This traversal is useful for creating a copy of the tree or prefix expression
            evaluation.
          </p>
        </>
      );

    case 'postOrderTraversal':
      return (
        <>
          <p className="mb-2">
            <strong>Post-order traversal</strong> visits nodes in the following order:
          </p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Visit left subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Visit right subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Visit root node</span>
            </li>
          </ol>
          <p>
            This traversal is useful for deleting the tree or evaluating postfix expressions.
            Children are processed before their parent.
          </p>
        </>
      );

    case 'levelOrderTraversal':
      return (
        <>
          <p className="mb-2">
            <strong>Level-order traversal</strong> (also called breadth-first) visits:
          </p>
          <p className="pl-2 mb-2">Nodes at each level from top to bottom, left to right.</p>
          <p>
            Uses a queue to track nodes to visit next. Useful for finding the shortest path or
            creating a level-by-level copy of the tree.
          </p>
        </>
      );

    case 'balancing':
      return (
        <>
          <p className="mb-2">
            <strong>Tree balancing</strong> ensures the tree has minimal height, optimizing search
            operations.
          </p>
          <p className="mb-2">The algorithm works by:</p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Converting the tree to a sorted array (in-order traversal)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>
                Building a new balanced tree by recursively choosing the middle element as the root
              </span>
            </li>
          </ol>
          <p>
            A balanced binary search tree guarantees O(log n) time complexity for operations like
            search, insert, and delete.
          </p>
        </>
      );

    case 'insertion':
      return (
        <>
          <p className="mb-2">
            <strong>Node insertion</strong> adds a new value while maintaining BST properties.
          </p>
          <p className="mb-2">The algorithm works by:</p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Starting at the root</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>If the new value is less than current node, go to left subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>If the new value is greater than current node, go to right subtree</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <span>If we reach a null pointer, insert the new node at that position</span>
            </li>
          </ol>
          <p>
            Insertion takes O(log n) time in a balanced tree, but can be O(n) in the worst case.
          </p>
        </>
      );

    case 'deletion':
      return (
        <>
          <p className="mb-2">
            <strong>Node deletion</strong> removes a value while maintaining BST properties.
          </p>
          <p className="mb-2">The algorithm handles three cases:</p>
          <ol className="list-decimal list-inside pl-2 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Leaf node (no children): Simply remove the node</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>One child: Replace the node with its child</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>
                Two children: Replace with the successor (smallest node in right subtree), then
                delete the successor
              </span>
            </li>
          </ol>
          <p>
            Deletion ensures the BST property is preserved: all left nodes &lt; parent &lt; all
            right nodes.
          </p>
        </>
      );

    default:
      return <></>;
  }
}
