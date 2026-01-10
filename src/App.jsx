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
import gambar7 from "./assets/7.jpg";
import gambar6 from "./assets/6.png";

function App() {
  return (
    <>
      <Header />
      <About />
      <h1>Pilihan Kursus Kami :</h1>
      <div className="card-container">
        <Kursus gambar={gambar2} namaKursus="Kursus Makeup Professional" harga="1.500.000,-" target="3 Bulan" />

        <Kursus gambar={gambar1} namaKursus="Kursus Pemrograman Web/Mobile" harga="2.000.000,-" target="6 Bulan" />

        <Kursus gambar={gambar3} namaKursus="Kursus Bahasa Asing (Jepang / Inggris)" harga="1.000.000,-" target="1 Tahun" />
      </div>
      <h1>Daftar Alumni Lulusan Terbaik :</h1>

      <div className="alumni-container">
        <Alumni foto={gambar4} nama="Cantika Alisya Putri" jurusan="Makeup Professional" perusahaan="L'Oréal" />

        <Alumni foto={gambar6} nama="Bahlil Xavier Tesla" jurusan="Pemrograman Web/Mobile" perusahaan="WEBARQ" />

        <Alumni foto={gambar7} nama="Vierra Cynthia" jurusan="Bahasa Asing (Jepang / Inggris)" perusahaan="English Academy (Ruangguru)" />
      </div>

      <Footer />
    </>
  );
}

export default App;
