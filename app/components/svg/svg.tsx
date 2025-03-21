import type { ReactNode } from "react";

export const viewBoxX = 100;
export const viewBoxY = 100;

export type SVGProps = {
    children: ReactNode
}

const SVG = ({ children }: SVGProps) => {
    return (
        <div className="w-150 overflow-auto">
            <svg viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}>{children}</svg>
        </div>
    )
}

export default SVG