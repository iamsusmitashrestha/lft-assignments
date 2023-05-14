var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

function searchByName(fruits, fruitName) {
  return fruits.filter((el) =>
    el.name.toUpperCase().includes(fruitName.toUpperCase())
  );
}

function searchByKey(fruits, key, fruitName) {
  return fruits.filter((el) =>
    el[key]
      .toString()
      .toUpperCase()
      .includes(fruitName.toString().toUpperCase())
  );
}

console.log(searchByName(fruits, "app"));
console.log(searchByKey(fruits, "id", 1));
