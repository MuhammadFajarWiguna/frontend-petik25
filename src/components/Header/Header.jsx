import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <nav className="nav">
      <span className="logo-text">Kursus Hi-Five</span>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>
            Courses
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
