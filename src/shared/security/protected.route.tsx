import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import appConfig from "../../config/appConfig";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const isAllowed = Boolean(token) || appConfig.BYPASS_LOGIN;
  return isAllowed ? children : <Navigate to="/" replace />;
}