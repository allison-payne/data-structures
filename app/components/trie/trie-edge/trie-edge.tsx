import React from 'react';

export type TrieEdgeProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  character: string;
};

/**
 * Component for rendering an edge between two nodes in the Trie visualization
 * @param {object} root0 - The component props
 * @param {string} root0.x1 - The x-coordinate of the starting point
 * @param {string} root0.y1 - The y-coordinate of the starting point
 * @param {string} root0.x2 - The x-coordinate of the ending point
 * @param {string} root0.y2 - The y-coordinate of the ending point
 * @param {string} root0.character - The character to display on the edge
 * @returns {React.Element} The rendered SVG edge with character
 */
export function TrieEdge({ x1, y1, x2, y2, character }: TrieEdgeProps) {
  // Calculate the midpoint for placing the edge label
  const midX = (parseFloat(x1) + parseFloat(x2)) / 2;
  const midY = (parseFloat(y1) + parseFloat(y2)) / 2;

  return (
    <>
      <line stroke="white" strokeWidth={0.5} x1={x1} y1={y1} x2={x2} y2={y2} />
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        style={{ fontSize: '3.5px' }}
      >
        {character}
      </text>
    </>
  );
}
