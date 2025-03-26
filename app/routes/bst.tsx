

import { useCallback, useEffect, useRef, useState } from "react";
import BinaryTreeViewer from "~/components/binary-tree-viewer";
import { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import { TreeNode } from "~/structures/binary-tree/TreeNode";

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
          <div className="p-1 font-bold text-2xl align-middle">
            <input type="number" id="nodeValue" className="bg-white text-black" defaultValue={25} ref={addNodeInputRef} />
            <button type="button" id="addNode" onClick={handleAddNode} className="bg-blue-400 pl-1 pr-1 ">+</button>
          </div>
        </div>
        <button type="button" className="block" id="removeNode">Remove Node (Coming Soon)</button>
        <button type="button" className="block" id="clearTree">Clear Tree (Coming Soon)</button>
      </div>
    </div>
  );
}
