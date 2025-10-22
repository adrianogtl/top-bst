class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(arr) {
    // Remove duplicates and sort the array
    const fixedArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(fixedArr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1));

    return node;
  }

  insert(value) {
    const insertNode = (node, value) => {
      // Base case
      if (!node) return new Node(value);

      if (value === node.data) return node;

      // Search for node
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else {
        node.right = insertNode(node.right, value);
      }

      // Node found
      return node;
    };

    insertNode(this.root, value);
  }

  deleteItem(value) {
    const deleteNode = (node, value) => {
      // Base case
      if (!node) return null;

      // Search for node
      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Node found
        // No children (leaf node)
        if (!node.left && !node.right) return null;

        // One child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Two children
        // Select the immediately greater node
        let successor = node.right;

        // Select the smallest child of that node
        while (successor.left) {
          successor = successor.left;
        }

        // Replace with the smallest node's value
        node.data = successor.data;

        // Delete that smallest node
        node.right = deleteNode(node.right, successor.data);
      }

      return node;
    };
    deleteNode(this.root, value);
  }

  find(value) {
    const findNode = (node, value) => {
      if (value === node.data || node.data === null) return node;

      if (value < node.data) {
        return findNode(node.left, value);
      } else {
        return findNode(node.right, value);
      }
    };

    return findNode(this.root, value);
  }

  levelOrderForEach(callback) {
    this.#isCallbackFunction(callback);

    let queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    this.#isCallbackFunction(callback);
    if (node === null) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    this.#isCallbackFunction(callback);
    if (node === null) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    this.#isCallbackFunction(callback);
    if (node === null) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  #isCallbackFunction(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback funciton is required");
    }

    return;
  }
}
