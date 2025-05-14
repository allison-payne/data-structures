import { useCallback, useEffect, useState } from 'react';
import { initialViewBox } from '../../svg/constants';
import { TrieNode } from '~/structures/trie/TrieNode';

const NODE_RADIUS = 3;

export type TrieNodeSVGProps = {
  node: TrieNode;
  selectedNode?: TrieNode;
  onClick: (node: TrieNode) => void;
};

/**
 *
 * @param root0
 * @param root0.node
 * @param root0.selectedNode
 * @param root0.onClick
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
      <circle
        fill={selected ? 'red' : isEndOfWord ? 'gold' : 'white'}
        r={NODE_RADIUS}
        cx={xPos}
        cy={yPos}
        stroke={isEndOfWord ? '#FF8800' : 'grey'}
        strokeWidth={isEndOfWord ? 0.5 : 0.2}
      />
      <text
        x={xPos}
        y={yPos}
        textAnchor="middle"
        style={{ fontSize: '4px', userSelect: 'none' }}
        dy={'1.5px'}
        fill={selected ? 'white' : 'black'}
      >
        {character || 'R'}
      </text>
    </g>
  );
}
