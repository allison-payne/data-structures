

import { useEffect, useState } from "react";
import BinaryTreeViewer from "~/components/binary-tree";
import { BinaryTree } from "~/structures/binary-tree/BinaryTree";
import type { Route } from "./+types/bst";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Data Structures | Binary Search Tree" },
    { name: "description", content: "Binary Search Tree Class" },
  ];
}

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
    </>
  );
}
