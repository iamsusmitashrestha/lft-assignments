var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  const transformed = [];

  for (let i = 0; i < collection.length; i++) {
    transformed.push(tranFunc(collection[i]));
  }
  return transformed;
}

var output = transform(numbers, function (num) {
  return num * 2;
});

console.log(output);
