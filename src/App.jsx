import "./App.css";
import About from "./Components/About/About";
import Alumni from "./Components/Alumni/Alumni";
import Kursus from "./Components/DaftarKursus/Kursus";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import posts from "./posts.json";

import gambar1 from "./assets/1.jpg";
import gambar2 from "./assets/2.jpg";
import gambar3 from "./assets/3.jpg";
import gambar4 from "./assets/4.png";
import gambar6 from "./assets/6.png";
import gambar7 from "./assets/7.jpg";
import { useState } from "react";

const gambarMap = {
  "1.jpg": gambar1,
  "2.jpg": gambar2,
  "3.jpg": gambar3,
  "4.png": gambar4,
  "6.png": gambar6,
  "7.jpg": gambar7
};

function App() {

  const [search, setSearch] = useState("");
  const dataKursus = posts.filter((item) => item.judul && item.judul.toLowerCase().includes(search.toLowerCase()));
  const dataAlumni = posts.filter((item) => item.nama_alumni && item.nama_alumni.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
     
      <Header />
      <About />
    <div className="container">

    <h1>Pilihan Kursus Kami :</h1>
      
    <input type="text" placeholder="Cari Kursus dan Alumni..." value={search} onChange={(e) => setSearch(e.target.value)} 
      style={{
      padding: "8px",
      marginBottom:"20px",
      width: "300px",
    
    }}
    />
    </div>

      <div className="card-container">
        {dataKursus.map((item) => (
          <Kursus
            key={item.id}
            gambar={gambarMap[item.gambar]}
            judul={item.judul}
            deskripsi={item.deskripsi}
            harga={item.harga}
            target={item.target}
          />
        ))}
      </div>

      <h1>Daftar Alumni Lulusan Terbaik :</h1>
      <div className="alumni-container">
        {dataAlumni.map((item) => (
          <Alumni
            key={item.id}
            foto={gambarMap[item.gambar]}
            nama={item.nama_alumni}
            jurusan={item.jurusan}
            perusahaan={item.bekerja}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default App;
