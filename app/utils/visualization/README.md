# Visualization Utilities

This directory contains shared utilities for data structure visualization. These utilities provide consistent behavior across different visualizations and simplify common visualization tasks.

## Available Utilities

### Coordinate Utilities (`coordinates.ts`)

Utilities for coordinate calculations and transformations:

- `scaleCoordinate(value: number, scaleFactor?: number): string`  
  Scales a coordinate value to SVG space

- `normalizedToViewport(coordinates: Coordinates, scaleFactor?: number): Coordinates`  
  Converts normalized coordinates (0-1 range) to SVG viewport coordinates

- `calculateMidpoint(start: Coordinates, end: Coordinates): Coordinates`  
  Calculates a midpoint between two coordinates, useful for edge label positioning

- `calculateAngle(start: Coordinates, end: Coordinates): number`  
  Calculates the angle between two points (in degrees)

- `calculateDistance(a: Coordinates, b: Coordinates): number`  
  Calculates the Euclidean distance between two coordinates

- `createInterpolator(start: number, end: number): (progress: number) => number`  
  Creates a function that linearly interpolates between two values

### Tree Layout Utilities (`tree-layout.ts`)

Utilities for positioning nodes in tree data structures:

- `DEFAULT_TREE_LAYOUT` constants
  - `SPACE_BETWEEN_CHILDREN`: 0.12
  - `SPACE_BETWEEN_SIBLINGS`: 0.24
  - `INITIAL_OFFSET`: 0.06

- `calculateNodeOffset(node: TreeLayoutNode, siblingSpace?: number, childSpace?: number): number`  
  Calculates an appropriate horizontal offset for a node based on its depth

- `calculateYCoordinates(nodes: TreeLayoutNode[], initialY?: number, childSpace?: number): void`  
  Calculates Y coordinates for tree nodes based on their depth

- `centerParentsBetweenChildren(nodes: TreeLayoutNode[]): void`  
  Adjusts parent node X coordinates to center them between their children

- `distributeNodesHorizontally(nodesByLevel: Map<number, TreeLayoutNode[]>, maxDepth: number): void`  
  Distributes nodes horizontally for a balanced appearance

- `groupNodesByDepth(rootNode: TreeLayoutNode, initialDepth?: number): Map<number, TreeLayoutNode[]>`  
  Groups tree nodes by their depth level

### Animation Utilities (`animation.ts`)

Utilities for creating smooth animations:

- `easingFunctions` - Various easing functions for animations:
  - `linear`: No easing, linear progression
  - `easeInOut`: Smooth acceleration and deceleration
  - `easeIn`: Acceleration from zero velocity
  - `easeOut`: Deceleration to zero velocity

- `animationSpeeds` - Preset animation speeds:
  - `slow`: 1000ms
  - `medium`: 500ms
  - `fast`: 250ms

- `createAnimationFrames(startValue: number, endValue: number, frames: number, easingFn?): number[]`  
  Creates animation frames for transitioning between values

- `calculateAnimationDuration(itemCount: number, speed?: string, baseTime?: number): number`  
  Calculates the appropriate animation duration based on operation complexity

- `calculateAnimationDelay(index: number, speed?: string): number`  
  Animation delay calculation based on index

### Responsive Layout Utilities (`responsive.ts`)

Utilities for adapting visualizations to different screen sizes:

- `calculateMaintainedAspectRatio(containerWidth: number, containerHeight: number, targetAspectRatio?: number): { width: number; height: number }`  
  Calculates dimensions that maintain aspect ratio when resizing

- `calculateOptimalZoomLevel(nodeCount: number, containerWidth: number, containerHeight: number): number`  
  Calculates appropriate zoom level based on node count and container size

- `calculateNodeSize(nodeCount: number, containerWidth: number, containerHeight: number, baseSizePercent?: number): number`  
  Calculates appropriate node size based on container dimensions and node count

- `calculateFontSize(nodeRadius: number, containerWidth: number): number`  
  Calculates appropriate font size based on container and node size

- `calculateViewBox(width: number, height: number, padding?: number): string`  
  Returns the appropriate SVG viewBox for the visualization

## Usage Example

```tsx
import { scaleCoordinate, calculateMidpoint, calculateAngle } from '~/utils/visualization';

// In your component:
function MyVisualization() {
  return (
    <svg viewBox="0 0 100 100">
      <circle
        cx={scaleCoordinate(node.x)}
        cy={scaleCoordinate(node.y)}
        r="3.5"
      />
    </svg>
  );
}
```

See the `VisualizationUtilsDemo` component for a complete example.
