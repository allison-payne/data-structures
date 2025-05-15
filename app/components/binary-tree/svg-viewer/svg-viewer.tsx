// filepath: c:\Users\allis\Repositories\data-structures\app\components\binary-tree\svg-viewer\svg-viewer.tsx
import type { JSX } from 'react';
import React from 'react';
import { useBinaryTreeContext } from '~/context/BinaryTreeContext';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import SVG from '../../svg';
import { initialViewBox } from '../../svg/constants';
import TreeBranch from '../../svg/tree-branch';
import TreeNodeSVG from '../../svg/tree-node';

/**
 * Component for visualizing a Binary Search Tree using SVG
 * Renders the tree structure with nodes and branches, supports node selection
 * and algorithm visualization with highlighting
 * @template T The type of data stored in the binary tree
 * @returns {JSX.Element} The visualized binary tree component
 */
export function BinaryTreeSVGViewer<T>(): React.ReactElement {
  const { orderedTreeNodes, selectedNode, selectNode, highlightedNodes } =
    useBinaryTreeContext<T>();

  /**
   * Converts coordinate values to SVG space by applying scaling
   * @param {number} coordValue The coordinate value to scale
   * @returns {string} The scaled coordinate as a string
   */
  const getScaledCoords = (coordValue: number): string => {
    return `${coordValue * initialViewBox}`;
  };

  /**
   * Determines if a node should be highlighted as part of the algorithm visualization
   * @param {TreeNode<T>} node The tree node to check
   * @returns {boolean} true if the node should be highlighted, false otherwise
   */
  const isNodeHighlighted = (node: TreeNode<T>): boolean => {
    if (!highlightedNodes || highlightedNodes.length === 0) return false;
    // Convert node data to number for comparison with highlightedNodes array
    const nodeData = Number(node.data);
    // Type assertion needed because highlightedNodes type might not match converted nodeData
    return highlightedNodes.includes(nodeData as unknown as T);
  };

  return (
    <div className="w-[600px]">
      <SVG>
        {orderedTreeNodes?.map((node, index) => {
          return (
            <React.Fragment key={`branch-${index}`}>
              {node.left && (
                <TreeBranch
                  key={`branch-${index}-left`}
                  x1={getScaledCoords(node.coordinates.x)}
                  y1={getScaledCoords(node.coordinates.y)}
                  x2={getScaledCoords(node.left.coordinates.x)}
                  y2={getScaledCoords(node.left.coordinates.y)}
                />
              )}
              {node.right && (
                <TreeBranch
                  key={`branch-${index}-right`}
                  x1={getScaledCoords(node.coordinates.x)}
                  y1={getScaledCoords(node.coordinates.y)}
                  x2={getScaledCoords(node.right.coordinates.x)}
                  y2={getScaledCoords(node.right.coordinates.y)}
                />
              )}
            </React.Fragment>
          );
        })}
        {orderedTreeNodes?.map((node, index) => {
          return (
            <TreeNodeSVG<T>
              node={node}
              key={`node-${index}`}
              selectedNode={selectedNode}
              onClick={selectNode}
              highlighted={isNodeHighlighted(node)}
            />
          );
        })}
      </SVG>
    </div>
  );
}
