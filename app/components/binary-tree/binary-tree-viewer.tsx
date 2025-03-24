import type { JSX } from "react";
import type { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import SVG from "../svg";
import { initialViewBox } from "../svg/constants";
import TreeBranch from "../svg/tree-branch";
import TreeNodeSVG from "../svg/tree-node";

export type BinaryTreeSVGProps<T> = {
    tree: BinaryTree<T>
}

export function BinaryTreeViewer<T>({ tree }: BinaryTreeSVGProps<T>): JSX.Element {
    const orderedNodes = tree.inOrder();
    const getScaledCoords = (coordValue: number): string => {
        return `${coordValue * initialViewBox}`
    }
    return (
        <SVG>
            {orderedNodes?.map((node, index) => {
                return (<>
                    {node.left &&
                        <TreeBranch
                            x1={getScaledCoords(node.coordinates.x)}
                            y1={getScaledCoords(node.coordinates.y)}
                            x2={getScaledCoords(node.left.coordinates.x)}
                            y2={getScaledCoords(node.left.coordinates.y)} />
                    }
                    {node.right &&
                        <TreeBranch
                            x1={getScaledCoords(node.coordinates.x)}
                            y1={getScaledCoords(node.coordinates.y)}
                            x2={getScaledCoords(node.right.coordinates.x)}
                            y2={getScaledCoords(node.right.coordinates.y)} />
                    }
                </>)
            })}
            {orderedNodes?.map((node, index) => {
                return (<>
                    <TreeNodeSVG<T> node={node} key={index} />
                </>)
            })}
        </SVG>
    )
};