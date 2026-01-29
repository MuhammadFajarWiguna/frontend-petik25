import React from "react";
import Navbar from "../../component/MyNavbar/MyNavbar";
import Footer from "../../component/Footer/Footer.jsx";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container>

      <Navbar />
      <h1>About PeTIK Blog</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, ab! Fuga minima inventore voluptatem sequi!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, possimus!</p>
     
      </Container>
        <Footer/>
    </div>
  );
};
export default About;
