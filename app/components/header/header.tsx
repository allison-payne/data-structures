import { Link } from 'react-router';
import { BST_ROUTE } from '~/routes/binary-tree';
import { HOME_ROUTE } from '~/routes/home';
import { TRIE_ROUTE } from '~/routes/trie';
import logoDark from './logo_dark.svg';
import logoLight from './logo_light.svg';

export const Header = () => {
  return (
    <header className="flex flex-col w-full border-b-2 dark:border-gray-200 p-4">
      <div className="w-[500px] max-w-[100vw]">
        <Link to={HOME_ROUTE}>
          <img
            src={logoLight}
            alt="Data Structures Logo"
            className="inline-block w-[100px] dark:hidden"
          />
          <img
            src={logoDark}
            alt="Data Structures Logo"
            className="hidden w-[100px] dark:inline-block"
          />
          <h1 className="inline-block text-3xl">Data Structures 101</h1>
        </Link>
      </div>
      <div>
        <nav className="text-center" style={{ fontSize: '1.25rem' }}>
          <ul className="inline list-none" role="list">
            <li className="inline border-r-2 pl-2 pr-2">
              <Link to={BST_ROUTE}>Binary Search Tree</Link>
            </li>

            <li className="inline pl-2 pr-2">
              <Link to={TRIE_ROUTE}>Trie</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
