import "./App.css";
import About from "./Components/About/About";
import Alumni from "./Components/Alumni/Alumni";
import Kursus from "./Components/DaftarKursus/Kursus";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import gambar1 from "./assets/1.jpg";
import gambar2 from "./assets/2.jpg";
import gambar3 from "./assets/3.jpg";
import gambar4 from "./assets/4.png";
import gambar5 from "./assets/5.png";
import gambar6 from "./assets/6.png";

function App() {
  return (
    <>
      <h1>Welcome to Kursus Online Hi-Five</h1>
      <Header />
      <About />
      <h1>Pilihan Kursus Kami :</h1>
      <img src={gambar2} alt="gambar" width={500} height={"auto"} />
      <Kursus namaKursus={"Kursus Makeup Professional"} harga={"1.500.000,-"} target={"3 Bulan"} />
      <hr />
      <br />
      <img src={gambar1} alt="gambar" width={500} height={"auto"} />
      <br />
      <Kursus namaKursus={"Kursus Pemrograman Web/Mobile"} harga={"2.000.000,-"} target={"6 Bulan"} /> <hr />
      <br />
      <img src={gambar3} alt="gambar" width={500} height={"auto"} />
      <Kursus namaKursus={"Kursus Bahasa Asing (Jepang/Inggris)"} harga={"1.000.000,-"} target={"1 Tahun"} /> <hr />
      <h1>Daftar Alumni Lulusan Terbaik :</h1>
      <img src={gambar4} alt="gambar" width={300} height={"auto"} />
      <Alumni nama="Cantika Alisya Putri" jurusan={"Makeup Professional"} perusahaan={"L'Oréal"} /> <br />
      <br />
      <img src={gambar6} alt="gambar" width={200} height={"auto"} />
      <Alumni nama="Bahlil Xavier Tesla" jurusan={"Pemrograman Web/Mobile"} perusahaan={"WEBARQ"} /> <br />
      <br />
      <img src={gambar5} alt="gambar" width={300} height={"auto"} />
      <Alumni nama="Xavier Putra Tesla" jurusan={"Kursus Bahasa Asing(Jepang/Inggris)"} perusahaan={"English Academy (Ruangguru)"} />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default App;
