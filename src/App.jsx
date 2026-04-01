import { Route, Routes } from "react-router-dom";
import "./App.css";
import Kategori from "./pages/Kategori/Kategori";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HelloWW</h1>} />

      {/* PARENT */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* HALAMAN UTAMA DASHBOARD */}
        <Route index element={<h1>Dashboard</h1>} />

        {/* pesanan */}
        <Route path="pesanan" element={<h1>pesanan</h1>} />

        {/* produk */}
        <Route path="produk" element={<h1>Produk</h1>} />
        <Route path="produk/add" element={<h1>Tambah Produk</h1>} />
        <Route path="produk/edit" element={<h1>Edit Produk</h1>} />

        {/* kategori */}
        <Route path="kategori" element={<Kategori />} />

        {/* pelanggan */}
        <Route path="pelanggan" element={<h1>pelanggan</h1>} />

        {/* kartu */}
        <Route path="kartu" element={<h1>kartu</h1>} />

        {/* users */}
        <Route path="users" element={<h1>users</h1>} />

        {/* history */}
        <Route path="history" element={<h1>history</h1>} />

      </Route>
    </Routes>
  );
}

export default App;