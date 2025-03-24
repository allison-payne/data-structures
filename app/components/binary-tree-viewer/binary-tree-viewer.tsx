import type { JSX } from "react";
import React, { useCallback, useState } from "react";
import type { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import SVG from "../svg";
import { initialViewBox } from "../svg/constants";
import TreeBranch from "../svg/tree-branch";
import TreeNodeSVG from "../svg/tree-node";
import { ZoomSlider } from "./styles";

export type BinaryTreeSVGProps<T> = {
    tree: BinaryTree<T>
}

export function BinaryTreeViewer<T>({ tree }: BinaryTreeSVGProps<T>): JSX.Element {
    const orderedNodes = tree.inOrder();
    const getScaledCoords = (coordValue: number): string => {
        return `${coordValue * initialViewBox}`
    }

    const [zoom, setZoom] = useState(initialViewBox);

    const handleZoomChange = useCallback((e: any) => {
        setZoom(e.target?.value)
    }, [])

    return (<>
        <div className="h-[600px] align-top">
            <label className="block" htmlFor="zoom">Zoom</label>
            <ZoomSlider
                type="range"
                id="zoom"
                name="zoom"
                min="50"
                max="250"
                value={zoom}
                step="10"
                onChange={handleZoomChange} />
        </div>
        <div className="w-[600px]">
            <SVG zoom={zoom}>
                {orderedNodes?.map((node, index) => {
                    return (<React.Fragment key={`${index}`}>
                        {node.left &&
                            <TreeBranch key={`${index}-left`}
                                x1={getScaledCoords(node.coordinates.x)}
                                y1={getScaledCoords(node.coordinates.y)}
                                x2={getScaledCoords(node.left.coordinates.x)}
                                y2={getScaledCoords(node.left.coordinates.y)} />
                        }
                        {node.right &&
                            <TreeBranch key={`${index}-right`}
                                x1={getScaledCoords(node.coordinates.x)}
                                y1={getScaledCoords(node.coordinates.y)}
                                x2={getScaledCoords(node.right.coordinates.x)}
                                y2={getScaledCoords(node.right.coordinates.y)} />
                        }
                    </React.Fragment>)
                })}
                {orderedNodes?.map((node, index) => {
                    return (<TreeNodeSVG<T> node={node} key={index} />)
                })}
            </SVG>
        </div>
    </>
    )
};