import AuthForm from "../components/AuthForm";
import HeaderSEO from "../components/HeaderSEO";

function AuthPage({ mode }) {
  return (
    <>
      <HeaderSEO
        title={mode.toUpperCase()}
        description="Login or Register to create and edit posts."
      />
      <AuthForm mode={mode} />
    </>
  );
}

export default AuthPage;
