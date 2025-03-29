

import BinaryTreeForm from "~/components/binary-tree/editor-form";
import BinaryTreeSVGViewer from "~/components/binary-tree/svg-viewer";
import { BinaryTreeProvider } from "~/context/BinaryTreeContext";

export const BST_ROUTE = 'binary-search-tree';

export default function BST() {
  const initialTreeData = [20, 18, 21, 9, 15, 5, 6, 3, 4, 2, 1, 19, 22];

  return (
    <BinaryTreeProvider<number> initialData={initialTreeData}>
      <div className="flex items-center justify-center dark:bg-neutral-400 border-0 rounded-2xl p-3">
        <BinaryTreeSVGViewer<number> />
        <BinaryTreeForm<number> />
      </div>
    </BinaryTreeProvider>
  );
}
