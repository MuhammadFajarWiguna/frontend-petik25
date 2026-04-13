import { useNavigate, NavLink } from "react-router-dom";
import "./MyNavbar.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDashboard } from "../../context/DashboardContext";

const MyNavbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const {search, setSearch} = useDashboard();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserLogin = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      setUsername(decoded.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">P</div>

        <span className="brand">Petik Niaga</span>

        <div className="nav-links">
          <NavLink to="/">Beranda</NavLink>

          <NavLink to="/produk">Produk</NavLink>

          <NavLink to="/about">Tentang</NavLink>
        </div>
      </div>

      <div className="nav-search">
        <FaSearch className="search-icon" />

        <input type="text" placeholder="Cari produk..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="nav-right">
        <div className="cart">
          <FaShoppingCart />

          <span className="cart-badge">{cartCount}</span>
        </div>

        <div className="user">
          <FaUserCircle />
          <span>{username}</span>
        </div>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyNavbar;
