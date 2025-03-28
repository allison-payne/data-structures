import { Route, Routes } from "react-router";
import Layout from "./layout";
import BST, { BST_ROUTE } from "./routes/bst";
import Home from "./routes/home";

import './app.css';
import Trie, { TRIE_ROUTE } from "./routes/trie";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={BST_ROUTE} element={<BST />} />
                <Route path={TRIE_ROUTE} element={<Trie />} />
            </Route>
        </Routes>
    );
}

export default App;