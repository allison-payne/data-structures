import { useCallback, useRef } from "react";
import { useBinaryTreeContext } from "~/context/BinaryTreeContext";

export function BinaryTreeForm<T>() {
  const addNodeInputRef = useRef<HTMLInputElement>(null);
  const { selectedNode, isBalanced, min, max, addNode, removeSelectedNode, clearTree, } = useBinaryTreeContext<T>();

  const handleAddNode = useCallback(() => {
    const inputRef = addNodeInputRef.current
    if (!inputRef) {
      return
    }
    const newNodeValue = Number.parseInt(inputRef.value);
    addNode(newNodeValue as T);
  }, [addNode]);

  const handleRemoveClick = useCallback(() => {
    removeSelectedNode();
  }, [removeSelectedNode]);

  const handleClearTree = useCallback(() => {
    clearTree();
  }, [clearTree]);

  return (
    <div className="h-[600px] border-l-2 p-2 pl-4">
      <div>
        <label className="block" htmlFor="nodeValue">Add Node</label>
        <div className="p-1 text-2xl w-[400px] max-w-[100%] relative">
          <input className="bg-white text-black border-2 rounded-bl-4xl rounded-tl-4xl p-1 pl-5 w-[90%]" type="number" id="nodeValue" defaultValue={25} ref={addNodeInputRef} />
          <button className="bg-blue-400 border-2 border-black rounded-br-4xl rounded-tr-4xl aspect-square h-[84%] w-[10%] absolute top-[8%] right-[5px]" type="button" id="addNode" onClick={handleAddNode} >+</button>
        </div>
      </div>
      <button className="block w-[100%] p-4 text-center bg-blue-400 rounded-4xl mt-3 mb-3 disabled:bg-blue-100" type="button" id="removeNode" onClick={handleRemoveClick} disabled={!selectedNode}>Remove Node</button>
      <button className="block w-[100%] p-4 text-center bg-blue-400 rounded-4xl" type="button" id="clearTree" onClick={handleClearTree}>Clear Tree</button>
      <div className="h-[100%] p-3">
        <div className="pt-2 pb-2">
          <span className="block font-bold">Is it Balanced?</span>
          <span className="block">{isBalanced ? 'Yes' : 'No'}</span>
        </div>
        <div className="pt-2 pb-2">
          <span className="block font-bold">Minimum</span>
          <span className="block">{min?.data as number}</span>
        </div>
        <div className="pt-2 pb-2">
          <span className="block font-bold">Maximum</span>
          <span className="block">{max?.data as number}</span>
        </div>
      </div>
    </div>
  );
}