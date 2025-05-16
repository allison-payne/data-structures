import React from 'react';
import { DataStructureVisualization } from '~/components/shared/visualization-base';
import { useBinaryTreeContext } from '~/context/BinaryTreeContext';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import TreeBranch from '~/components/svg/tree-branch';
import TreeNodeSVG from '~/components/svg/tree-node';
import SVG from '~/components/svg';
import type { VisualizationNodeProps } from '~/utils/visualization/types';
import { scaleCoordinate } from '~/utils/visualization';

/**
 * Adapter component to use the generic DataStructureVisualization for binary trees
 * Demonstrates how specific data structure visualizations can extend the base component
 * @template T The type of data stored in the binary tree
 * @returns {React.JSX.Element} A rendered binary tree visualization
 */
export function BinaryTreeVisualizationAdapter<T>() {
  const { orderedTreeNodes, selectedNode, selectNode, highlightedNodes } =
    useBinaryTreeContext<T>();

  /**
   * Converts coordinate values to SVG space by applying scaling
   * @param {number} coordValue The coordinate value to scale
   * @returns {string} The scaled coordinate as a string
   */
  const getScaledCoords = (coordValue: number): string => {
    return scaleCoordinate(coordValue);
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

  // Transform the TreeNode objects to our common VisualizationNodeProps format
  const mapNodesToVisualizationProps = (nodes: TreeNode<T>[]): VisualizationNodeProps<T>[] => {
    return nodes.map(node => ({
      data: node.data,
      coordinates: node.coordinates,
      isSelected: selectedNode === node,
      isHighlighted: isNodeHighlighted(node),
      onClick: () => selectNode(node),
    }));
  };

  // The Content for the visualization is still using the existing SVG component
  // This is intermediate step - a full refactor would create a common SVG wrapper
  const visualizationContent = (
    <SVG>
      {/* Render branches first so they're behind the nodes */}
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
                highlighted={isNodeHighlighted(node.left)}
              />
            )}
            {node.right && (
              <TreeBranch
                key={`branch-${index}-right`}
                x1={getScaledCoords(node.coordinates.x)}
                y1={getScaledCoords(node.coordinates.y)}
                x2={getScaledCoords(node.right.coordinates.x)}
                y2={getScaledCoords(node.right.coordinates.y)}
                highlighted={isNodeHighlighted(node.right)}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Render nodes */}
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
  );

  return (
    <DataStructureVisualization
      className="binary-tree-visualization"
      width="100%"
      height="100%"
      options={{
        maintainAspectRatio: true,
      }}
    >
      {visualizationContent}
    </DataStructureVisualization>
  );
}
