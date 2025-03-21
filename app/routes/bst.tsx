

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
  const initialTreeData = [20, 10, 21, 9, 17, 12, 5, 14, 3];
  const bst = new BinaryTree<number>();
  bst.addMultiple(initialTreeData);
  const [tree] = useState<BinaryTree<number>>(bst);

  const treeStartX = 50;
  const treeStartY = 20;

  useEffect(() => {
    tree.calculateNodeX();
    console.log(tree)
  }, [tree]);

  return (
    <>
      <BinaryTreeViewer<number> tree={tree} />
    </>
  );
}
