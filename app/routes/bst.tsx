

import { useCallback, useEffect, useRef, useState } from "react";
import BinaryTreeViewer from "~/components/binary-tree-viewer";
import { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import { TreeNode } from "~/structures/binary-tree/TreeNode";

export const BST_ROUTE = 'binary-search-tree';

export default function BST() {
  const initialTreeData = [20, 18, 21, 9, 15, 5, 6, 3, 4, 2, 1, 19, 22];
  const [tree] = useState<BinaryTree<number>>(new BinaryTree<number>());
  const [orderedNodes, setOrderedNodes] = useState<Array<TreeNode<number>>>([]);
  const addNodeInputRef = useRef<HTMLInputElement>(null);

  const handleAddNode = useCallback(() => {
    const inputRef = addNodeInputRef.current
    if (!inputRef) {
      return
    }
    const newNodeValue = Number.parseInt(inputRef.value);
    tree.add(newNodeValue);
    tree.calculateNodeX();
    setOrderedNodes([...tree.inOrder()])
  }, [orderedNodes])

  const handleClearTree = useCallback(() => {
    tree.root = null;
    setOrderedNodes([...tree.inOrder()])
  }, []);

  useEffect(() => {
    tree.addMultiple(initialTreeData).calculateNodeX();
    setOrderedNodes([...tree.inOrder()])
  }, []);

  return (
    <div className="flex items-center justify-center dark:bg-neutral-400 border-0 rounded-2xl p-3">
      <BinaryTreeViewer<number> tree={orderedNodes} />
      <div className="h-[600px] border-l-2 p-2 pl-4">
        <div>
          <label className="block" htmlFor="nodeValue">Add Node</label>
          <div className="p-1 text-2xl w-[400px] max-w-[100%] relative">
            <input className="bg-white text-black border-2 rounded-bl-4xl rounded-tl-4xl p-1 pl-5 w-[90%]" type="number" id="nodeValue" defaultValue={25} ref={addNodeInputRef} />
            <button className="bg-blue-400 border-2 border-black rounded-br-4xl rounded-tr-4xl aspect-square h-[84%] w-[10%] absolute top-[8%] right-[5px]" type="button" id="addNode" onClick={handleAddNode} >+</button>
          </div>
        </div>
        <button className="block w-[100%] p-4 text-center bg-blue-400 rounded-4xl mt-3 mb-3" type="button" id="removeNode">Remove Node (Coming Soon)</button>
        <button className="block w-[100%] p-4 text-center bg-blue-400 rounded-4xl" type="button" id="clearTree" onClick={handleClearTree}>Clear Tree</button>
      </div>
    </div>
  );
}
