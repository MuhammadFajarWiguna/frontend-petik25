import { useState } from "react";
import posts from "../../posts.json";
import gambarMap from "../utils/PictureMap.jsx";

import About from "../../components/About/About.jsx";
import Kursus from "../../components/DaftarKursus/Kursus.jsx";
import Alumni from "../../components/Alumni/Alumni.jsx";

const Home = () => {
  const [search, setSearch] = useState("");

  const dataKursus = posts.filter(
    (item) =>
      item.judul &&
      item.judul.toLowerCase().includes(search.toLowerCase())
  );

  const dataAlumni = posts.filter(
    (item) =>
      item.nama_alumni &&
      item.nama_alumni.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <About />

      <div className="container">
        <h1>Pilihan Kursus Kami</h1>
        <input
          type="text"
          placeholder="Cari Kursus / Alumni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      <h1>Daftar Alumni Lulusan Terbaik</h1>
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
    </>
  );
};

export default Home;
