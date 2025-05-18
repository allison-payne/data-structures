import React, { useCallback } from 'react';
import type { AnimationControlsProps, AnimationSpeed } from '~/utils/visualization/types';

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
    <div className="flex flex-col space-y-3">
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        Animation Controls
      </div>
      <div className="flex space-x-2 items-center">
        <button
          onClick={onStepBackward}
          disabled={!canStepBackward}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded-lg w-12 h-10 flex items-center justify-center disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Step backward"
          title="Step backward"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
        {isPlaying ? (
          <button
            onClick={onPause}
            className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white p-2 rounded-lg w-12 h-10 flex items-center justify-center transition-colors"
            aria-label="Pause"
            title="Pause"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-2 rounded-lg w-12 h-10 flex items-center justify-center transition-colors"
            aria-label="Play"
            title="Play"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
        <button
          onClick={onStepForward}
          disabled={!canStepForward}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded-lg w-12 h-10 flex items-center justify-center disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          aria-label="Step forward"
          title="Step forward"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="ml-2">
          <select
            value={currentSpeed}
            onChange={handleSpeedChange}
            className="p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            aria-label="Animation speed"
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
