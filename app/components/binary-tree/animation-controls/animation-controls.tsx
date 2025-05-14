import { useCallback, useState } from 'react';
import type { AnimationControlsProps, AnimationSpeed } from '../types';

/**
 *
 * @param root0
 * @param root0.onPlay
 * @param root0.onPause
 * @param root0.onStepForward
 * @param root0.onStepBackward
 * @param root0.onSpeedChange
 * @param root0.isPlaying
 * @param root0.currentSpeed
 * @param root0.canStepForward
 * @param root0.canStepBackward
 */
export function AnimationControls({
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  isPlaying,
  currentSpeed,
  canStepForward,
  canStepBackward,
}: AnimationControlsProps) {
  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSpeedChange(e.target.value as AnimationSpeed);
    },
    [onSpeedChange]
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm font-semibold mb-1">Animation Controls</div>
      <div className="flex space-x-2 items-center">
        <button
          onClick={onStepBackward}
          disabled={!canStepBackward}
          className="bg-blue-400 p-2 rounded w-10 h-10 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="Step backward"
          title="Step backward"
        >
          ⏪
        </button>
        {isPlaying ? (
          <button
            onClick={onPause}
            className="bg-blue-400 p-2 rounded w-10 h-10 flex items-center justify-center"
            aria-label="Pause"
            title="Pause"
          >
            ⏸️
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="bg-blue-400 p-2 rounded w-10 h-10 flex items-center justify-center"
            aria-label="Play"
            title="Play"
          >
            ▶️
          </button>
        )}
        <button
          onClick={onStepForward}
          disabled={!canStepForward}
          className="bg-blue-400 p-2 rounded w-10 h-10 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="Step forward"
          title="Step forward"
        >
          ⏩
        </button>
        <div className="ml-2">
          <select
            value={currentSpeed}
            onChange={handleSpeedChange}
            className="p-1 rounded border-2 border-gray-300 bg-white text-black"
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
