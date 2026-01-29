import React from "react";
import Article from "../../component/Article/Article";
import MyNavbar from "../../component/MyNavbar/MyNavbar.jsx"
import Footer from "../../component/Footer/Footer.jsx";

const Blogs = () => {
  return (
    <div>
      <MyNavbar />
      <h1>Daftar Artikel</h1>
      <Article />
    <Footer/>

    </div>
  );
};
export default Blogs;
