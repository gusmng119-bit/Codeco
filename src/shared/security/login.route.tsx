import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "../../features/Login/Login";
import useAuthStore, { ROLE_REDIRECT } from "../../store/authStore";
import appConfig from "../../config/appConfig";

export function LoginRoute() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
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

  const isAuthenticated = Boolean(token) || appConfig.BYPASS_LOGIN;

  if (isAuthenticated) {
    // Redirect ke halaman yang sesuai role
    const role = user?.role ?? appConfig.BYPASS_LOGIN_ROLE;
    const redirectTo = ROLE_REDIRECT[role] ?? "/student";
    return <Navigate to={redirectTo} replace />;
  }

  return <Login />;
}
