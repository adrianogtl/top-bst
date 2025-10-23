import Tree from "./classes.js";
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
tree.insert(33);
tree.insert(34);
tree.insert(39);
tree.deleteItem(4);
prettyPrint(tree.root);
console.log(tree.find(67));

// Tree traversal methods
const callback = (node) => console.log(node.data);
console.log("Breadth-first\nLevel Order:");
tree.levelOrderForEach(callback);
console.log("Depth-first\nIn Order:");
tree.inOrderForEach(callback);
console.log("Pre Order:");
tree.preOrderForEach(callback);
console.log("Post Order:");
tree.postOrderForEach(callback);
console.log("Height of root(8): ", tree.height(8));
console.log("Depth of leaf (1): ", tree.depth(1));
console.log("Is tree Balenced? ", tree.isBalenced());
tree.rebalance();
console.log("Tree rebalanced:");
prettyPrint(tree.root);
