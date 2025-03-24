

import { useEffect, useState } from "react";
import BinaryTreeViewer from "~/components/binary-tree-viewer";
import { BinaryTree } from "~/structures/binary-tree/BinaryTree";

export default function BST() {
  const initialTreeData = [20, 18, 21, 9, 15, 5, 6, 3, 4, 2, 1, 19, 22];
  const bst = new BinaryTree<number>();
  bst.addMultiple(initialTreeData);
  const [tree] = useState<BinaryTree<number>>(bst);
  //Use to trigger redraw on calculation;
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    tree.calculateNodeX();
    setIsReady(true);
  }, [tree]);

  return (
    <>
      {isReady && <BinaryTreeViewer<number> tree={tree} />}
      <div className="h-[600px]">
        <form>
          <label className="block" htmlFor="addNode">Add Node</label>
          <input type="number" id="addNode" />
          <label className="block" htmlFor="removeNode">Remove Node</label>
          <button className="block" id="clearTree">Clear Tree</button>
        </form>
      </div>
    </>
  );
}
