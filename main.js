import Tree from "./classes.js";

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

const generateRandomArr = () => {
  const generateRandomNum = () => Math.floor(Math.random() * 100);
  const arr = [];

  while (arr.length < 10) {
    arr.push(generateRandomNum());
  }

  return arr;
};
const randomArr = generateRandomArr();
const tree = new Tree(randomArr);

let traversal = {
  levelOrder: "",
  preOrder: "",
  postOrder: "",
  inOrder: "",
};

prettyPrint(tree.root);
console.log("Is tree balenced? ", tree.isBalenced());
tree.levelOrderForEach((node) => (traversal.levelOrder += node.data + " "));
tree.preOrderForEach((node) => (traversal.preOrder += node.data + " "));
tree.postOrderForEach((node) => (traversal.postOrder += node.data + " "));
tree.inOrderForEach((node) => (traversal.inOrder += node.data + " "));
console.log(traversal);
tree.insert(108);
tree.insert(133);
tree.insert(150);
console.log("Inserted 108, 133 and 150:");
prettyPrint(tree.root);
console.log("Is Tree balenced? ", tree.isBalenced());

console.log("Rebalancing the tree...");
tree.rebalance();
prettyPrint(tree.root);
console.log("Is Tree balenced? ", tree.isBalenced());
traversal = {
  levelOrder: "",
  preOrder: "",
  postOrder: "",
  inOrder: "",
};
tree.levelOrderForEach((node) => (traversal.levelOrder += node.data + " "));
tree.preOrderForEach((node) => (traversal.preOrder += node.data + " "));
tree.postOrderForEach((node) => (traversal.postOrder += node.data + " "));
tree.inOrderForEach((node) => (traversal.inOrder += node.data + " "));
console.log(traversal);
