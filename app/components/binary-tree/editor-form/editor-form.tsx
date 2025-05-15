import React, { useCallback, useRef } from 'react';
import { useBinaryTreeContext } from '~/context/BinaryTreeContext';
import AnimationControls from '../animation-controls';
import AlgorithmSelector from '../algorithm-selector';
import AlgorithmStatus from '../algorithm-status';
import AlgorithmExplanation from '../algorithm-explanation';
import type { AlgorithmType, AnimationSpeed } from '../types';

/**
 * Form component for interacting with the binary tree visualization
 * Provides controls for adding/removing nodes, choosing algorithms, and controlling animations
 * @template T The type of data stored in the binary tree
 * @returns {React.Element} The rendered binary tree control form
 */
export function BinaryTreeForm<T>() {
  const addNodeInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedNode,
    isBalanced,
    min,
    max,
    addNode,
    removeSelectedNode,
    clearTree,
    balanceTree,
    // Algorithm animation properties
    currentAlgorithm,
    isAnimationPlaying,
    currentStep,
    totalSteps,
    animationSpeed,
    currentStepDescription,
    // Algorithm animation methods
    startAnimation,
    pauseAnimation,
    stepForward,
    stepBackward,
    setAlgorithm,
    setAnimationSpeed,
    canStepForward,
    canStepBackward,
  } = useBinaryTreeContext<T>();

  const handleAddNode = useCallback(() => {
    const inputRef = addNodeInputRef.current;
    if (!inputRef) {
      return;
    }
    const newNodeValue = Number.parseInt(inputRef.value);
    addNode(newNodeValue as T);
  }, [addNode]);

  const handleRemoveClick = useCallback(() => {
    removeSelectedNode();
  }, [removeSelectedNode]);

  const handleClearTree = useCallback(() => {
    clearTree();
  }, [clearTree]);

  const handleSelectAlgorithm = useCallback(
    (algorithm: AlgorithmType) => {
      setAlgorithm(algorithm);
    },
    [setAlgorithm]
  );

  const handleSpeedChange = useCallback(
    (speed: AnimationSpeed) => {
      setAnimationSpeed(speed);
    },
    [setAnimationSpeed]
  );

  return (
    <div className="min-h-[600px] border-l-2 p-2 pl-4">
      <div>
        <label className="block" htmlFor="nodeValue">
          Add Node
        </label>
        <div className="p-1 text-2xl w-full max-w-[400px] relative">
          <input
            className="bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-l-lg p-2 pl-4 w-[85%]"
            type="number"
            id="nodeValue"
            defaultValue={25}
            ref={addNodeInputRef}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-0 dark:border-gray-600 rounded-r-lg h-[42px] w-[15%] absolute top-[1px] right-0 transition-colors"
            type="button"
            id="addNode"
            onClick={handleAddNode}
            aria-label="Add node"
          >
            +
          </button>
        </div>
      </div>
      <div className="grid gap-2 mt-4">
        <button
          className="w-full p-3 text-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          id="removeNode"
          onClick={handleRemoveClick}
          disabled={!selectedNode}
        >
          Remove Selected Node
        </button>
        <button
          className="w-full p-3 text-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          type="button"
          id="clearTree"
          onClick={handleClearTree}
        >
          Clear Tree
        </button>
        <button
          className="w-full p-3 text-center bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          type="button"
          id="balanceTree"
          onClick={() => {
            // Start the balancing visualization first, then balance the tree
            setAlgorithm('balancing');
            // Small delay to ensure state updates in the correct order
            setTimeout(() => {
              balanceTree();
            }, 10);
          }}
        >
          Balance Tree
        </button>
      </div>

      {/* Tree Statistics */}
      <div
        id="stats"
        className="mt-6 mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h3 className="text-sm font-bold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
            <path d="M10 6a1 1 0 011 1v3a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414-1.414L9 9.586V7a1 1 0 011-1z" />
          </svg>
          Tree Statistics
        </h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Balance Status
            </span>
            <span
              className={`text-sm font-medium ${isBalanced ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {isBalanced ? 'Balanced ✓' : 'Unbalanced ✗'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Minimum Value
            </span>
            <span className="text-sm font-medium">
              {min?.data !== undefined ? (min?.data as number) : 'N/A'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Maximum Value
            </span>
            <span className="text-sm font-medium">
              {max?.data !== undefined ? (max?.data as number) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Algorithm Visualization Controls */}
      <div className="mt-4 border-t-2 pt-4">
        <h3 className="text-lg font-bold mb-3">Algorithm Visualization</h3>

        <AlgorithmSelector
          onSelectAlgorithm={handleSelectAlgorithm}
          currentAlgorithm={currentAlgorithm}
        />

        <AnimationControls
          onPlay={startAnimation}
          onPause={pauseAnimation}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onSpeedChange={handleSpeedChange}
          isPlaying={isAnimationPlaying}
          currentSpeed={animationSpeed}
          canStepForward={canStepForward}
          canStepBackward={canStepBackward}
        />

        <AlgorithmStatus
          algorithm={currentAlgorithm}
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepDescription={currentStepDescription}
        />

        <AlgorithmExplanation algorithm={currentAlgorithm} />
      </div>
    </div>
  );
}
