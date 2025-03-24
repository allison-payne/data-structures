import { useCallback, useState, type ReactNode } from "react";
import { initialViewBox } from "./constants";

export type SVGProps = {
    children: ReactNode
}

const SVG = ({ children }: SVGProps) => {
    const [zoom, setZoom] = useState(initialViewBox);

    const handleZoomChange = useCallback((e: any) => {
        setZoom(e.target?.value)
    }, [])
    return (
        <div className="w-300 overflow-auto">
            <label htmlFor="zoom">Zoom</label>
            <input
                type="range"
                id="horizontal"
                name="horizontal"
                min="50"
                max="500"
                value={zoom}
                step="10"
                onChange={handleZoomChange}
                style={{width: '100%'}} />
            
            <svg viewBox={`0 0 ${zoom} ${zoom}`}>{children}</svg>  
        </div>
    )
}

export default SVG