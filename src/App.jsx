import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Navbar />
      <h3>Daftar Pelanggan</h3>
      <Content nama={"Ucup"} membership={"Platinum"} />
      <Content nama={"Bambang"} membership={"Gold"} />
      <Content nama={"Budi"} membership={"Silver"} />
      <h3>yuk berlanggan membership!</h3>
      <div className="card-wrapper">
        <Card 
        title="Free" 
        price={"0-,"} 
        benefit1={"Gratis tanpa biaya langganan"} 
        benefit2={"Bisa melihat katalog & update terbaru"} 
        benefit3={"Akses dasar ke fitur utama"} 
        benefit4={"Dukungan komunitas"} />

        <Card 
        title="Gold" 
        price={"100.000-,"} 
        isPopular={true}
        benefit1={"Prioritas layanan pelanggan"} 
        benefit2={"Akses premium terpilih"} 
        benefit3={"Promo & diskon khusus member"} 
        benefit4={"Dukungan komunitas diutamakan"} />

        <Card 
        title="Platinum" 
        price={"200.000-,"} 
        benefit1={"Akses penuh ke seluruh fitur premium"} 
        benefit2={"Prioritas tertinggi support & layanan"} 
        benefit3={"Penawaran eksklusif & early access"} 
        benefit4={"Promo & diskon khusus member"} />
      </div>
      <Footer />
    </>
  );
}

export default App;
