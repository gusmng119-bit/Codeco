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
        <Route path="home" element={<Home />} />
        <Route path="classroom" element={<Classroom />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="profile" element={<Profile />} />
        <Route path="material" element={<ClassMaterial />} />
        <Route path="feedback" element={<FeedbackClass />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;