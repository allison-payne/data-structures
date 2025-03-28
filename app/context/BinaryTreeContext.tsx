import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { BinaryTree } from '~/structures/binary-tree/BinaryTree';
import type { TreeNode } from '~/structures/binary-tree/TreeNode';

interface BinaryTreeProviderProps<T> {
    children: ReactNode;
    initialData: Array<T>;
}

interface BinaryTreeContext<T> {
    orderedTreeNodes: Array<TreeNode<T>> | null;
    addNode: ((newNodeValue: T) => void);
    clearTree: () => void;
}



let Context: any = null;

export function BinaryTreeProvider<T,>({ children, initialData }: BinaryTreeProviderProps<T>) {

    const defaultContext: BinaryTreeContext<T> = {
        orderedTreeNodes: null,
        addNode: () => { },
        clearTree: () => { }
    };

    Context = createContext<BinaryTreeContext<T>>(defaultContext);

    const [tree] = useState<BinaryTree<T>>(new BinaryTree<T>());
    const [orderedNodes, setOrderedNodes] = useState<Array<TreeNode<T>>>([]);

    const addNode = useCallback((newNodeValue: T) => {
        tree.add(newNodeValue);
        tree.calculateNodeX();
        setOrderedNodes([...tree.inOrder()])
    }, []);

    const clearTree = useCallback(() => {
        tree.root = null;
        setOrderedNodes([...tree.inOrder()])
    }, []);

    useEffect(() => {
        tree.addMultiple(initialData).calculateNodeX();
        setOrderedNodes([...tree.inOrder()])
    }, []);

    return (
        <Context.Provider
            value={{
                orderedTreeNodes: orderedNodes,
                addNode,
                clearTree,
            } as BinaryTreeContext<T>}
        >
            {children}
        </Context.Provider>
    );
};

export function useBinaryTreeContext<T>() {
    const context = useContext(Context as React.Context<BinaryTreeContext<T>>);
    if (!context) {
        throw new Error('useBinaryTreeContext must be used within a BinaryTreeProvider');
    }
    return context;
};