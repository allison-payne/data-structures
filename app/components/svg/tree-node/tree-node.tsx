import React, { useCallback, useEffect, useState } from 'react';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import { initialViewBox } from '../constants';

// Increased node radius for better visibility
const NODE_RADIUS = 3.5;

export interface NodeEffect {
  type?: 'pulse' | 'fadeOut' | 'highlight';
  duration?: number;
  progress?: number;
}

export type TreeNodeSVGProps<T> = {
  node: TreeNode<T>;
  selectedNode?: TreeNode<T>;
  onClick: (node: TreeNode<T>) => void;
  highlighted?: boolean;
  effect?: NodeEffect;
  operation?: 'insert' | 'delete' | 'select' | 'restructure' | 'none';
};

/**
 * Component for rendering a tree node as an SVG circle
 * @template T The type of data stored in the tree node
 * @param {object} props Component properties
 * @param {TreeNode<T>} props.node The tree node to render
 * @param {TreeNode<T>} [props.selectedNode] The currently selected node, if any
 * @param {Function} props.onClick Callback function when node is clicked
 * @param {NodeEffect} [props.effect] Visual effect to apply to the node
 * @param {'insert' | 'delete' | 'select' | 'restructure' | 'none'} [props.operation] Current operation being performed on the node
 * @param {boolean} [props.highlighted] Whether the node should be highlighted
 * @returns {React.Element} SVG representation of a tree node
 */
export function TreeNodeSVG<T>({
  node,
  selectedNode,
  onClick,
  highlighted = false,
  effect,
  operation = 'none',
}: TreeNodeSVGProps<T>) {
  const { x, y } = node.coordinates;
  const { data } = node;
  const xPos = x * initialViewBox;
  const yPos = y * initialViewBox;

  const text = data as number;

  const [selected, setSelected] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState({
    scale: 1,
    opacity: 1,
    glow: 0,
    strokeWidth: 1.5,
  });

  const handleNodeClick = useCallback(() => {
    setSelected(!selected);
    onClick(node);
  }, [node, selected, onClick]);

  useEffect(() => {
    setSelected(selectedNode === node);
  }, [selectedNode, node]);

  // Apply visual effects for operations
  useEffect(() => {
    if (operation === 'none' && !effect) return;

    // Handle operation-based animations
    if (operation === 'insert') {
      setAnimationState({
        scale: 1.2,
        opacity: 1,
        glow: 10,
        strokeWidth: 2,
      });

      // Reset after animation completes
      const timer = setTimeout(() => {
        setAnimationState({
          scale: 1,
          opacity: 1,
          glow: 0,
          strokeWidth: 1.5,
        });
      }, 500);

      return () => clearTimeout(timer);
    }

    if (operation === 'delete') {
      setAnimationState({
        scale: 0.8,
        opacity: 0.3,
        glow: 0,
        strokeWidth: 1.5,
      });
      return;
    }

    if (operation === 'restructure') {
      setAnimationState({
        scale: 1,
        opacity: 1,
        glow: 8,
        strokeWidth: 2,
      });
      return;
    }

    if (operation === 'select') {
      setAnimationState({
        scale: 1,
        opacity: 1,
        glow: 5,
        strokeWidth: 2,
      });
      return;
    }

    // Handle effect-based animations
    if (effect && effect.progress !== undefined) {
      if (effect.type === 'pulse') {
        const pulse = Math.sin(effect.progress * Math.PI * 2) * 0.2;
        setAnimationState({
          scale: 1 + pulse,
          opacity: 1,
          glow: 5 + pulse * 10,
          strokeWidth: 1.5,
        });
      } else if (effect.type === 'fadeOut') {
        setAnimationState({
          scale: 1 - effect.progress * 0.3,
          opacity: 1 - effect.progress,
          glow: 0,
          strokeWidth: 1.5,
        });
      } else if (effect.type === 'highlight') {
        const intensity = 0.7 + Math.sin(effect.progress * Math.PI * 2) * 0.3;
        setAnimationState({
          scale: 1,
          opacity: 1,
          glow: 5 + intensity * 5,
          strokeWidth: 1.5 + intensity,
        });
      }
    }
  }, [operation, effect]);

  return (
    <g
      className="cursor-pointer"
      onClick={handleNodeClick}
      style={{
        transform: `scale(${animationState.scale})`,
        opacity: animationState.opacity,
        transition: 'transform 0.3s, opacity 0.3s',
      }}
    >
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
