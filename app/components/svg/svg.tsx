import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ReactSVGPanZoom, TOOL_AUTO, type Tool, type Value } from 'react-svg-pan-zoom';
import { useTheme } from '~/context/ThemeContext';

export type SVGProps = {
  children: ReactNode;
  /**
   * Width of the SVG viewBox (default: 100)
   */
  viewBoxWidth?: number;
  /**
   * Height of the SVG viewBox (default: 100)
   */
  viewBoxHeight?: number;
  /**
   * Optional className to apply to the SVG container
   */
  className?: string;
};

/**
 * Shared SVG component used for visualizing data structures
 * @param {object} props - The component props
 * @param {ReactNode} props.children - The SVG content to display
 * @param {number} [props.viewBoxWidth=100] - Width of the SVG viewBox
 * @param {number} [props.viewBoxHeight=100] - Height of the SVG viewBox
 * @param {string} [props.className] - Optional CSS classes to apply
 * @returns {React.Element} The SVG pan/zoom container with the provided children
 */
const SVG = ({ children, viewBoxWidth = 100, viewBoxHeight = 100, className = '' }: SVGProps) => {
  const Viewer = useRef<ReactSVGPanZoom>(null);
  const [tool, setTool] = useState<Tool>(TOOL_AUTO);
  const [value, setValue] = useState<Value>({} as Value);
  const { theme } = useTheme();

  // Theme-aware background colors
  const background = theme === 'light' ? '#f0f0f0' : '#333333';

  useEffect(() => {
    if (Viewer.current) {
      Viewer.current.fitToViewer();
    }
  }, [Viewer]);

  // Reset view when children change (tree structure updates) or theme changes
  useEffect(() => {
    if (Viewer.current) {
      // Small timeout to ensure DOM is updated
      setTimeout(() => {
        Viewer.current?.fitToViewer();
      }, 50);
    }
  }, [children, theme]);

  const setValueHandler = (e: Value) => {
    setValue(e);
  };

  return (
    <div
      className={`svg-container rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <ReactSVGPanZoom
        ref={Viewer}
        background={background}
        width={600}
        height={600}
        tool={tool}
        onChangeTool={setTool}
        preventPanOutside={true}
        SVGBackground={background}
        value={value}
        onChangeValue={setValueHandler}
        scaleFactorOnWheel={1.1}
        miniatureProps={{ position: 'none', background, width: 100, height: 80 }}
        toolbarProps={{ position: 'none' }}
      >
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>{children}</svg>
      </ReactSVGPanZoom>
    </div>
  );
};

export default SVG;
