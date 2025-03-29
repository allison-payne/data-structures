import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { BinaryTree } from '~/structures/binary-tree/BinaryTree';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';

interface BinaryTreeProviderProps<T> {
    children: ReactNode;
    initialData: Array<T>;
}

interface BinaryTreeContext<T> {
    tree: BinaryTree<T> | null;
    orderedTreeNodes: Array<TreeNode<T>> | null;
    selectedNode?: TreeNode<T>;
    addNode: ((newNodeValue: T) => void);
    removeSelectedNode: (() => void);
    clearTree: () => void;
    selectNode: ((node: TreeNode<T>) => void);
}

let Context: any = null;

export function BinaryTreeProvider<T,>({ children, initialData }: BinaryTreeProviderProps<T>) {

    const defaultContext: BinaryTreeContext<T> = {
        tree: null,
        orderedTreeNodes: null,
        addNode: () => { },
        removeSelectedNode: () => { },
        clearTree: () => { },
        selectNode: () => { },
    };

    Context = createContext<BinaryTreeContext<T>>(defaultContext);

    const [tree] = useState<BinaryTree<T>>(new BinaryTree<T>());
    const [orderedNodes, setOrderedNodes] = useState<Array<TreeNode<T>>>([]);
    const [selectedNode, setSelectedNode] = useState<TreeNode<T> | undefined>();

    const addNode = useCallback((newNodeValue: T) => {
        tree.add(newNodeValue);
        tree.calculateNodeX();
        setOrderedNodes([...tree.inOrder()])
    }, []);

    const removeSelectedNode = useCallback(() => {
        if (selectedNode) {
            tree.remove(selectedNode.data);
            //tree.calculateNodeX();
            setSelectedNode(undefined);
            setOrderedNodes([...tree.inOrder()]);
        }
    }, [selectedNode]);

    const clearTree = useCallback(() => {
        tree.root = null;
        setOrderedNodes([...tree.inOrder()])
    }, []);

    const selectNode = useCallback((node: TreeNode<T>) => {
        const val = selectedNode !== node ? node : undefined
        setSelectedNode(val);
    }, [selectedNode]);

    useEffect(() => {
        tree.addMultiple(initialData).calculateNodeX();
        setOrderedNodes([...tree.inOrder()])
    }, []);

    const TreeContext = Context as React.Context<BinaryTreeContext<T>>;
    const contextValue: BinaryTreeContext<T> = {
        ...defaultContext,
        tree,
        orderedTreeNodes: orderedNodes,
        selectedNode,
        addNode,
        clearTree,
        removeSelectedNode,
        selectNode,
    }

    return (
        <TreeContext.Provider
            value={contextValue}
        >
            {children}
        </TreeContext.Provider>
    );
};

export function useBinaryTreeContext<T>() {
    const context = useContext(Context as React.Context<BinaryTreeContext<T>>);
    if (!context) {
        throw new Error('useBinaryTreeContext must be used within a BinaryTreeProvider');
    }
    return context;
};