
export class TreeNode<T> {
    data: T;
    coordinates: { x: number, y: number };
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    parent: TreeNode<T> | null;

    constructor(data: T, parent?: TreeNode<T>) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = parent ? parent : null;
        this.coordinates = {
            x: 0,
            y: 0,
        }
    }
}