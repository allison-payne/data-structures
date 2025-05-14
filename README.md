# Data Structures 101

An interactive educational platform for visualizing and learning about data structures and algorithms.

Data Structures 101 offers a dynamic and engaging way to explore fundamental computer science concepts through interactive visualizations. Whether you're a student mastering the basics or a developer refreshing your knowledge, this application helps you understand data structures and algorithm operations through hands-on interaction and step-by-step animations.

## Features

### Binary Search Tree (BST)

![Binary Search Tree Visualization](https://raw.githubusercontent.com/username/data-structures/main/docs/screenshots/bst-preview.png)

- **Interactive Tree Visualization**: Click on nodes to select them for operations
- **Algorithm Animations**:
  - **Traversals**: In-order, Pre-order, Post-order, Level-order with visual node highlighting
  - **Operations**: Insertion, Deletion, Balancing with step-by-step animation
- **Tree Generation Options**:
  - Random: Generates a tree with random values
  - Balanced (Perfect): Creates an ideally balanced binary tree
  - Unbalanced (Skewed): Demonstrates a worst-case scenario tree
  - Zigzag Pattern: Shows an alternating pattern tree
- **Animation Controls**:
  - Play/Pause: Control animation execution
  - Step Forward/Backward: Navigate through algorithm steps
  - Speed Control: Adjust animation speed
- **Educational Content**: Algorithm explanations with step-by-step descriptions

### Trie

![Trie Visualization](https://raw.githubusercontent.com/username/data-structures/main/docs/screenshots/trie-preview.png)

- **Word Visualization**: See how words are stored in a prefix tree structure
- **Interactive Operations**: Add and search for words in the trie
- **Prefix Highlighting**: Visual indication of common word prefixes

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm, yarn, or pnpm package manager

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
# For npm
docker build -t data-structures .

# For pnpm
docker build -f Dockerfile.pnpm -t data-structures .

# For bun
docker build -f Dockerfile.bun -t data-structures .

# Run the container
docker run -p 3000:3000 data-structures
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Manual Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`:

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Project Structure

```
data-structures/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── binary-tree/     # BST-specific components
│   │   └── trie/            # Trie-specific components
│   ├── context/             # React context providers
│   ├── routes/              # Application routes
│   └── structures/          # Data structure implementations
│       ├── binary-tree/     # BST implementation
│       └── trie/            # Trie implementation
├── public/                  # Static assets
└── [configuration files]
```

## Technologies Used

- **React**: Frontend UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first styling
- **React Router**: Navigation and routing
- **Vite**: Build tooling and development server

## Future Development

From our design document, we're planning to enhance the application with:

- **Additional Data Structures**: Linked Lists, Stacks, Queues, Graphs, and Hash Tables
- **Enhanced Educational Content**: More in-depth explanations, complexity analyses, and real-world use cases
- **Improved Mobile Responsiveness**: Better support for learning on smaller devices
- **Algorithm Comparison**: Side-by-side comparison of different algorithms on the same data structure
- **Custom Input Data**: Allow users to input their own data for visualization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
