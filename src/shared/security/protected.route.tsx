import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/" replace />;
}