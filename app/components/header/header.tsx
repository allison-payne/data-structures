import { Link } from 'react-router';
import { BST_ROUTE } from '~/routes/binary-tree';
import { HOME_ROUTE } from '~/routes/home';
import { TRIE_ROUTE } from '~/routes/trie';
import ThemeToggle from '~/components/theme-toggle';
import logoDark from './logo_dark.svg';
import logoLight from './logo_light.svg';

export const Header = () => {
  return (
    <header className="flex flex-col w-full border-b-2 dark:border-b-gray-700 p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between w-full max-w-[100vw]">
        <Link to={HOME_ROUTE} className="flex items-center">
          <img
            src={logoLight}
            alt="Data Structures Logo"
            className="inline-block w-[80px] dark:hidden"
          />
          <img
            src={logoDark}
            alt="Data Structures Logo"
            className="hidden w-[80px] dark:inline-block"
          />
          <h1 className="inline-block text-3xl ml-2 font-semibold">Data Structures 101</h1>
        </Link>
        <ThemeToggle />
      </div>
      <div className="mt-2">
        <nav className="text-center" style={{ fontSize: '1.25rem' }}>
          <ul className="inline-flex list-none" role="list">
            <li className="border-r-2 border-gray-300 dark:border-gray-700 pl-2 pr-4">
              <Link
                to={BST_ROUTE}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Binary Search Tree
              </Link>
            </li>
            <li className="pl-4 pr-2">
              <Link
                to={TRIE_ROUTE}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Trie
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
