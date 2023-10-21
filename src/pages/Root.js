import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}

export default RootLayout;
