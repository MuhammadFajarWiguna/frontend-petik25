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
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello world</h1>} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard/>} />

          {/* pesanan */}
          <Route path="/dashboard/pesanan" element={<h1>pesanan</h1>} />

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
          <Route path="/dashboard/pelanggan" element={<h1>pelanggan</h1>} />

          {/* kartu */}
          <Route path="/dashboard/kartu" element={<h1>kartu</h1>} />

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
