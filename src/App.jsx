
import './App.css'
import About from './Components/About/About'
import Alumni from './Components/Alumni/Alumni'
import Kursus from './Components/DaftarKursus/Kursus'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'

function App() {

  return (
    <>
    <h1>Welcome to Kursus Online Hi-Five</h1>
      <Header/>
      <img src="https://picsum.photos/200/300" alt="gambar" />
        <About />
        <h1>Pilihan Kursus Kami :</h1>
        <Kursus namaKursus={"Kursus Makeup Professional"} harga={"1.500.000,-"} target={"3 Bulan"}/>
        <Kursus namaKursus={"Kursus Pemrograman Web/Mobile"} harga={"2.000.000,-"} target={"6 Bulan"}/>
        <Kursus namaKursus={"Kursus Bahasa Asing (Jepang/Inggris)"} harga={"1.000.000,-"} target={"1 Tahun"}/>
      
      <h1>Daftar Alumni Lulusan Terbaik :</h1>
      <Alumni nama="Cantika Alisya Putri" jurusan={"Makeup Professional"} perusahaan={"L'Oréal"}/>
      <Alumni nama="Ucup Sarucup" jurusan={"Pemrograman Web/Mobile"} perusahaan={"WEBARQ"}/>
      <Alumni nama="Xavier Putra Tesla" jurusan={"Kursus Bahasa Asing(Jepang/Inggris)"} perusahaan={"English Academy (Ruangguru)"}/>
     <Footer />
    </>
  )
}

export default App
