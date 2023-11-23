import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form, useRouteLoaderData, NavLink } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Blog
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/posts">
            Posts
          </Nav.Link>
        </Nav>
        <Nav>
          {token && (
            <>
              <Nav.Link as={NavLink} to="/admin">
                Admin
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/new">
                New Post
              </Nav.Link>
              <Form action="/logout" method="post">
                <Nav.Link as="button">Logout</Nav.Link>
              </Form>
            </>
          )}
          {!token && (
            <>
              <Nav.Link as={NavLink} to="/auth/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/auth/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
