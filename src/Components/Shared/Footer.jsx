import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./general.css"
function Footer() {
  return (
    <>
      <footer className="footer">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="12">
              <p>CopyRights Saved for CompanyName @ 2024</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
