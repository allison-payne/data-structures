export const SPACE_BETWEEN_CHILDREN = 0.1;

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
            y: parent ? parent.coordinates.y + SPACE_BETWEEN_CHILDREN : 0
        }
    }
}