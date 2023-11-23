import { useRouteError } from "react-router";
import MainNavigation from "../components/MainNavigation";
import HeaderSEO from "../components/HeaderSEO";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong.";

  // if (error.status === 500) {
  //   message = error.data.message;
  // }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <HeaderSEO title="Error" description="Error page." />
      <MainNavigation />
      <main>
        <h1>{title}</h1>
        <p style={{ textAlign: "center" }}>{message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
