import React, { type ReactNode, useRef, useState, useEffect } from 'react';
import { useTheme } from '~/context/ThemeContext';

export interface DataStructureVisualizationProps {
  /**
   * The children elements to render inside the visualization container
   */
  children: ReactNode;

  /**
   * Optional className to apply to the container
   */
  className?: string;

  /**
   * Optional width for the container (default: 100%)
   */
  width?: number | string;

  /**
   * Optional height for the container (default: aspect ratio 1:1)
   */
  height?: number | string;

  /**
   * Optional rendering options specific to the data structure
   */
  options?: {
    /**
     * Whether to maintain 1:1 aspect ratio when height is not specified
     * default: true
     */
    maintainAspectRatio?: boolean;

    /**
     * Background color override (if not using theme)
     */
    background?: string;

    /**
     * Border style override
     */
    border?: string;

    /**
     * Additional styles to apply to the container
     */
    containerStyle?: React.CSSProperties;
  };
}

/**
 * A generic visualization component for data structures that provides
 * consistent styling, theming, and responsive behavior
 *
 * @param props Component properties
 * @returns The visualization container with rendered content
 */
export function DataStructureVisualization({
  children,
  className = '',
  width,
  height,
  options = {},
}: DataStructureVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  const { maintainAspectRatio = true, background, border, containerStyle = {} } = options;

  // Default theme-aware background colors
  const themeBackground = theme === 'light' ? '#f9f9f9' : '#1e1e1e';
  const themeBorder = theme === 'light' ? 'border border-gray-200' : 'border border-gray-700';

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
            : maintainAspectRatio
              ? containerWidth
              : undefined;

        setDimensions({
          width: containerWidth,
          height: containerHeight || containerWidth,
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
  }, [height, maintainAspectRatio]);

  return (
    <div
      ref={containerRef}
      style={{
        width: width || '100%',
        height: height || 'auto',
        aspectRatio: !height && maintainAspectRatio ? '1 / 1' : undefined,
        background: background || themeBackground,
        ...containerStyle,
      }}
      className={`data-structure-visualization rounded-lg overflow-hidden ${border || themeBorder} shadow-sm ${className}`}
      data-testid="data-structure-visualization"
    >
      <div
        className="visualization-content h-full w-full"
        data-dimensions={JSON.stringify(dimensions)}
      >
        {children}
      </div>
    </div>
  );
}
