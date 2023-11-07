import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthPage({ mode }) {
  return <AuthForm mode={mode} />;
}

export default AuthPage;
