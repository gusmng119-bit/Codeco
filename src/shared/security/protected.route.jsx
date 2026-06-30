import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, role }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  // belum login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // cek role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};