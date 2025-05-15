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
  /**
   * Optional width for the SVG container
   */
  width?: number | string;
  /**
   * Optional height for the SVG container
   */
  height?: number | string;
};

/**
 * Shared SVG component used for visualizing data structures
 * @param {object} props - The component props
 * @param {ReactNode} props.children - The SVG content to display
 * @param {number} [props.viewBoxWidth=100] - Width of the SVG viewBox
 * @param {number} [props.viewBoxHeight=100] - Height of the SVG viewBox
 * @param {string} [props.className] - Optional CSS classes to apply
 * @param {number|string} [props.width] - Optional width for the container
 * @param {number|string} [props.height] - Optional height for the container
 * @returns {React.Element} The SVG pan/zoom container with the provided children
 */
const SVG = ({
  children,
  viewBoxWidth = 100,
  viewBoxHeight = 100,
  className = '',
  width,
  height,
}: SVGProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const Viewer = useRef<ReactSVGPanZoom>(null);
  const [tool, setTool] = useState<Tool>(TOOL_AUTO);
  const [value, setValue] = useState<Value>({} as Value);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const { theme } = useTheme();

  // Theme-aware background colors
  const background = theme === 'light' ? '#f0f0f0' : '#333333';

  // Update dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Maintain aspect ratio if height not explicitly provided
        const containerHeight =
          typeof height !== 'undefined'
            ? typeof height === 'number'
              ? height
              : parseInt(height as string, 10) || containerWidth
            : containerWidth;

        setDimensions({
          width: containerWidth,
          height: containerHeight,
        });
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Clean up
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [height]);

  useEffect(() => {
    if (Viewer.current) {
      Viewer.current.fitToViewer();
    }
  }, [Viewer, dimensions]);

  // Reset view when children change (tree structure updates) or theme changes
  useEffect(() => {
    if (Viewer.current) {
      // Small timeout to ensure DOM is updated
      setTimeout(() => {
        Viewer.current?.fitToViewer();
      }, 100);
    }
  }, [children, theme, dimensions]);

  const setValueHandler = (e: Value) => {
    setValue(e);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: width || '100%',
        height: height || 'auto',
        aspectRatio: !height ? '1 / 1' : undefined,
      }}
      className={`svg-container rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
    >
      <ReactSVGPanZoom
        ref={Viewer}
        background={background}
        width={dimensions.width}
        height={dimensions.height}
        tool={tool}
        onChangeTool={setTool}
        preventPanOutside={true}
        detectAutoPan={false}
        SVGBackground={background}
        value={value}
        onChangeValue={setValueHandler}
        scaleFactorOnWheel={1.1}
        miniatureProps={{
          position: 'none',
          background: background,
          width: 100,
          height: 80,
        }}
        toolbarProps={{ position: 'none' }}
        className="transition-colors duration-200"
      >
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>{children}</svg>
      </ReactSVGPanZoom>
    </div>
  );
};

export default SVG;
