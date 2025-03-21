import { viewBoxX, viewBoxY } from "../svg";

const verticalOffset = 5;
export const NODE_WIDTH = 5

export type TreeNodeProps = {
    x: number;
    y: number;
    data: number;
};

export const TreeNode = ({ x, y, data }: TreeNodeProps) => {
    return (
        <g>
            <circle fill="white" r={5} cx={x * viewBoxX} cy={y * viewBoxY + verticalOffset} />
            <text x={x * viewBoxX} y={y * viewBoxY + verticalOffset} text-anchor="middle" style={{ fontSize: '4px' }} dy={'2px'}>{data}</text>
        </g>
    )
};