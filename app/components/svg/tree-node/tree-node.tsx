import { useCallback, useEffect, useState } from "react";
import type { TreeNode } from "~/structures/binary-tree/TreeNode";
import { initialViewBox } from "../constants";

const NODE_RADIUS = 3

export type TreeNodeSVGProps<T> = {
    node: TreeNode<T>;
    selectedNode?: TreeNode<T>;
    onClick: (node: TreeNode<T>) => void;
}

export function TreeNodeSVG<T>({ node, selectedNode, onClick }: TreeNodeSVGProps<T>) {

    const { x, y } = node.coordinates;
    const { data } = node;
    const xPos = x * initialViewBox;
    const yPos = y * initialViewBox;

    let text = data as number;

    const [selected, setSelected] = useState<boolean>(false);

    const handleNodeClick = useCallback(() => {
        setSelected(!selected);
        onClick(node);
    }, [node, selectedNode, selected]);

    useEffect(() => { setSelected(selectedNode === node) }, [selectedNode, node])

    return (
        <g className="cursor-pointer" onClick={handleNodeClick}>
            <circle fill={selected ? 'red' : 'white'} r={NODE_RADIUS} cx={xPos} cy={yPos} />
            <text x={xPos} y={yPos} textAnchor="middle" style={{ fontSize: '4px' }} dy={'1.5px'}>{text}</text>
        </g>
    )
};