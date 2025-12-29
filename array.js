/** 
 * Array
 * membuat array bisa dengan:
 * 1. []
 * 2. array()
*/

const fruits = ["apel", "anggur", "jambu", "pir"];
const animals = ["Buaya darat", "fanny darat", "user hanabi", "epic ijo lumut"];

// fruits.push("Mangga") //Nambah dari belakang
// animals.unshift("user haya oren") //Nambah dari depan

// fruits.forEach((fruit) => console.log(fruit));
// animals.forEach((animal) => console.log(animal));

// fruits.shift(); //menghapus dari depan
// animals.pop(); //menghapus dari belakang


// fruits.forEach((fruit) => console.log(fruit));
// animals.forEach((animal) => console.log(animal));


const fruitsUpper = fruits.map ((fruit) => fruit.toUpperCase());
console.log(fruitsUpper);

const longNameFruits = fruits.filter((fruit) => fruit.length > 5);
console.log(longNameFruits);

const combine = [...fruits, ...animals];

const foundItems = combine.find((item) => item.toLowerCase == "apel".toLowerCase()
);
console.log(foundItems);
console.log(combine.includes("fanny darat"));


