import { Navigate } from "react-router-dom";
import Login from "../../features/Auth/Login";

export const LoginRoute = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Login />;
  }

  if (user.role === "siswa")
    return <Navigate to="/student/home" replace />;

  if (user.role === "guru")
    return <Navigate to="/teacher/home" replace />;

  if (user.role === "admin")
    return <Navigate to="/admin/home" replace />;

  return <Login />;
};