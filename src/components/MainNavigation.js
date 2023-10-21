import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function MainNavigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
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
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <LinkContainer to="/posts/new">
              <NavDropdown.Item>New Post</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/posts/1/edit">
              <NavDropdown.Item>Edit Post</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
