import { useCallback, useEffect, useState } from 'react';
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
 *
 * @param root0
 * @param root0.node
 * @param root0.selectedNode
 * @param root0.onClick
 * @param root0.highlighted
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
  }, [node, selectedNode, selected, onClick]);

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
