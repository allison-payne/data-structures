import React from 'react';
import { DataStructureVisualization } from '~/components/shared/visualization-base';
import { useTrieContext } from '~/context/TrieContext';
import { TrieNode } from '~/structures/trie/TrieNode';
import { initialViewBox } from '~/components/svg/constants';
import SVG from '~/components/svg';
import TrieEdge from '../trie-edge';
import TrieNodeSVG from '../trie-node';
import type {
  VisualizationNodeProps,
  VisualizationEdgeProps,
} from '~/components/shared/visualization-base/types';

/**
 * Adapter component to use the generic DataStructureVisualization for trie data structure
 * Demonstrates how specific data structure visualizations can extend the base component
 *
 * @returns A rendered trie visualization
 */
export function TrieVisualizationAdapter() {
  const { trie, selectedNode, selectNode } = useTrieContext();

  /**
   * Converts coordinate values to SVG space by applying scaling
   * @param {number} coordValue The coordinate value to scale
   * @returns {string} The scaled coordinate as a string
   */
  const getScaledCoords = (coordValue: number): string => {
    return `${coordValue * initialViewBox}`;
  };

  // Function to collect all nodes and edges for rendering
  const collectNodesAndEdges = () => {
    if (!trie || !trie.root) return { nodes: [], edges: [] };

    const nodes: TrieNode[] = [];
    const edges: {
      source: TrieNode;
      target: TrieNode;
      char: string;
    }[] = [];

    // Helper function to traverse the trie
    const traverse = (node: TrieNode) => {
      nodes.push(node);

      node.children.forEach((childNode, char) => {
        edges.push({
          source: node,
          target: childNode,
          char,
        });
        traverse(childNode);
      });
    };

    traverse(trie.root);
    return { nodes, edges };
  };

  const { nodes, edges } = collectNodesAndEdges();

  // Transform the nodes and edges to our common visualization props format
  const mapNodesToVisualizationProps = (nodes: TrieNode[]): VisualizationNodeProps<string>[] => {
    return nodes.map(node => ({
      data: node.character,
      coordinates: node.coordinates,
      isSelected: selectedNode === node,
      isHighlighted: node.isEndOfWord,
      onClick: () => selectNode(node),
    }));
  };

  const mapEdgesToVisualizationProps = (
    edges: { source: TrieNode; target: TrieNode; char: string }[]
  ): VisualizationEdgeProps[] => {
    return edges.map((edge, index) => ({
      id: `edge-${index}`,
      x1: getScaledCoords(edge.source.coordinates.x),
      y1: getScaledCoords(edge.source.coordinates.y),
      x2: getScaledCoords(edge.target.coordinates.x),
      y2: getScaledCoords(edge.target.coordinates.y),
      label: edge.char,
    }));
  };

  // The Content for the visualization is still using the existing SVG component
  // This is an intermediate step - a full refactor would create a common SVG wrapper
  const visualizationContent = (
    <SVG>
      {/* Render edges first so they're behind the nodes */}
      {edges.map((edge, index) => (
        <TrieEdge
          key={`edge-${index}`}
          x1={getScaledCoords(edge.source.coordinates.x)}
          y1={getScaledCoords(edge.source.coordinates.y)}
          x2={getScaledCoords(edge.target.coordinates.x)}
          y2={getScaledCoords(edge.target.coordinates.y)}
          character={edge.char}
        />
      ))}

      {/* Render nodes */}
      {nodes.map((node, index) => (
        <TrieNodeSVG
          key={`node-${index}`}
          node={node}
          selectedNode={selectedNode}
          onClick={selectNode}
        />
      ))}
    </SVG>
  );

  return (
    <DataStructureVisualization
      className="trie-visualization"
      options={{
        maintainAspectRatio: true,
      }}
    >
      {visualizationContent}
    </DataStructureVisualization>
  );
}
