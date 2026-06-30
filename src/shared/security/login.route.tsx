import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "../../features/Login/Login";
import useAuthStore from "../../store/authStore";
import appConfig from "../../config/appConfig";

export function LoginRoute() {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("jwtToken"));

    window.addEventListener("storage", syncToken);
    window.addEventListener("jwt-token-change", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("jwt-token-change", syncToken);
    };
  }, [setToken]);

  const redirectDashboard = Boolean(token) || appConfig.BYPASS_LOGIN;

  return redirectDashboard ? <Navigate to="/dashboard" replace /> : <Login />;
}
