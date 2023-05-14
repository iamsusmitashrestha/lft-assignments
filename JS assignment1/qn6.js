var input = {
  1: {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] },
    ],
  },
  5: {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};

function normalize(input) {
  const result = {};

  function traverse(rootNode) {
    const { id, name, children } = rootNode;
    result[id] = { id, name };
    if (children) {
      result[id].children = children.map((child) => child.id);
      children.forEach((child) => traverse(child));
    }
  }

  console.log(Object.values(input));

  Object.values(input).forEach((rootNode) => traverse(rootNode));
  return result;
}

const output = normalize(input);
console.log(output);
