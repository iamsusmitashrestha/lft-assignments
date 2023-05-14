const arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  const sortedArray = [...array];

  for (let i = 0; i < sortedArray.length; i++) {
    let min = i;
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (sortedArray[j][key] < sortedArray[min][key]) {
        min = j;
      }
    }
    const temp = sortedArray[i];
    sortedArray[i] = sortedArray[min];
    sortedArray[min] = temp;
  }
  return sortedArray;
}

const sortedByName = sortBy(arr, "name");
const sortedById = sortBy(arr, "id");

console.log(sortedByName);
console.log(sortedById);
