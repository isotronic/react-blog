import { redirect } from "react-router-dom";

function getTokenDuration() {
  const storedExpiration = sessionStorage.getItem("expiration");
  const expiration = new Date(storedExpiration);
  const now = new Date();
  const duration = expiration.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = sessionStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    sessionStorage.removeItem("token");
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token || token === "EXPIRED") {
    return redirect("/auth/login");
  }

  return null;
}
