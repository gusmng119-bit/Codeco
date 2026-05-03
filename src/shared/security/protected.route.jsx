import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  return token ? children : <Navigate to="/" replace />;
}