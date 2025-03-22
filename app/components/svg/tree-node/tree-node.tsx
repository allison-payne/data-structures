import { viewBoxX, viewBoxY } from "../svg";

const VERTICAL_OFFSET = 5;
const HORIZONTAL_OFFSET = 5;
const NODE_RADIUS = 3

export type TreeNodeProps = {
    x: number;
    y: number;
    data: number;
};

export const TreeNode = ({ x, y, data }: TreeNodeProps) => {
    const xPos = x * viewBoxX + HORIZONTAL_OFFSET;
    const yPos = y * viewBoxY + VERTICAL_OFFSET;
    
    return (
        <g>
            <circle fill="white" r={NODE_RADIUS} cx={xPos} cy={yPos} />
            <text x={xPos} y={yPos} textAnchor="middle" style={{ fontSize: '4px' }} dy={'1.5px'}>{data}</text>
        </g>
    )
};