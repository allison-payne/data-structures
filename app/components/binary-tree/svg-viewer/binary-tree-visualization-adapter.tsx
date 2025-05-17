import React, { useEffect, useRef, useState } from 'react';
import { DataStructureVisualization } from '~/components/shared/visualization-base';
import { useBinaryTreeContext } from '~/context/BinaryTreeContext';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import TreeBranch from '~/components/svg/tree-branch';
import TreeNodeSVG from '~/components/svg/tree-node';
import SVG from '~/components/svg';
import type { VisualizationNodeProps } from '~/utils/visualization/types';
import { scaleCoordinate } from '~/utils/visualization';
import { applyReingoldTilfordLayout } from '~/utils/visualization/tree-layout';

/**
 * Define our animation effect type locally, matching what's in TreeNodeSVG
 */
interface NodeEffect {
  type?: 'pulse' | 'fadeOut' | 'highlight';
  duration?: number;
  progress?: number;
}

/**
 * Adapter component to use the generic DataStructureVisualization for binary trees
 * Demonstrates how specific data structure visualizations can extend the base component
 * @template T The type of data stored in the binary tree
 * @returns {React.ReactElement} A rendered binary tree visualization
 */
export function BinaryTreeVisualizationAdapter<T>() {
  const { orderedTreeNodes, selectedNode, selectNode, highlightedNodes } =
    useBinaryTreeContext<T>();

  // Store animation and operation states
  const [nodeOperations, setNodeOperations] = useState<
    Record<
      string,
      { operation: 'insert' | 'delete' | 'select' | 'restructure' | 'none'; timestamp: number }
    >
  >({});
  const [animationEffects, setAnimationEffects] = useState<Record<string, NodeEffect>>({});

  // Track previous tree state to detect changes
  const previousNodesRef = useRef<TreeNode<T>[]>([]);

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

  /**
   * Apply the Reingold-Tilford algorithm to optimize node positioning
   * This is called whenever the tree structure changes
   */
  useEffect(() => {
    if (!orderedTreeNodes || orderedTreeNodes.length === 0) return;

    // Get the root node (first element in pre-order traversal)
    const rootNode = orderedTreeNodes[0];

    // Apply the Reingold-Tilford algorithm for optimal layout
    applyReingoldTilfordLayout(rootNode);

    // Detect nodes that have changed position and create animations
    const newOperations = { ...nodeOperations };
    const newEffects = { ...animationEffects };

    const previousNodesMap = new Map(
      previousNodesRef.current.map(node => [String(node.data), node])
    );

    orderedTreeNodes.forEach(node => {
      const nodeId = String(node.data);
      const prevNode = previousNodesMap.get(nodeId);

      // If node exists in previous state but position changed, it's a restructuring
      if (
        prevNode &&
        (Math.abs(prevNode.coordinates.x - node.coordinates.x) > 0.001 ||
          Math.abs(prevNode.coordinates.y - node.coordinates.y) > 0.001)
      ) {
        newOperations[nodeId] = { operation: 'restructure', timestamp: Date.now() };

        // Add transition animation effect
        newEffects[nodeId] = {
          type: 'highlight',
          duration: 500,
          progress: 0,
        };

        // Start animation - we'll update progress in another effect
        const interval = setInterval(() => {
          setAnimationEffects(prev => {
            const updated = { ...prev };
            if (updated[nodeId]) {
              const newProgress = (updated[nodeId].progress || 0) + 0.05;
              if (newProgress >= 1) {
                clearInterval(interval);
                // Remove effect after animation completes
                delete updated[nodeId];
              } else {
                updated[nodeId] = {
                  ...updated[nodeId],
                  progress: newProgress,
                };
              }
            }
            return updated;
          });
        }, 50);
      }
      // If node doesn't exist in previous state, it's a new node
      else if (!prevNode) {
        newOperations[nodeId] = { operation: 'insert', timestamp: Date.now() };
      }
    });

    // Check for deleted nodes
    previousNodesRef.current.forEach(prevNode => {
      const nodeId = String(prevNode.data);
      const stillExists = orderedTreeNodes.some(node => String(node.data) === nodeId);

      if (!stillExists) {
        // Keep deleted nodes with fade-out effect temporarily
        newOperations[nodeId] = { operation: 'delete', timestamp: Date.now() };

        // After animation, clean up the deleted node references
        setTimeout(() => {
          setNodeOperations(prev => {
            const updated = { ...prev };
            delete updated[nodeId];
            return updated;
          });
        }, 1000);
      }
    });

    setNodeOperations(newOperations);
    setAnimationEffects(newEffects);

    // Update reference to current tree state
    previousNodesRef.current = [...orderedTreeNodes];
  }, [orderedTreeNodes, nodeOperations, animationEffects]);

  // Transform the TreeNode objects to our common VisualizationNodeProps format
  // This will be used in future refactoring to standardize visualization props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mapNodesToVisualizationProps = (nodes: TreeNode<T>[]): VisualizationNodeProps<T>[] => {
    return nodes.map(node => ({
      data: node.data,
      coordinates: node.coordinates,
      isSelected: selectedNode === node,
      isHighlighted: isNodeHighlighted(node),
      onClick: () => selectNode(node),
      operation: nodeOperations[String(node.data)]?.operation || 'none',
      effect: animationEffects[String(node.data)],
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
        const nodeId = String(node.data);
        const operation = nodeOperations[nodeId]?.operation || 'none';
        const effect = animationEffects[nodeId];

        return (
          <TreeNodeSVG<T>
            node={node}
            key={`node-${index}`}
            selectedNode={selectedNode}
            onClick={selectNode}
            highlighted={isNodeHighlighted(node)}
            operation={operation}
            effect={effect}
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
