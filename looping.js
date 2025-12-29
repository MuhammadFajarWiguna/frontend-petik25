/** 
    *-- looping for;
    * - nilai awal
    * - nilai akhir/kondisi akhir
    * - increment/decrement 
*/

// for(let i = 0; i < 10; i++) {
//     console.log(`looping ke - ${i}`);
    
// }

// for(let i = 10; i > 0; i--) {
//     console.log(`looping ke - ${i}`);
// }

// /** 
//     -- Looping while;
//     -- menjalankan kode selama kondisi terpenuhi
//     -- dicek lalu dijalankan
// */
//  let nilai = 0;
//  while (nilai < 5) {
//     console.log(nilai);
//     nilai++;
//  }

 /** 
    -- Looping do while;
    -- menjalankan kode selama kondisi terpenuhi.
    -- dijalankan dulu baru dicek
*/
// let input;
// let password = "admin123";
// do {
//   prompt("Masukkan password")
// } while (input != password) ;

//Operator ternery
// const age = 19;
// const status = age > 21 ? "Dewasa" : "Belum dewasa"
// console.log(status);

for (let i = 1;  i <= 100; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
        console.log("fizzbuzz");
    } 
    else if (i % 3 === 0) {
        console.log("fizz");
    } 
    else if (i % 5 === 0) {
        console.log("buzz");
    } 
    else {
        console.log(i);
    }
};

