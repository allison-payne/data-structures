import React, { useCallback, useEffect, useState } from 'react';
import { initialViewBox } from '../../svg/constants';
import { TrieNode } from '~/structures/trie/TrieNode';

const NODE_RADIUS = 3;

export type TrieNodeSVGProps = {
  node: TrieNode;
  selectedNode?: TrieNode;
  onClick: (node: TrieNode) => void;
};

/**
 * Component for rendering a trie node as an SVG element
 * @param {object} root0 - The component props
 * @param {TrieNode} root0.node - The trie node to render
 * @param {TrieNode} [root0.selectedNode] - The currently selected node, if any
 * @param {Function} root0.onClick - Callback function when node is clicked
 * @returns {React.Element} The rendered SVG trie node
 */
export function TrieNodeSVG({ node, selectedNode, onClick }: TrieNodeSVGProps) {
  const { x, y } = node.coordinates;
  const { character, isEndOfWord } = node;

  // Scale coordinates to fit the SVG viewBox
  const xPos = x * initialViewBox;
  const yPos = y * initialViewBox;

  const [selected, setSelected] = useState<boolean>(false);

  const handleNodeClick = useCallback(() => {
    onClick(node);
  }, [node, onClick]);

  useEffect(() => {
    setSelected(selectedNode === node);
  }, [selectedNode, node]);

  return (
    <g className="cursor-pointer" onClick={handleNodeClick}>
      {/* Background highlight effect for better visibility */}
      {(selected || isEndOfWord) && (
        <circle
          fill={selected ? 'var(--node-selected, #ff5555)' : 'var(--node-highlighted, #ffcc00)'}
          opacity={0.3}
          r={NODE_RADIUS + 1.2}
          cx={xPos}
          cy={yPos}
          className={isEndOfWord ? 'animate-pulse' : ''}
        />
      )}
      {/* Main circle */}
      <circle
        fill={
          selected
            ? 'var(--node-selected, #ff5555)'
            : isEndOfWord
              ? 'var(--node-highlighted, gold)'
              : 'var(--node-fill, white)'
        }
        r={NODE_RADIUS}
        cx={xPos}
        cy={yPos}
        stroke={isEndOfWord ? 'var(--edge-highlighted, #FF8800)' : 'var(--node-stroke, grey)'}
        strokeWidth={isEndOfWord ? 0.5 : 0.2}
      />
      {/* Text label */}
      <text
        x={xPos}
        y={yPos}
        textAnchor="middle"
        style={{
          fontSize: '4px',
          userSelect: 'none',
          fontWeight: selected || isEndOfWord ? 'bold' : 'normal',
        }}
        dy={'1.5px'}
        fill={selected || isEndOfWord ? 'var(--text, black)' : 'var(--text, black)'}
      >
        {character || 'R'}
      </text>
    </g>
  );
}
