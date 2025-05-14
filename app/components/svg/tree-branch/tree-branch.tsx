export type TreeBranchProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

export const TreeBranch = (treeBranchProps: TreeBranchProps) => {
  return <line stroke="white" {...treeBranchProps} />;
};
