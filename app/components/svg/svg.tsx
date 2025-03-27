import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactSVGPanZoom, TOOL_NONE, type Tool, type Value } from "react-svg-pan-zoom";

export type SVGProps = {
    children: ReactNode
}

const SVG = ({ children }: SVGProps) => {
    const Viewer = useRef<ReactSVGPanZoom>(null);
    const [tool, setTool] = useState<Tool>(TOOL_NONE);
    const [value, setValue] = useState<Value | null>(null);

    useEffect(() => {
        Viewer.current && Viewer.current.fitToViewer();
    }, [Viewer]);

    const setValueHandler = (e) => {
        console.log(e);
        setValue(e);
    };

    return (
        <ReactSVGPanZoom
            ref={Viewer}
            background="grey"
            width={600}
            height={600}
            tool={tool}
            onChangeTool={setTool}
            preventPanOutside={true}
            SVGBackground="grey"
            value={value}
            onChangeValue={setValueHandler}
            onClick={(event) =>
                console.log("click", event.x, event.y, event.originalEvent)
            }
        >
            <svg viewBox={`0 0 ${100} ${100}`}>{children}</svg>
        </ReactSVGPanZoom>
    )
}

export default SVG