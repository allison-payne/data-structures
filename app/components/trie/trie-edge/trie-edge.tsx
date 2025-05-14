export type TrieEdgeProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  character: string;
};

/**
 *
 * @param root0
 * @param root0.x1
 * @param root0.y1
 * @param root0.x2
 * @param root0.y2
 * @param root0.character
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
