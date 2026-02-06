import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./MyNavbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar bg="warning" data-bs-theme="dark" className="py-3">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-light fw-bold text-decoration-none">
           Kursus Hifive
          </Link>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <NavLink to="/" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            About
          </NavLink>

          <NavLink to="/courses" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
           lokasi Cabang Courses
          </NavLink>

          
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
