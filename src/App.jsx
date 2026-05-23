import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./authProvider";
import { useAuth } from "./authContext";

import Login from "./features/Login/Login";
import StudentDashboard from "./features/Dashboard/Dashboard";

/* ================= TEACHER ================= */
import DashboardGuru from "./guru/DashboardGuru";
import HomeGuru from "./guru/Pages/HomeGuru";
import TeacherProfile from "./guru/ProfileGuru/ProfileGuru";
import Class from "./guru/Class/Class";
import Calendar from "./guru/Kalender/Calendar";
import FeedbackGuru from "./guru/FeedbackGuru/FeedbackGuru";
import Salary from "./guru/Salary/Salary";
import CreateClassGuru from "./guru/CreateClassGuru/CreateClass";

/* ======================================================
   PROTECTED ROUTE (Dengan Fitur Auto-Tracking Debugger)
====================================================== */
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // Membantu melacak di Console F12 jika terjadi mental log-out mendadak
  console.log("=== SECURITY CHECK ===");
  console.log("User State:", user);
  console.log("Required Role:", role);

  // 1. Jika state user hilang / ter-reset jadi null saat pindah halaman
  if (!user) {
    console.warn("Akses Ditolak: Sesi user kosong. Mengalihkan ke Login...");
    return <Navigate to="/" replace />;
  }

  // 2. Jika role string tidak cocok (contoh: "guru" vs "Guru")
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    console.warn(`Akses Ditolak: Role tidak cocok. Butuh: ${role}, User: ${user.role}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ======================================================
   MAIN APPLICATION
====================================================== */
function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="siswa">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TEACHER (NESTED PARENT) ================= */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="guru">
              <DashboardGuru />
            </ProtectedRoute>
          }
        >
          {/* Halaman utama ketika mengakses /teacher */}
          <Route index element={<HomeGuru />} />

          {/* PROFILE */}
          <Route path="profile" element={<TeacherProfile />} />

          {/* CLASSES */}
          <Route path="classes" element={<Class />} />

          {/* CREATE CLASS */}
          <Route path="create-class" element={<CreateClassGuru />} />

          {/* CALENDAR */}
          <Route path="calendar" element={<Calendar />} />

          {/* FEEDBACK */}
          <Route path="feedback" element={<FeedbackGuru />} />

          {/* SALARY */}
          <Route path="salary" element={<Salary />} />
        </Route>

        {/* ================= NOT FOUND FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;