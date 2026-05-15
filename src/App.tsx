import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Home from "./features/Home/Home";
import Classroom from "./features/Classroom/Classroom";
import Teacher from "./features/Teacher/Teacher";
import Certificate from "./features/Certificate/Certificate";
import Profile from "./features/Profile/Profile";
import ClassMaterial from "./features/Material/Material";
import FeedbackClass from "./features/Feedback/Feedback";
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
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="classroom" element={<ProtectedRoute><Classroom /></ProtectedRoute>} />
        <Route path="teacher" element={<ProtectedRoute><Teacher /></ProtectedRoute>} />
        <Route path="certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="material" element={<ProtectedRoute><ClassMaterial /></ProtectedRoute>} />
        <Route path="feedback" element={<ProtectedRoute><FeedbackClass /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;