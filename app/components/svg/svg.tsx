import { type ReactNode } from "react";

export type SVGProps = {
    children: ReactNode
    zoom: number
}

const SVG = ({ zoom, children }: SVGProps) => {
    return <svg viewBox={`0 0 ${zoom} ${zoom}`}>{children}</svg>  
}

export default SVG