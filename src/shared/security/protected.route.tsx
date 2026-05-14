import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  return token ? children : <Navigate to="/" replace />;
}