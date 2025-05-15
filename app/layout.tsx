import { Outlet } from 'react-router';
import Header from './components/header';
import { useTheme } from './context/ThemeContext';

/**
 * Main layout component that wraps all pages
 * Contains the header and main content area
 * @returns {JSX.Element} The application layout
 */
const Layout = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}
    >
      <Header />
      <main className="flex items-center justify-center pt-16 pb-4 px-4">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>
          Data Structures 101 &copy; {new Date().getFullYear()} | Theme: {theme}
        </p>
      </footer>
    </div>
  );
};

export default Layout;
