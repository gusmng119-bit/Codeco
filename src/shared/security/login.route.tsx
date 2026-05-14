import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "../../features/Login/Login";

export function LoginRoute() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null
  );

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("jwtToken"));

    window.addEventListener("storage", syncToken);
    window.addEventListener("jwt-token-change", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("jwt-token-change", syncToken);
    };
  }, []);

  return token ? <Navigate to="/dashboard" replace /> : <Login />;
}
