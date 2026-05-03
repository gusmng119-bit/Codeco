import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Login from "./features/Login/Login";
import { LoginRoute } from "./shared/security/login.route";
import { ProtectedRoute } from "./shared/security/protected.route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoute />} />
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