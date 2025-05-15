export type TreeBranchProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  highlighted?: boolean;
};

/**
 * Component for rendering a branch/edge between two tree nodes
 * @param {object} props Component properties
 * @param {string} props.x1 X coordinate of start point
 * @param {string} props.y1 Y coordinate of start point
 * @param {string} props.x2 X coordinate of end point
 * @param {string} props.y2 Y coordinate of end point
 * @param {boolean} [props.highlighted] Whether this branch is highlighted in an algorithm
 * @returns {JSX.Element} SVG line representing the branch
 */
export const TreeBranch = ({ x1, y1, x2, y2, highlighted = false }: TreeBranchProps) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={highlighted ? 'var(--edge-highlighted, #ff8800)' : 'var(--edge, #aaaaaa)'}
      strokeWidth={highlighted ? 0.8 : 0.5}
      className={highlighted ? 'animate-pulse' : ''}
    />
  );
};
