import type { JSX } from "react";
import type { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import SVG from "../svg";
import TreeNodeSVG from "../svg/tree-node";

export type BinaryTreeSVGProps<T> = {
    tree: BinaryTree<T>
}

export function BinaryTreeViewer<T>({ tree }: BinaryTreeSVGProps<T>): JSX.Element {
    const orderedNodes = tree.inOrder();
    return (
        <SVG>
            {orderedNodes?.map((node, index) => (<TreeNodeSVG<T> node={node} key={index} />))}
        </SVG>
    )
};