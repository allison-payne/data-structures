import React, { useCallback } from 'react';
import type { AnimationControlsProps, AnimationSpeed } from '../types';

/**
 * Component for controlling algorithm animation playback
 * Provides play/pause buttons, step navigation, and speed controls
 * @param {object} props Component properties
 * @param {Function} props.onPlay Callback when animation is played
 * @param {Function} props.onPause Callback when animation is paused
 * @param {Function} props.onStepForward Callback to step forward in animation
 * @param {Function} props.onStepBackward Callback to step backward in animation
 * @param {Function} props.onSpeedChange Callback when animation speed changes
 * @param {boolean} props.isPlaying Whether the animation is currently playing
 * @param {AnimationSpeed} props.currentSpeed Current animation speed setting
 * @param {boolean} props.canStepForward Whether stepping forward is allowed
 * @param {boolean} props.canStepBackward Whether stepping backward is allowed
 * @returns {React.Element} The animation controls UI
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
