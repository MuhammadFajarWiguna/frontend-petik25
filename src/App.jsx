import { Routes, Route } from "react-router-dom";

import MyNavbar from "./components/MyNavbar/MyNavbar.jsx";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Kursus from "./components/DaftarKursus/Kursus.jsx";


function App() {
  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/kursus" element={<Kursus/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
