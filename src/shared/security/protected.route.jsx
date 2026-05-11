import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true"
      : false;
  return token ? children : <Navigate to="/" replace />;
}