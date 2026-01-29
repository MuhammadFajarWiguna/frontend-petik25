import React from "react";
import Navbar from "../MyNavbar/MyNavbar";
import { useNavigate, NavLink } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h3>404 Halaman tidak ditemukan!</h3>
      <p>Oopps... Halaman yang kamu cari tidak ada</p>
      <NavLink to={"/"}>Home</NavLink>
      <button onClick={() => navigate(-1)}>Kembali</button>
    </div>
  );
};

export default ErrorPage;
