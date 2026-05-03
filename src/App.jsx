import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Login from "./features/Login/Login";

function ProtectedRoute({ children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  return token ? children : <Navigate to="/" replace />;
}

function DefaultRoute() {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  return token ? <Navigate to="/dashboard" replace /> : <Login />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultRoute />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;