import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form, useRouteLoaderData } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";

function MainNavigation() {
  const token = useRouteLoaderData("root");

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
          {token && (
            <>
              <LinkContainer to="/posts/new">
                <Nav.Link>New Post</Nav.Link>
              </LinkContainer>
              <Form action="/logout" method="post">
                <Nav.Link as="button">Logout</Nav.Link>
              </Form>
            </>
          )}
          {!token && (
            <>
              <LinkContainer to="/auth/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/auth/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
