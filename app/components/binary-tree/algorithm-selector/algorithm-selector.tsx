import { useCallback } from 'react';
import type { AlgorithmType } from '../types';

export type AlgorithmSelectorProps = {
  onSelectAlgorithm: (algorithm: AlgorithmType) => void;
  currentAlgorithm: AlgorithmType;
};

/**
 *
 * @param root0
 * @param root0.onSelectAlgorithm
 * @param root0.currentAlgorithm
 */
export function AlgorithmSelector({ onSelectAlgorithm, currentAlgorithm }: AlgorithmSelectorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectAlgorithm(e.target.value as AlgorithmType);
    },
    [onSelectAlgorithm]
  );

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold mb-1">Select Algorithm</div>
      <select
        value={currentAlgorithm}
        onChange={handleChange}
        className="p-2 rounded border-2 border-gray-300 bg-white text-black w-full"
      >
        <option value="none">Select an algorithm...</option>
        <optgroup label="Traversals">
          <option value="inOrderTraversal">In-order Traversal</option>
          <option value="preOrderTraversal">Pre-order Traversal</option>
          <option value="postOrderTraversal">Post-order Traversal</option>
          <option value="levelOrderTraversal">Level-order Traversal</option>
        </optgroup>
        <optgroup label="Operations">
          <option value="insertion">Node Insertion</option>
          <option value="deletion">Node Deletion</option>
        </optgroup>
        <optgroup label="Advanced">
          <option value="balancing">Tree Balancing</option>
        </optgroup>
      </select>
    </div>
  );
}
