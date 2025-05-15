import React, { useCallback, useEffect, useState } from 'react';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import { initialViewBox } from '../constants';

const NODE_RADIUS = 3;

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

  // Determine fill color based on selected and highlighted states
  const getFillColor = () => {
    if (highlighted) return '#ffcc00'; // Yellow for highlighted during algorithm
    if (selected) return 'red'; // Red for selected
    return 'white'; // Default white
  };

  return (
    <g className="cursor-pointer" onClick={handleNodeClick}>
      <circle
        fill={getFillColor()}
        r={NODE_RADIUS}
        cx={xPos}
        cy={yPos}
        // Add a subtle animation when highlighted
        className={highlighted ? 'animate-pulse' : ''}
      />
      <text x={xPos} y={yPos} textAnchor="middle" style={{ fontSize: '4px' }} dy={'1.5px'}>
        {text}
      </text>
    </g>
  );
}
