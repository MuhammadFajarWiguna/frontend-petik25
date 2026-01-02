import { Component } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Customer from "./components/Customers/Customer";



function App() {
  const a = 10;
  const b = 15;
  console.log(a + b);

  
  return (
    <>
     <Header/>
      <h1>To do-list</h1>
      <ol>
        <li>Mengerjakan tugas frontend</li>
        <li>Mempelajari tutorial React JS</li>
        <li>Murajaah secara konsisten</li>
      </ol>
     <Profile nama="Fajar" alamat={"Medan"} umur={20}/>
      <img src="https://picsum.photos/200/300" alt="gambar" />
      <Footer nama="Bambang" />
    </>
  );
}

    // <>
    //   <h1>Our Customers</h1>
    //   <Customer nama ="ucup" alamat={"Depok"} membership={"Premium"} />
    //   <Customer nama ="Joko" alamat={"Jakarta"} membership={"Gold"} />
    //   <Customer nama ="" alamat={"Bandung"} membership={"Platinum"} />
    // </>


export default App;
