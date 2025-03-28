import type { JSX } from "react";
import React from "react";
import { useBinaryTreeContext } from "~/context/BinaryTreeContext";
import SVG from "../svg";
import { initialViewBox } from "../svg/constants";
import TreeBranch from "../svg/tree-branch";
import TreeNodeSVG from "../svg/tree-node";

export function BinaryTreeViewer<T>(): JSX.Element {

    const { orderedTreeNodes } = useBinaryTreeContext<T>();

    const getScaledCoords = (coordValue: number): string => {
        return `${coordValue * initialViewBox}`
    }

    return (
        <>
            <div className="w-[600px]">
                <SVG>
                    {orderedTreeNodes?.map((node, index) => {
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
                    {orderedTreeNodes?.map((node, index) => {
                        return (<TreeNodeSVG<T> node={node} key={index} />)
                    })}
                </SVG>
            </div>
        </>
    )
};