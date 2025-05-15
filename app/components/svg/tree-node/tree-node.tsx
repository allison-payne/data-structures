import React, { useCallback, useEffect, useState } from 'react';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import { initialViewBox } from '../constants';

// Increased node radius for better visibility
const NODE_RADIUS = 3.5;

export type TreeNodeSVGProps<T> = {
  node: TreeNode<T>;
  selectedNode?: TreeNode<T>;
  onClick: (node: TreeNode<T>) => void;
  highlighted?: boolean;
};

/**
 * Component for rendering a tree node as an SVG circle
 * @template T The type of data stored in the tree node
 * @param {object} props Component properties
 * @param {TreeNode<T>} props.node The tree node to render
 * @param {TreeNode<T>} [props.selectedNode] The currently selected node, if any
 * @param {Function} props.onClick Callback function when node is clicked
 * @param {boolean} [props.highlighted] Whether the node should be highlighted
 * @returns {React.Element} SVG representation of a tree node
 */
export function TreeNodeSVG<T>({
  node,
  selectedNode,
  onClick,
  highlighted = false,
}: TreeNodeSVGProps<T>) {
  const { x, y } = node.coordinates;
  const { data } = node;
  const xPos = x * initialViewBox;
  const yPos = y * initialViewBox;

  const text = data as number;

  const [selected, setSelected] = useState<boolean>(false);

  const handleNodeClick = useCallback(() => {
    setSelected(!selected);
    onClick(node);
  }, [node, selected, onClick]);

  useEffect(() => {
    setSelected(selectedNode === node);
  }, [selectedNode, node]);

  return (
    <g className="cursor-pointer" onClick={handleNodeClick}>
      {/* Background highlight effect for better visibility */}
      {(highlighted || selected) && (
        <circle
          fill={highlighted ? 'var(--node-highlighted, #ffcc00)' : 'var(--node-selected, #ff5555)'}
          opacity={0.3}
          r={NODE_RADIUS + 1.5}
          cx={xPos}
          cy={yPos}
          className={highlighted ? 'animate-pulse' : ''}
        />
      )}
      {/* Main circle */}
      <circle
        fill={
          highlighted
            ? 'var(--node-highlighted, #ffcc00)'
            : selected
              ? 'var(--node-selected, #ff5555)'
              : 'var(--node-fill, white)'
        }
        stroke={
          selected
            ? 'var(--text, black)'
            : highlighted
              ? 'var(--edge-highlighted, #ff8800)'
              : 'var(--node-stroke, #333)'
        }
        strokeWidth={0.5}
        r={NODE_RADIUS}
        cx={xPos}
        cy={yPos}
        // Add a subtle animation when highlighted
        className={highlighted ? 'animate-pulse' : ''}
      />
      {/* Node text */}
      <text
        x={xPos}
        y={yPos}
        textAnchor="middle"
        style={{
          fontSize: '4px',
          fontWeight: selected || highlighted ? 'bold' : 'normal',
          fill: selected || highlighted ? 'var(--text, black)' : 'var(--text, #333)',
        }}
        dy={'1.5px'}
      >
        {text}
      </text>
    </g>
  );
}
