/**
 * Function adalah blok kode yang dapat digunakan kembali
 * untuk melakukan tugas tertentu
 * 1. Function declaration
 * 2. Function expression
 * 3. Arrow function
 */

// 1. function declaration 
function sapa(nama) {
    console.log(`halo ${nama}`);
}
sapa("ucup")

// 2. function expression
const salam = function(nama) {
    console.log(`Assalamualaikum ${nama}`);
}
salam("Bambang")

const ucap = (nama) => {
console.log(`SELAMAT DATANG, ${nama}`);
}
ucap("ucup")
