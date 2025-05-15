import React from 'react';
import { Route, Routes } from 'react-router';
import './app.css';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout';
import BST, { BST_ROUTE } from './routes/binary-tree';
import Home from './routes/home';
import Trie, { TRIE_ROUTE } from './routes/trie';
import './theme/theme.css';
/**
 * Main application component that sets up the routing structure
 * @returns {React.Element} The rendered application with all routes
 */
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={BST_ROUTE} element={<BST />} />
          <Route path={TRIE_ROUTE} element={<Trie />} />{' '}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
