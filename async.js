/**
 *Promise terdapat 3 status :  
 *1. Pending
 *2. fullfiled/resolved (terpenuhi)
 *3. Rejected (ditolak) 
 */
function rebusAir() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Rebus air");   
        }, 3000);
    });
}

function masakMie() {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve("Masak mie");
        }, 2000);    
    });
}

function makanMie() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("makan mie")
        }, 4000)
    });
}



// rebusAir()
// .then((outRebus) => {
// console.log(outRebus);
// return masakMie();
// })
// .then((outMasak) => {
//     console.log(outMasak);
//     return makanMie();
// })

// .then((outMakan) => {
//     console.log(outMakan);
// })

// .catch((err) => {
//     console.log(`Gagal ${err}`);
    
// })

async function buatMie() {
    try {
        const outRebus = await rebusAir();
        console.log(outRebus);
        
        const outMasak = await masakMie();
        console.log(outMasak);
        
        const outMakan = await makanMie();
        console.log(outMakan);
    } catch (error) {
        console.log(`gagal ${error}`);
    }
}

buatMie()


                                                                                                                                                                                                      