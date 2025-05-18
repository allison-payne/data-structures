import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { ReactSVGPanZoom, TOOL_AUTO, type Tool, type Value } from 'react-svg-pan-zoom';
import { useTheme } from '~/context/ThemeContext';
import { calculateMaintainedAspectRatio, calculateViewBox } from '~/utils/visualization';

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
 * @param {number} [props.viewBoxWidth] - Width of the SVG viewBox
 * @param {number} [props.viewBoxHeight] - Height of the SVG viewBox
 * @param {string} [props.className] - Optional CSS classes to apply
 * @param {number|string} [props.width] - Optional width for the container
 * @param {number|string} [props.height] - Optional height for the container
 * @returns {React.JSX.Element} The SVG pan/zoom container with the provided children
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
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const { theme } = useTheme();

  // Theme-aware background colors
  const background = theme === 'light' ? '#f0f0f0' : '#333333';

  // Update dimensions based on container size while maintaining aspect ratio
  useEffect(() => {
    const currentContainer = containerRef.current;

    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Use our utility to calculate dimensions that maintain aspect ratio
        const optimalDimensions = calculateMaintainedAspectRatio(
          containerWidth,
          containerHeight,
          viewBoxWidth / viewBoxHeight
        );

        setDimensions(optimalDimensions);
      }
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    // Clean up
    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef, viewBoxWidth, viewBoxHeight]);

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
      {dimensions && (
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
          <svg viewBox={calculateViewBox(viewBoxWidth, viewBoxHeight, 0.05)}>{children}</svg>
        </ReactSVGPanZoom>
      )}
    </div>
  );
};

export default SVG;
