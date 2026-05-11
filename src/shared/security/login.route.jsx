import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "../../features/Login/Login";

const readLoggedIn = () => {
  return typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true";
};

export function LoginRoute() {
  const [token, setToken] = useState(readLoggedIn);

  useEffect(() => {
    const syncToken = () => {
      setToken(readLoggedIn());
    };

    // Works for multi-tab (storage event)
    window.addEventListener("storage", syncToken);

    // Guarantee redirect even if same-tab localStorage is updated
    // (without relying on a custom event that is never dispatched).
    const intervalId = window.setInterval(syncToken, 250);
    syncToken();

    return () => {
      window.removeEventListener("storage", syncToken);
      window.clearInterval(intervalId);
    };
  }, []);

  return token ? <Navigate to="/dashboard" replace /> : <Login />;
}

