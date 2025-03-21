import type { JSX } from "react";
import type { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import SVG from "../svg";
import TreeNode from "../svg/tree-node";

export type BinaryTreeProps<T> = {
    tree: BinaryTree<T>
}

export function BinaryTreeViewer<T>({ tree }: BinaryTreeProps<T>): JSX.Element {
    const orderedNodes = tree.inOrder();
    return (
        <SVG>
            {orderedNodes?.map((node, index) => (<TreeNode x={node.coordinates.x} y={node.coordinates.y} data={node.data as number} key={index} />))}
        </SVG>
    )
};