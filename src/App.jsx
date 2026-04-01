import { Route, Routes } from 'react-router-dom';
import './App.css';
import MyNavbar from './components/Navbar/MyNavbar';
import Sidebar from './components/Sidebar/Sidebar';
import Kategori from './pages/Kategori/Kategori';

function App() {

  return (
    <Routes>
   <Route path='/' element={<h1>HelloWW</h1>}/>
   <Route path='/dashboard' element={<h1>Dashboard</h1>}/>
   
   {/* pesanan */}
   <Route path='/dashboard/pesanan' element={<h1>pesanan</h1>}/>
   
   {/* produk */}
   <Route path='/dashboard/produk' element={<h1>Produk</h1>}/>
   <Route path='/dashboard/produk/add' element={<h1>Tambah Produk</h1>}/>
   <Route path='/dashboard/produk/edit' element={<h1>Edit Produk</h1>}/>
   
   {/* jenis produk */}
   <Route path='/dashboard/kategori' element={<Kategori/>}/>
   
   {/* pelanggan */}
   <Route path='/dashboard/pelanggan' element={<h1>pelanggan</h1>}/>
   
   {/* kartu */}
   <Route path='/dashboard/kartu' element={<h1>kartu</h1>}/>
   
   {/* users */}
   <Route path='/dashboard/users' element={<h1>users</h1>}/>
   
   {/* history */}
   <Route path='/dashboard/history' element={<h1>history</h1>}/>
    </Routes>
  )
}

export default App;
