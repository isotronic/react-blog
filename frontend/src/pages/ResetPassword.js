import ResetPasswordForm from "../components/ResetPasswordForm";
import HeaderSEO from "../components/HeaderSEO";

function ResetPasswordPage() {
  return (
    <>
      <HeaderSEO title="Reset Password" description="Change your password." />
      <h1>Reset your password</h1>
      <p className="centered">Change your password here.</p>
      <ResetPasswordForm />
    </>
  );
}

export default ResetPasswordPage;
