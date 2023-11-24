import { redirect } from "react-router-dom";

export function logoutAction() {
  sessionStorage.removeItem("token");
  return redirect("/");
}
