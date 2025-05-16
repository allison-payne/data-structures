import React, { useState, useEffect, useRef } from 'react';
import { DataStructureVisualization } from '~/components/shared/visualization-base';
import {
  scaleCoordinate,
  calculateMidpoint,
  calculateAngle,
  calculateDistance,
  calculateNodeSize,
  calculateOptimalZoomLevel,
  easingFunctions,
  createAnimationFrames,
} from '~/utils/visualization';

/**
 * This component demonstrates using the shared visualization utilities
 * It creates a simple graph visualization to show the functions in action
 * @returns {JSX.Element} The visualization demo component
 */
export const VisualizationUtilsDemo = () => {
  // Animation state
  const [animationProgress, setAnimationProgress] = useState(0);
  const [nodePositions, setNodePositions] = useState([
    { id: 1, label: 'Node 1', x: 0.2, y: 0.2 },
    { id: 2, label: 'Node 2', x: 0.8, y: 0.2 },
    { id: 3, label: 'Node 3', x: 0.5, y: 0.8 },
  ]);

  const animationRef = useRef<number | null>(null);

  // Sample edges for demonstration
  const demoEdges = [
    { source: 0, target: 1, label: 'Edge 1-2' },
    { source: 1, target: 2, label: 'Edge 2-3' },
    { source: 2, target: 0, label: 'Edge 3-1' },
  ];

  // Calculate appropriate node size based on node count and responsive layout
  const containerWidth = 100;
  const containerHeight = 100;
  const nodeSize = calculateNodeSize(nodePositions.length, containerWidth, containerHeight);

  // Calculate optimal zoom level based on node count
  const zoomLevel = calculateOptimalZoomLevel(
    nodePositions.length,
    containerWidth,
    containerHeight
  );

  // Animation effect
  useEffect(() => {
    let startTime: number;
    const duration = 3000; // 3 seconds for full animation cycle

    // Create animation frames for node movement
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate progress with easing
      const rawProgress = (elapsed % duration) / duration;
      const progress = easingFunctions.easeInOut(rawProgress);
      setAnimationProgress(progress);

      // Create a circular motion pattern for node 3
      const node3 = {
        ...nodePositions[2],
        x: 0.5 + Math.sin(progress * Math.PI * 2) * 0.1,
        y: 0.8 + Math.cos(progress * Math.PI * 2) * 0.1,
      };

      // Update positions
      setNodePositions([nodePositions[0], nodePositions[1], node3]);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Demo visualization content
  const demoContent = (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="none" />

      {/* Render edges first */}
      {demoEdges.map((edge, index) => {
        const sourceNode = nodePositions[edge.source];
        const targetNode = nodePositions[edge.target];

        // Get edge midpoint for label positioning
        const midpoint = calculateMidpoint(
          { x: sourceNode.x, y: sourceNode.y },
          { x: targetNode.x, y: targetNode.y }
        );

        // Calculate rotation angle for edge label
        const angle = calculateAngle(
          { x: sourceNode.x, y: sourceNode.y },
          { x: targetNode.x, y: targetNode.y }
        );

        // Calculate distance between nodes for potential scaling
        const distance = calculateDistance(
          { x: sourceNode.x, y: sourceNode.y },
          { x: targetNode.x, y: targetNode.y }
        );

        return (
          <React.Fragment key={`edge-${index}`}>
            <line
              x1={scaleCoordinate(sourceNode.x)}
              y1={scaleCoordinate(sourceNode.y)}
              x2={scaleCoordinate(targetNode.x)}
              y2={scaleCoordinate(targetNode.y)}
              stroke="var(--edge, #aaaaaa)"
              strokeWidth="0.5"
            />
            <text
              x={scaleCoordinate(midpoint.x)}
              y={scaleCoordinate(midpoint.y)}
              textAnchor="middle"
              dy="-3"
              fontSize="3"
              transform={`rotate(${angle}, ${scaleCoordinate(midpoint.x)}, ${scaleCoordinate(midpoint.y)})`}
              fill="var(--edge-text, #444444)"
            >
              {edge.label} ({distance.toFixed(2)})
            </text>
          </React.Fragment>
        );
      })}

      {/* Render nodes */}
      {nodePositions.map((node, index) => (
        <g key={`node-${index}`} className="cursor-pointer">
          <circle
            cx={scaleCoordinate(node.x)}
            cy={scaleCoordinate(node.y)}
            r={`${nodeSize}`}
            fill="var(--node-fill, white)"
            stroke="var(--node-stroke, #333)"
            strokeWidth="0.5"
          />
          <text
            x={scaleCoordinate(node.x)}
            y={scaleCoordinate(node.y)}
            textAnchor="middle"
            dy="1.5px"
            fontSize="4"
            fontWeight="normal"
            fill="var(--text, #333)"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Visualization Utilities Demo</h2>
      <p className="mb-4">
        This component demonstrates how the shared visualization utilities can be used to create
        consistent visualizations across different data structures.
      </p>

      <DataStructureVisualization
        className="binary-tree-visualization"
        options={{
          maintainAspectRatio: true,
          containerStyle: {
            background: 'var(--background)',
          },
        }}
      >
        {demoContent}
      </DataStructureVisualization>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold mb-2">Utilities Used:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>scaleCoordinate</code> - Scales node position values to SVG space
          </li>
          <li>
            <code>calculateMidpoint</code> - Calculates edge midpoints for label positioning
          </li>
          <li>
            <code>calculateAngle</code> - Determines the angle of edges for label rotation
          </li>
          <li>
            <code>calculateDistance</code> - Measures distance between nodes
          </li>
          <li>
            <code>calculateNodeSize</code> - Determines appropriate node size
          </li>
          <li>
            <code>easingFunctions</code> - Provides smooth animation transitions
          </li>
          <li>
            <code>createAnimationFrames</code> - Creates animated transitions
          </li>
        </ul>

        <div className="mt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Animation progress: {Math.round(animationProgress * 100)}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Optimal node size: {nodeSize.toFixed(2)} (calculated responsively)
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualizationUtilsDemo;
