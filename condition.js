// **
// jika nilai > 90 = A
// jika nilai > 70 = B
// jika nilai > 60 = C
// jika nilai < 60 = D

const nilai = 100;
let grade = "D";
if (nilai > 90 && nilai <= 100) {
  grade = "A";
  console.log("A");
} else if (nilai > 70 && nilai <= 90) {
  grade = "B";
  console.log("B");
} else if (nilai >= 60 && nilai <= 70) {
  grade = "C";
  console.log("C");
} else if (nilai < 60 && nilai >= 0) {
  grade = "D";
  console.log("D");
} else {
  console.log("Nilai tidak valid");
}

switch (grade) {
  case "A":
    console.log("Sangat Baik");
    break;

  case "B":
    console.log("Baik");
    break;
  case "C":
    console.log("Cukup");
    break;

  case "D":
    console.log("Kurang Baik");
    break;

  default:
    "Grade tidak valid!";
    break;
}



