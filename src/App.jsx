import { Route, Routes } from 'react-router-dom'
import './App.css'
import Kategori from './pages/Kategori/Kategori.jsx'
import DashboardLayout from './pages/DashboardLayout/DashboardLayout.jsx'
import AddKategori from './pages/Kategori/AddKategori.jsx'
import Product from './pages/Produk/Produk.jsx'
import Pesanan from './pages/Pesanan/Pesanan.jsx'
import Pelanggan from './pages/Pelanggan/Pelanggan.jsx'
import Kartu from './pages/Kartu/Kartu.jsx'
import User from './pages/Users/Users.jsx'
import EditKategori from './pages/Kategori/EditKategori.jsx'
import AddProduct from './pages/Produk/AddProduk.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import AddPelanggan from './pages/Pelanggan/AddPelanggan.jsx'
import AddKartu from './pages/Kartu/AddKartu.jsx'
import AddPesanan from './pages/Pesanan/AddPesanan.jsx'
import AddUsers from './pages/Users/AddUsers.jsx'
import EditKartu from './pages/Kartu/EditKartu.jsx'
import EditProduk from './pages/Produk/EditProduk.jsx'
import EditPesanan from './pages/Pesanan/EditPesanan.jsx'
import EditPelanggan from './pages/Pelanggan/EditPelanggan.jsx'
import EditUsers from './pages/Users/EditUsers.jsx'
import Login from './pages/Login/Login.jsx'
import Landing from './pages/Landing/Landing.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Orders from './pages/Orders/Orders.jsx'
import History from './pages/History/History.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Landing />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />


        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />}/>
        
        {/* Pesanan */}
        <Route path="/dashboard/pesanan" element={<Pesanan />}/>
        <Route path="/dashboard/pesanan/add" element={<AddPesanan />}/>
        <Route path="/dashboard/pesanan/edit/:uuid" element={<EditPesanan />}/>

        
        {/* Produk */}
        <Route path="/dashboard/produk" element={<Product />}/>
        <Route path="/dashboard/produk/add" element={<AddProduct />}/>
        <Route path="/dashboard/produk/edit/:uuid" element={<EditProduk />}/>

        
        {/* Jenis Produk / Kategori */}
        <Route path="/dashboard/kategori" element={<Kategori />}/>
        <Route path="/dashboard/kategori/add" element={<AddKategori />}/>
        <Route path="/dashboard/kategori/edit/:uuid" element={<EditKategori />}/>

        {/* Pelanggan */}
        <Route path="/dashboard/pelanggan" element={<Pelanggan />}/>
        <Route path="/dashboard/pelanggan/add" element={<AddPelanggan />}/>
        <Route path="/dashboard/pelanggan/edit/:uuid" element={<EditPelanggan />}/>



        {/* Kartu */}
        <Route path="/dashboard/kartu" element={<Kartu />}/>
        <Route path="/dashboard/kartu/add" element={<AddKartu />}/>
        <Route path="/dashboard/kartu/edit/:uuid" element={<EditKartu />}/>
        
        {/* Users */}
        <Route path="/dashboard/users" element={<User />}/>
        <Route path="/dashboard/users/add" element={<AddUsers />}/>
        <Route path="/dashboard/users/edit/:uuid" element={<EditUsers />}/>

        {/* History */}
        <Route path="/dashboard/history" element={<History/>}/>
        </Route>
        
        
      </Routes>
    </>
  )
}

export default App
