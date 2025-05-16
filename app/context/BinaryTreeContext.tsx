import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AlgorithmType, AnimationSpeed } from '~/utils/visualization/types';
import { BinaryTree } from '~/structures/binary-tree/BinaryTree';
import { BalancedBinaryTree } from '~/structures/binary-tree/BalancedBinaryTree';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';
import { animationSpeeds, calculateAnimationDuration } from '~/utils/visualization';

/**
 * Props for the BinaryTreeProvider component
 * @template T The type of data stored in the binary tree
 */
interface BinaryTreeProviderProps<T> {
  /** React children components */
  children: ReactNode;

  /** Initial data to populate the binary tree */
  initialData: Array<T>;
}

/**
 * Represents a single step in an algorithm animation
 * Contains all the information needed to visualize one step of an algorithm
 * @template T The type of data stored in the binary tree
 */
interface AlgorithmStep<T> {
  /** Description of what happens in this step */
  description: string;

  /** IDs of nodes involved in this step */
  nodeIds: Array<number>;

  /** Optional array of node IDs that should be highlighted */
  highlightedNodes?: Array<number>;

  /** Optional array of edges that should be highlighted */
  highlightedEdges?: { source: number; target: number }[];
}

/**
 * Context interface providing binary tree state and operations
 * Provides access to the tree data structure and methods for manipulating it
 * @template T The type of data stored in the binary tree
 */
interface BinaryTreeContext<T> {
  tree: BinaryTree<T> | null;
  orderedTreeNodes: Array<TreeNode<T>> | null;
  selectedNode?: TreeNode<T>;
  isBalanced: boolean;
  min: TreeNode<T> | null;
  max: TreeNode<T> | null;
  addNode: (newNodeValue: T) => void;
  removeSelectedNode: () => void;
  clearTree: () => void;
  selectNode: (node: TreeNode<T>) => void;
  balanceTree: () => void;

  // Algorithm animation properties
  currentAlgorithm: AlgorithmType;
  isAnimationPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  animationSpeed: AnimationSpeed;
  algorithmSteps: AlgorithmStep<T>[];
  highlightedNodes: Array<T>;
  currentStepDescription: string;

  // Algorithm animation methods
  startAnimation: () => void;
  pauseAnimation: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setAnimationSpeed: (speed: AnimationSpeed) => void;

  // Step control properties
  canStepForward: boolean;
  canStepBackward: boolean;
}

let Context: any = null;

/**
 * Provider component that wraps the application to provide binary tree context
 * @template T The type of data stored in the binary tree
 * @param {object} props Component props
 * @param {ReactNode} props.children Child components to render within the provider
 * @param {Array<T>} props.initialData Initial data to populate the binary tree
 * @returns {React.Element} The provider component
 */
