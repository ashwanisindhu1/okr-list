export const filterTree = function (data, category) {
  if (category === 'All') {
    return data;
  }
  let nodes = [];
  for (let i = 0; i < data.length; i++) {
    const { children, ...restOfData } = data[i];
    if (restOfData.category === category) {
      nodes.push(data[i]);
    } else if (Array.isArray(children)) {
      const childNodes = filterTree(children, category);
      if (childNodes.length) {
        nodes.push({ ...data[i], children: childNodes });
      }
    }
  }
  return nodes;
};

export const transformData = function (data) {
  const okrList = data.data;
  const result = [];

  // set top level okrs
  okrList.forEach((item) => {
    if (item.parent_objective_id === '') {
      result.push({ ...item, children: [] });
    }
  });
  const rootNode = {
    id: -1,
    children: result
  };
  okrList.forEach((item) => {
    if (item.parent_objective_id !== '') {
      _insertNode(rootNode, { ...item, children: [] });
      item.counted = true;
    }
  });

  return result;
};

const _insertNode = function (root, item) {
  // BFS of n-ary tree
  const q = [];
  q.push(root);
  while (q.length > 0) {
    const len = q.length;
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      if (node.id === item.parent_objective_id) {
        node.children.push(item);
        return;
      }
      for (let j = 0; j < node.children.length; j++) {
        q.push(node.children[j]);
      }
    }
  }
  return -1;
};
