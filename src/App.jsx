import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import DetailBlog from "./pages/DetailBlog/DetailBlog.jsx";
import About from "./pages/About/About.jsx";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import ErrorPage from "./component/ErrorPage/ErrorPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./component/Footer/Footer.jsx";
import News from "./pages/News/News.jsx";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Blogs />} />
        <Route path="/posts/:id" element={<DetailBlog />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:portal/:index" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
