import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Components/MyNavbar/MyNavbar.jsx";
import MyNavbar from "./Components/MyNavbar/MyNavbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Kategori from "./Pages/Kategori/Kategori.jsx";
import DashboardLayout from "./Pages/DashboardLayout/DashboardLayout.jsx";
import AddKategori from "./Pages/Kategori/AddKategori.jsx";
import Produk from "./Pages/Produk/Produk.jsx";
import EditKategori from "./Pages/Kategori/EditKategori.jsx";
import AddProduk from "./Pages/Produk/AddProduk.jsx";
import Pesanan from "./Pages/Pesanan/Pesanan.jsx";
import AddPesanan from "./Pages/Pesanan/AddPesanan.jsx";
import Pelanggan from "./Pages/Pelanggan/Pelanggan.jsx";
import AddPelanggan from "./Pages/Pelanggan/AddPelanggan.jsx";
import Kartu from "./Pages/Kartu/Kartu.jsx";
import AddKartu from "./Pages/Kartu/AddKartu.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello world</h1>} />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route element={<h1>Dashboard</h1>} />

          {/* pesanan */}
          <Route path="/dashboard/pesanan" element={<Pesanan/>} />
          <Route path="/dashboard/pesanan/add" element={<AddPesanan/>} />

          {/* produk */}
          <Route path="/dashboard/produk" element={<Produk />} />
          <Route path="/dashboard/produk/add" element={<AddProduk />} />

          {/* jenis produk */}
          <Route path="/dashboard/kategori" element={<Kategori />} />
          <Route path="/dashboard/kategori/add" element={<AddKategori />} />
          <Route
            path="/dashboard/kategori/edit/:uuid"
            element={<EditKategori />}
          />

          {/* pelanggan */}
          <Route path="/dashboard/pelanggan" element={<Pelanggan/>} />
          <Route path="/dashboard/pelanggan/add" element={<AddPelanggan/>} />

          {/* kartu */}
          <Route path="/dashboard/kartu" element={<Kartu/>} />
          <Route path="/dashboard/kartu/add" element={<AddKartu/>} />

          {/* users */}
          <Route path="/dashboard/users" element={<h1>users</h1>} />

          {/* history */}
          <Route path="/dashboard/history" element={<h1>history</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