export function BinaryTreeProvider<T>({ children, initialData }: BinaryTreeProviderProps<T>) {
  const defaultContext: BinaryTreeContext<T> = {
    tree: null,
    orderedTreeNodes: null,
    isBalanced: false,
    min: null,
    max: null,
    addNode: () => {},
    removeSelectedNode: () => {},
    clearTree: () => {},
    selectNode: () => {},
    balanceTree: () => {},

    // Algorithm animation properties
    currentAlgorithm: 'none',
    isAnimationPlaying: false,
    currentStep: 0,
    totalSteps: 0,
    animationSpeed: 'medium',
    algorithmSteps: [],
    highlightedNodes: [],
    currentStepDescription: '',

    // Algorithm animation methods
    startAnimation: () => {},
    pauseAnimation: () => {},
    stepForward: () => {},
    stepBackward: () => {},
    setAlgorithm: () => {},
    setAnimationSpeed: () => {},

    // Step control properties
    canStepForward: false,
    canStepBackward: false,
  };

  Context = createContext<BinaryTreeContext<T>>(defaultContext);

  const [tree] = useState<BinaryTree<T>>(new BinaryTree<T>());
  const [orderedNodes, setOrderedNodes] = useState<Array<TreeNode<T>>>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode<T> | undefined>();
  const [isBalanced, setIsBalanced] = useState<boolean>(false);
  const [min, setMin] = useState<TreeNode<T> | null>(null);
  const [max, setMax] = useState<TreeNode<T> | null>(null);

  const addNode = useCallback(
    (newNodeValue: T) => {
      tree.add(newNodeValue);
      tree.calculateNodeY();
      tree.calculateNodeX();
      setMin(tree.findMin());
      setMax(tree.findMax());
      setIsBalanced(tree.isBalanced());
      setOrderedNodes([...tree.inOrder()]);
    },
    [tree]
  );

  const removeSelectedNode = useCallback(() => {
    if (selectedNode) {
      tree.remove(selectedNode.data);
      tree.calculateNodeY();
      tree.calculateNodeX();
      setSelectedNode(undefined);
      setOrderedNodes([...tree.inOrder()]);
    }
  }, [selectedNode, tree]);

  const clearTree = useCallback(() => {
    tree.root = null;
    setMin(null);
    setMax(null);
    setIsBalanced(tree.isBalanced());
    setOrderedNodes([...tree.inOrder()]);
  }, [tree]);

  // Initialize tree with initial data when component mounts or when initialData changes
  useEffect(() => {
    // First clear any existing data
    tree.root = null;

    // Add all initial data values
    initialData.forEach(value => {
      tree.add(value);
    });

    // Calculate positions for visualization
    tree.calculateNodeY();
    tree.calculateNodeX();

    // Update state
    setMin(tree.findMin());
    setMax(tree.findMax());
    setIsBalanced(tree.isBalanced());
    setOrderedNodes([...tree.inOrder()]);

    // Reset any algorithm visualization
    setCurrentAlgorithm('none');
    setIsAnimationPlaying(false);
    setCurrentStep(0);
    setTotalSteps(0);
    setAlgorithmSteps([]);
    setHighlightedNodes([] as Array<T>);
    setCurrentStepDescription('');

    // Clear animation timer if it exists
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, [initialData, tree]);

  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType>('none');
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('medium');
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep<T>[]>([]);
  const [highlightedNodes, setHighlightedNodes] = useState<Array<T>>([]);
  const [currentStepDescription, setCurrentStepDescription] = useState<string>('');

  // Timer reference for animation playback
  const animationTimerRef = useRef<number | null>(null);

  // Generate algorithm steps based on the selected algorithm
  const generateAlgorithmSteps = useCallback(
    (algorithm: AlgorithmType): AlgorithmStep<T>[] => {
      const steps: AlgorithmStep<T>[] = [];

      switch (algorithm) {
        case 'inOrderTraversal': {
          if (!tree.root) return [];

          const nodes = tree.inOrder();
          steps.push({
            description: 'Starting in-order traversal (Left → Root → Right)',
            nodeIds: [],
            highlightedNodes: [],
          });

          nodes.forEach((node, index) => {
            const nodeValue = Number(node.data);
            steps.push({
              description: `Visiting node ${nodeValue}`,
              nodeIds: nodes.slice(0, index + 1).map(n => Number(n.data)),
              highlightedNodes: [nodeValue],
            });
          });

          steps.push({
            description: 'In-order traversal complete',
            nodeIds: nodes.map(n => Number(n.data)),
            highlightedNodes: [],
          });

          break;
        }

        case 'preOrderTraversal': {
          if (!tree.root) return [];

          // Get nodes in pre-order
          const traversal: TreeNode<T>[] = [];
          const preOrderTraverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            traversal.push(node);
            preOrderTraverse(node.left);
            preOrderTraverse(node.right);
          };

          preOrderTraverse(tree.root);

          steps.push({
            description: 'Starting pre-order traversal (Root → Left → Right)',
            nodeIds: [],
            highlightedNodes: [],
          });

          traversal.forEach((node, index) => {
            const nodeValue = Number(node.data);
            steps.push({
              description: `Visiting node ${nodeValue}`,
              nodeIds: traversal.slice(0, index + 1).map(n => Number(n.data)),
              highlightedNodes: [nodeValue],
            });
          });

          steps.push({
            description: 'Pre-order traversal complete',
            nodeIds: traversal.map(n => Number(n.data)),
            highlightedNodes: [],
          });

          break;
        }

        case 'postOrderTraversal': {
          if (!tree.root) return [];

          // Get nodes in post-order
          const traversal: TreeNode<T>[] = [];
          const postOrderTraverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            postOrderTraverse(node.left);
            postOrderTraverse(node.right);
            traversal.push(node);
          };

          postOrderTraverse(tree.root);

          steps.push({
            description: 'Starting post-order traversal (Left → Right → Root)',
            nodeIds: [],
            highlightedNodes: [],
          });

          traversal.forEach((node, index) => {
            const nodeValue = Number(node.data);
            steps.push({
              description: `Visiting node ${nodeValue}`,
              nodeIds: traversal.slice(0, index + 1).map(n => Number(n.data)),
              highlightedNodes: [nodeValue],
            });
          });

          steps.push({
            description: 'Post-order traversal complete',
            nodeIds: traversal.map(n => Number(n.data)),
            highlightedNodes: [],
          });

          break;
        }

        case 'levelOrderTraversal': {
          if (!tree.root) return [];

          // Get nodes in level-order
          const nodes: TreeNode<T>[] = [];
          const queue: TreeNode<T>[] = [tree.root];

          while (queue.length > 0) {
            const node = queue.shift()!;
            nodes.push(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
          }

          steps.push({
            description: 'Starting level-order traversal (Breadth-First)',
            nodeIds: [],
            highlightedNodes: [],
          });

          nodes.forEach((node, index) => {
            const nodeValue = Number(node.data);
            steps.push({
              description: `Visiting node ${nodeValue}`,
              nodeIds: nodes.slice(0, index + 1).map(n => Number(n.data)),
              highlightedNodes: [nodeValue],
            });
          });

          steps.push({
            description: 'Level-order traversal complete',
            nodeIds: nodes.map(n => Number(n.data)),
            highlightedNodes: [],
          });

          break;
        }

        case 'balancing': {
          if (!tree.root) return [];

          // Create a balanced binary tree for visualization
          const balancedBinaryTree = new BalancedBinaryTree<T>();

          // Copy the current tree structure to the balancedBinaryTree
          const nodes = tree.inOrder();
          nodes.forEach(node => balancedBinaryTree.add(node.data));

          steps.push({
            description: 'Starting tree balancing operation...',
            nodeIds: [],
            highlightedNodes: [],
          });

          // If tree is already balanced, just show that
          if (tree.isBalanced()) {
            steps.push({
              description: 'Tree is already balanced. No changes needed.',
              nodeIds: [],
              highlightedNodes: [],
            });
            break;
          }

          // Show the nodes in sorted order (in-order traversal)
          steps.push({
            description: 'Converting tree to sorted array via in-order traversal',
            nodeIds: nodes.map(node => Number(node.data)),
            highlightedNodes: nodes.map(node => Number(node.data)),
          });

          // Create steps for building the balanced tree
          const sortedArray = nodes.map(node => node.data);

          // Create visualization steps for the binary search tree balancing algorithm
          // We'll use a recursive approach to build a balanced BST from the sorted array

          // Helper function to generate steps for the divide and conquer algorithm
          const buildBalancedTreeSteps = (
            arr: T[],
            start: number,
            end: number,
            nodeIdsAdded: number[] = []
          ) => {
            if (start > end) return;

            // Find the middle element
            const mid = Math.floor((start + end) / 2);
            const value = arr[mid];
            const nodeValue = Number(value);

            // Add this node to our tracking array
            nodeIdsAdded.push(nodeValue);

            // Create a step showing this node being added
            steps.push({
              description: `Adding node ${nodeValue} to the balanced tree`,
              nodeIds: [...nodeIdsAdded],
              highlightedNodes: [nodeValue],
            });

            // Recursively build left subtree
            buildBalancedTreeSteps(arr, start, mid - 1, [...nodeIdsAdded]);

            // Recursively build right subtree
            buildBalancedTreeSteps(arr, mid + 1, end, [...nodeIdsAdded]);
          };

          // Start the balancing visualization
          buildBalancedTreeSteps(sortedArray as T[], 0, sortedArray.length - 1);

          // Final step
          steps.push({
            description: 'Tree balancing complete!',
            nodeIds: nodes.map(node => Number(node.data)),
            highlightedNodes: [],
          });
          break;
        }

        case 'insertion': {
          if (!tree.root) return [];

          steps.push({
            description: 'Node insertion visualization',
            nodeIds: [],
            highlightedNodes: [],
          });

          // Create steps to demonstrate how node insertion works
          // For demo purposes, we'll insert a random value between the min and max nodes
          const min = Number(tree.findMin().data);
          const max = Number(tree.findMax().data);
          const valueToInsert = Math.floor(Math.random() * (max - min) + min);

          // First step: Show starting tree
          steps.push({
            description: `Starting node insertion: Value to insert = ${valueToInsert}`,
            nodeIds: [],
            highlightedNodes: [],
          });

          // Create a path simulation to show how insertion traverses the tree
          let current: TreeNode<T> | null = tree.root;
          const pathNodes: number[] = [];

          while (current) {
            const currentValue = Number(current.data);
            pathNodes.push(currentValue);

            steps.push({
              description: `Comparing ${valueToInsert} with ${currentValue}`,
              nodeIds: [],
              highlightedNodes: [currentValue],
            });

            if (valueToInsert < currentValue) {
              steps.push({
                description: `${valueToInsert} < ${currentValue}, go to left subtree`,
                nodeIds: [],
                highlightedNodes: [currentValue],
              });

              if (!current.left) {
                steps.push({
                  description: `Found insertion point: left child of ${currentValue}`,
                  nodeIds: [],
                  highlightedNodes: [currentValue],
                });
                break;
              }
              current = current.left;
            } else {
              steps.push({
                description: `${valueToInsert} > ${currentValue}, go to right subtree`,
                nodeIds: [],
                highlightedNodes: [currentValue],
              });

              if (!current.right) {
                steps.push({
                  description: `Found insertion point: right child of ${currentValue}`,
                  nodeIds: [],
                  highlightedNodes: [currentValue],
                });
                break;
              }
              current = current.right;
            }
          }

          // Final step: node inserted
          steps.push({
            description: `Node ${valueToInsert} inserted successfully`,
            nodeIds: [...pathNodes, valueToInsert],
            highlightedNodes: [valueToInsert],
          });
          break;
        }

        case 'deletion': {
          if (!tree.root) return [];

          steps.push({
            description: 'Node deletion visualization',
            nodeIds: [],
            highlightedNodes: [],
          });

          // If no node is selected, we can't demonstrate deletion
          if (!selectedNode) {
            steps.push({
              description: 'Please select a node to see deletion visualization',
              nodeIds: [],
              highlightedNodes: [],
            });
            break;
          }

          const nodeToDelete = Number(selectedNode.data);

          // Step 1: Show the node to be deleted
          steps.push({
            description: `Deleting node ${nodeToDelete}`,
            nodeIds: [],
            highlightedNodes: [nodeToDelete],
          });

          // Step 2: Determine the case (leaf, one child, two children)
          if (!selectedNode.left && !selectedNode.right) {
            // Case 1: Leaf node (no children)
            steps.push({
              description: `Node ${nodeToDelete} is a leaf node (no children)`,
              nodeIds: [],
              highlightedNodes: [nodeToDelete],
            });

            steps.push({
              description: `Simply remove node ${nodeToDelete} from the tree`,
              nodeIds: [],
              highlightedNodes: [],
            });
          } else if (!selectedNode.left) {
            // Case 2a: Only has right child
            const rightChild = Number(selectedNode.right!.data);
            steps.push({
              description: `Node ${nodeToDelete} has only a right child (${rightChild})`,
              nodeIds: [],
              highlightedNodes: [nodeToDelete, rightChild],
            });

            steps.push({
              description: `Replace node ${nodeToDelete} with its right child ${rightChild}`,
              nodeIds: [],
              highlightedNodes: [rightChild],
            });
          } else if (!selectedNode.right) {
            // Case 2b: Only has left child
            const leftChild = Number(selectedNode.left!.data);
            steps.push({
              description: `Node ${nodeToDelete} has only a left child (${leftChild})`,
              nodeIds: [],
              highlightedNodes: [nodeToDelete, leftChild],
            });

            steps.push({
              description: `Replace node ${nodeToDelete} with its left child ${leftChild}`,
              nodeIds: [],
              highlightedNodes: [leftChild],
            });
          } else {
            // Case 3: Has both children - find successor
            steps.push({
              description: `Node ${nodeToDelete} has both left and right children`,
              nodeIds: [],
              highlightedNodes: [nodeToDelete],
            });

            // Find the smallest node in the right subtree (successor)
            let successor = selectedNode.right;
            while (successor.left) {
              successor = successor.left;
            }

            const successorValue = Number(successor.data);

            steps.push({
              description: `Find successor: smallest node in right subtree = ${successorValue}`,
              nodeIds: [],
              highlightedNodes: [successorValue],
            });

            steps.push({
              description: `Replace value ${nodeToDelete} with successor ${successorValue}`,
              nodeIds: [],
              highlightedNodes: [successorValue],
            });

            steps.push({
              description: `Delete the duplicate successor node ${successorValue} from the right subtree`,
              nodeIds: [],
              highlightedNodes: [],
            });
          }

          // Final step
          steps.push({
            description: `Node ${nodeToDelete} deleted successfully`,
            nodeIds: [],
            highlightedNodes: [],
          });

          break;
        }

        default:
          break;
      }

      return steps;
    },
    [tree, selectedNode]
  );

  // Update the current step state with the highlighted nodes and description
  const updateCurrentStepState = useCallback(
    (step: number) => {
      if (step >= 0 && step < algorithmSteps.length) {
        const currentStepData = algorithmSteps[step];
        setCurrentStepDescription(currentStepData.description);
        setHighlightedNodes(
          (currentStepData.highlightedNodes as unknown as Array<T>) || ([] as Array<T>)
        );
      }
    },
    [algorithmSteps]
  );

  const setAlgorithm = useCallback(
    (algorithm: AlgorithmType) => {
      // Clear any existing animation
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }

      setCurrentAlgorithm(algorithm);
      setIsAnimationPlaying(false);
      setCurrentStep(0);

      if (algorithm === 'none') {
        setAlgorithmSteps([]);
        setTotalSteps(0);
        setHighlightedNodes([] as Array<T>);
        setCurrentStepDescription('');
        return;
      }

      const steps = generateAlgorithmSteps(algorithm);
      setAlgorithmSteps(steps);
      setTotalSteps(steps.length);

      if (steps.length > 0) {
        setCurrentStepDescription(steps[0].description);
        setHighlightedNodes((steps[0].highlightedNodes as Array<T>) || ([] as Array<T>));
      }
    },
    [generateAlgorithmSteps, animationTimerRef]
  );

  const startAnimation = useCallback(() => {
    if (currentStep >= totalSteps - 1 || totalSteps === 0) return;

    setIsAnimationPlaying(true);

    // Clear any existing timer
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
    }

    // Calculate appropriate animation duration based on the complexity
    // Use node count and selected animation speed
    const nodeCount = orderedNodes.length;
    const intervalTime = calculateAnimationDuration(nodeCount, animationSpeed);

    // Set up a timer to advance the animation
    animationTimerRef.current = window.setInterval(() => {
      setCurrentStep(prevStep => {
        const nextStep = prevStep + 1;

        if (nextStep >= totalSteps) {
          // End of animation, stop the timer
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current);
            animationTimerRef.current = null;
          }
          setIsAnimationPlaying(false);
          return totalSteps - 1;
        }

        updateCurrentStepState(nextStep);
        return nextStep;
      });
    }, intervalTime / 2) as number; // Half interval for smoother appearance
  }, [currentStep, totalSteps, animationSpeed, updateCurrentStepState, orderedNodes.length]);

  const pauseAnimation = useCallback(() => {
    setIsAnimationPlaying(false);

    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, []);

  const stepForward = useCallback(() => {
    if (currentStep >= totalSteps - 1) return;

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    updateCurrentStepState(nextStep);
  }, [currentStep, totalSteps, updateCurrentStepState]);

  const stepBackward = useCallback(() => {
    if (currentStep <= 0) return;

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    updateCurrentStepState(prevStep);
  }, [currentStep, updateCurrentStepState]);

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  // Implement the selectNode function
  const selectNode = useCallback((node: TreeNode<T>) => {
    setSelectedNode(node);
  }, []);

  // Implement the balanceTree function
  const balanceTree = useCallback(() => {
    if (!tree.root) return;

    // If the tree is already balanced, nothing to do
    if (tree.isBalanced()) return;

    // Create a new balanced tree using the sorted nodes
    const sortedNodes = tree.inOrder();
    const sortedValues = sortedNodes.map(node => node.data);

    // Clear the current tree
    tree.root = null;

    // Helper function to build a balanced BST from sorted array
    const buildBalancedBST = (arr: T[], start: number, end: number): void => {
      if (start > end) return;

      // Get the middle element and use it as root
      const mid = Math.floor((start + end) / 2);

      // Add the middle element to the tree
      tree.add(arr[mid]);

      // Process left half
      buildBalancedBST(arr, start, mid - 1);

      // Process right half
      buildBalancedBST(arr, mid + 1, end);
    };

    // Build the balanced tree
    buildBalancedBST(sortedValues as T[], 0, sortedValues.length - 1);

    // Update the tree layout
    tree.calculateNodeY();
    tree.calculateNodeX();

    // Reset selected node to avoid referencing a node that no longer exists
    setSelectedNode(undefined);

    // Update state
    setMin(tree.findMin());
    setMax(tree.findMax());
    setIsBalanced(tree.isBalanced());

    // Create a fresh copy of the ordered nodes to ensure React detects the change
    const freshOrderedNodes = [...tree.inOrder()];
    setOrderedNodes(freshOrderedNodes);

    // If we're visualizing the balancing algorithm, prepare the steps
    if (currentAlgorithm === 'balancing') {
      const balancingSteps = generateAlgorithmSteps('balancing');
      setAlgorithmSteps(balancingSteps);
      setCurrentStep(0);
      setTotalSteps(balancingSteps.length);
    }
  }, [tree, currentAlgorithm, setAlgorithmSteps, generateAlgorithmSteps]);

  const TreeContext = Context as React.Context<BinaryTreeContext<T>>;
  const contextValue: BinaryTreeContext<T> = {
    tree,
    orderedTreeNodes: orderedNodes,
    selectedNode,
    isBalanced,
    min,
    max,
    addNode,
    clearTree,
    removeSelectedNode,
    selectNode,
    balanceTree,

    // Algorithm animation properties
    currentAlgorithm,
    isAnimationPlaying,
    currentStep,
    totalSteps,
    animationSpeed,
    algorithmSteps,
    highlightedNodes: highlightedNodes as Array<T>,
    currentStepDescription,

    // Algorithm animation methods
    startAnimation,
    pauseAnimation,
    stepForward,
    stepBackward,
    setAlgorithm,
    setAnimationSpeed,
    // Add these properties to check if step forward/backward is possible
    canStepForward: currentStep < totalSteps - 1,
    canStepBackward: currentStep > 0,
  };

  return <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>;
}

/**
 * Custom hook to access the binary tree context
 * @template T The type of data stored in the binary tree
 * @returns {BinaryTreeContext<T>} The binary tree context
 * @throws {Error} If used outside of a BinaryTreeProvider
 */
export function useBinaryTreeContext<T>() {
  const context = useContext(Context as React.Context<BinaryTreeContext<T>>);
  if (!context) {
    throw new Error('useBinaryTreeContext must be used within a BinaryTreeProvider');
  }
  return context;
}
