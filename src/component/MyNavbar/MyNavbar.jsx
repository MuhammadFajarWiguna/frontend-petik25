import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./MyNavbar.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" className="py-3">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-light fw-bold text-decoration-none">
            PeTIK Blog
          </Link>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <NavLink to="/" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            Home
          </NavLink>

          <NavLink to="/posts" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            Posts
          </NavLink>

          <NavLink to="/news" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            News
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `nav-item mx-2 text-light text-decoration-none ${isActive ? "active fw-bold" : ""}`}>
            About PeTIK
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
