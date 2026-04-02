import MyNavbar from "../../components/Navbar/MyNavbar.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <MyNavbar search={search} setSearch={setSearch} />

        <div className="content">
          <Outlet context={{ search }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;