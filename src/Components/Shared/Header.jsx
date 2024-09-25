import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
function Header() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mainContent">
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Header;
