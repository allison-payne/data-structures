// Theme colors and values for the application
// These are used for consistent styling across SVG components and UI elements

// SVG theme colors for data structure visualizations
export const svgTheme = {
  // Background colors
  background: {
    light: '#f0f0f0', // Light grey in light mode
    dark: '#333333', // Dark grey in dark mode
  },
  // Node colors
  node: {
    // Regular nodes
    fill: {
      light: '#ffffff', // White in light mode
      dark: '#1a1a1a', // Very dark grey in dark mode
    },
    // Selected nodes
    selected: {
      light: '#ff5555', // Bright red in light mode
      dark: '#ff7777', // Lighter red in dark mode
    },
    // Highlighted nodes (during algorithm visualization)
    highlighted: {
      light: '#ffcc00', // Yellow in light mode
      dark: '#ffdd44', // Slightly lighter yellow in dark mode
    },
    // End nodes (e.g., end of word in Trie)
    end: {
      light: '#ffd700', // Gold in light mode
      dark: '#ffdf4d', // Slightly lighter gold in dark mode
    },
    // Stroke colors
    stroke: {
      light: '#333333', // Dark grey in light mode
      dark: '#cccccc', // Light grey in dark mode
    },
    // Text colors
    text: {
      light: '#000000', // Black in light mode
      dark: '#ffffff', // White in dark mode
    },
    // Highlight text
    highlightedText: {
      light: '#000000', // Black in light mode
      dark: '#000000', // Black in dark mode (for contrast on highlighted nodes)
    },
  },
  // Edge/branch colors
  edge: {
    // Normal edge
    normal: {
      light: '#555555', // Dark grey in light mode
      dark: '#aaaaaa', // Light grey in dark mode
    },
    // Highlighted edge
    highlighted: {
      light: '#ff8800', // Orange in light mode
      dark: '#ff9933', // Slightly lighter orange in dark mode
    },
    // Edge labels (e.g., for Trie)
    text: {
      light: '#444444', // Dark grey in light mode
      dark: '#eeeeee', // Light grey in dark mode
    },
  },
};

// Animation properties
export const animationProps = {
  pulse: 'animate-pulse',
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
