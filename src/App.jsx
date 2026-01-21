import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
