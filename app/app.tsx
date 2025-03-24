import { Route, Routes } from "react-router";
import Layout from "./layout";
import BST from "./routes/bst";
import Home from "./routes/home";

import './app.css';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="binary-search-tree" element={<BST />} />
            </Route>
        </Routes>
    );
}

export default App;