import type { TreeNode } from "~/structures/binary-tree/TreeNode";
import { viewBoxX, viewBoxY } from "../svg";

const VERTICAL_OFFSET = 0;
const HORIZONTAL_OFFSET = 0;
const NODE_RADIUS = 3

export type TreeNodeSVGProps<T> = {
    node: TreeNode<T>
};

export function TreeNodeSVG<T>({ node }: TreeNodeSVGProps<T>) {
    const { x, y } = node.coordinates;
    const { data } = node;
    const xPos = x * viewBoxX + HORIZONTAL_OFFSET;
    const yPos = y * viewBoxY + VERTICAL_OFFSET;

    let text = data as number;

    return (
        <g>
            <circle fill="white" r={NODE_RADIUS} cx={xPos} cy={yPos} />
            <text x={xPos} y={yPos} textAnchor="middle" style={{ fontSize: '4px' }} dy={'1.5px'}>{text}</text>
        </g>
    )
};