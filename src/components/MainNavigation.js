import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

function MainNavigation() {
  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Blog</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/posts">
            <Nav.Link>Posts</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {/* <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control type="text" placeholder="Email" className=" mr-sm-2" />
              </Col>
              <Col xs="auto">
                <Form.Control type="password" placeholder="Password" />
              </Col>
              <Col xs="auto">
                <Button type="submit">Login/Register</Button>
              </Col>
            </Row>
          </Form> */}
          <LinkContainer to="/auth/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/auth/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/posts/new">
            <Nav.Link>New Post</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
