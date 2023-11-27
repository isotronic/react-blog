import ForgotPasswordForm from "../components/ForgotPasswordForm";
import HeaderSEO from "../components/HeaderSEO";

function ForgotPasswordPage() {
  return (
    <>
      <HeaderSEO title="Forgot Password" description="Request a password reset link." />
      <h1>Forgot your password?</h1>
      {/* <p className="centered">No problem. Just type in your email address below.</p> */}
      <ForgotPasswordForm />
    </>
  );
}

export default ForgotPasswordPage;
