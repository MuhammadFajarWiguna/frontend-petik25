import { NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const role = decoded.role;
    console.log(role);

    const menuAdmin = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/dashboard/pesanan", label: "Pesanan" },
        { to: "/dashboard/produk", label: "Produk" },
        { to: "/dashboard/kategori", label: "Kategori" },
        { to: "/dashboard/pelanggan", label: "Pelanggan" },
        { to: "/dashboard/kartu", label: "Kartu" },
        { to: "/dashboard/users", label: "Users" },
        { to: "/dashboard/history", label: "History" },
    ];

    const menuPelanggan = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/dashboard/pesanan", label: "Pesanan" },
        { to: "/dashboard/history", label: "Histori" },
    ];

    const menuList = role === " pelanggan" ? menuPelanggan : menuAdmin;

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h3>PeTIK Niaga</h3>
            </div>
            <ul>
                {menuList.map((menu) => (
                    <li key={menu.to}>
                        <NavLink 
                        to={menu.to} 
                        className={({ isActive }) => (isActive ? "active" : "menu active")}
                        end={menu.to}
                        >
                        {menu.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;