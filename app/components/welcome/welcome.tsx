import React from 'react';
import { Link } from 'react-router';
import { BST_ROUTE } from '~/routes/binary-tree';
import { TRIE_ROUTE } from '~/routes/trie';

/**
 * Welcome component that displays introductory information about the application
 * @returns {React.JSX.Element} JSX element containing the welcome message
 */
export function Welcome() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 min-h-0">
      <div className="max-w-[1200px] w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500 dark:bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
            Data Structures 101
          </h1>

          <p className="leading-7 text-gray-700 dark:text-gray-300 text-center">
            Welcome to our interactive data structures website! Whether you&apos;re a student
            learning the fundamentals or a seasoned developer looking to refresh your knowledge,
            this platform offers a dynamic and engaging way to explore various data structures used
            in software development.
          </p>

          <p className="leading-7 text-gray-700 dark:text-gray-300">
            Here, you&apos;ll find clear explanations and, more importantly, interactive examples
            that allow you to visualize and manipulate data structures like binary search trees,
            linked lists, stacks, queues, and more. By actively engaging with these examples, you
            can gain a deeper understanding of how these structures work, their underlying
            principles, and their practical applications in computer science.
          </p>

          <div className="pt-4 text-center">
            <p className="font-medium text-blue-600 dark:text-blue-400">
              Start exploring today and take your understanding of data structures to the next
              level!
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to={BST_ROUTE}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 4h6m0 0v6m0-6L10 14m-4 8l-6-6m6 6v-6m0 6h6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Binary Tree</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explore tree traversals, insertion, and balancing
                </p>
              </div>
            </Link>

            <Link
              to={TRIE_ROUTE}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Trie</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn about prefix trees and their applications
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
