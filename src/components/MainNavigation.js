import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
          <LinkContainer to="/posts/new">
            <Nav.Link>New Post</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
