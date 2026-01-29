import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./MyNavbar.css"
import {Container, Nav, Navbar} from 'react-bootstrap'

const MyNavbar = ()=> {
return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className="text-right">
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>PeTIK blog</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
            <NavLink to={"/"}>Home</NavLink>
            </Nav.Link>

            <Nav.Link>
            <NavLink to={"/posts"}>Posts</NavLink>
            </Nav.Link>
            
            <Nav.Link>
            <NavLink to={"about"}>About PeTIK</NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
)
}

export default MyNavbar;