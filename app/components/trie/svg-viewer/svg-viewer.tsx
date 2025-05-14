import React from 'react';
import { useTrieContext } from '~/context/TrieContext';
import { TrieNode } from '~/structures/trie/TrieNode';
import SVG from '../../svg';
import { initialViewBox } from '../../svg/constants';
import TrieEdge from '../trie-edge';
import TrieNodeSVG from '../trie-node';

/**
 *
 */
export function TrieSVGViewer(): React.JSX.Element {
  const { trie, selectedNode, selectNode } = useTrieContext();

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

  return (
    <div className="w-[600px]">
      <SVG>
        {/* Render edges first so they are behind the nodes */}
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
    </div>
  );
}
