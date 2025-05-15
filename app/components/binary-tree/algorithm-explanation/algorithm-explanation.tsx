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
    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="text-md font-semibold mb-2">About this algorithm</h4>
      <div className="text-sm">{explanation}</div>
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Visit left subtree</li>
            <li>Visit root node</li>
            <li>Visit right subtree</li>
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Visit root node</li>
            <li>Visit left subtree</li>
            <li>Visit right subtree</li>
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Visit left subtree</li>
            <li>Visit right subtree</li>
            <li>Visit root node</li>
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Converting the tree to a sorted array (in-order traversal)</li>
            <li>
              Building a new balanced tree by recursively choosing the middle element as the root
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Starting at the root</li>
            <li>If the new value is less than current node, go to left subtree</li>
            <li>If the new value is greater than current node, go to right subtree</li>
            <li>If we reach a null pointer, insert the new node at that position</li>
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
          <ol className="list-decimal list-inside pl-2 mb-2">
            <li>Leaf node (no children): Simply remove the node</li>
            <li>One child: Replace the node with its child</li>
            <li>
              Two children: Replace with the successor (smallest node in right subtree), then delete
              the successor
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
