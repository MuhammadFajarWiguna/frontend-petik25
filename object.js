/**
 * Membuat object bisa dengan :
 * 1. {}
 * 2. new Object() 
 * */ 

const user1 = {
    name: "ucup",
    age: 18,
    address : "Depok",
};
// console.log(user1);



const user2 = new Object();
    user2.name = "aril";
    user2.age = 20;
    user2.address = "Depok";
// console.log(user2);

for(const key in user1) {
    console.log(user1[key]);
}