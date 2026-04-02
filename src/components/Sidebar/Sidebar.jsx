import { NavLink } from "react-router-dom";
import profile from "../../assets/petik.jpeg";
import "./Sidebar.css";

const Sidebar = () => {
  const linkClass = ({ isActive }) => (isActive ? "menu-link active" : "menu-link");

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="profil">
          <img src={profile} alt="profile" className="profil-img" />
        </div>
        <h3 className="teks">PeTIK Niaga</h3>
      </div>
      <hr className="hr"/>

      <ul>
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pesanan" className={linkClass}>
            Pesanan
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/produk" className={linkClass}>
            Produk
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/kategori" className={linkClass}>
            Kategori
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/pelanggan" className={linkClass}>
            Pelanggan
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/kartu" className={linkClass}>
            Kartu
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/users" className={linkClass}>
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
