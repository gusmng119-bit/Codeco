import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import type { UserRole } from "./api/types/auth";

/* ================= LOGIN ================= */
import Login from "./features/Login/Login";

/* ================= STUDENT ================= */
import StudentDashboard from "./features/Dashboard/Dashboard";

/* ================= TEACHER ================= */
import DashboardTeacher from "./features/Teacher/DashboardTeacher";
import HomeTeacher from "./features/Teacher/Home/HomeTeacher";
import ProfileTeacher from "./features/Teacher/Profile/ProfileTeacher";
import ClassTeacher from "./features/Teacher/Class/ClassTeacher";
import CalendarTeacher from "./features/Teacher/Calendar/CalendarTeacher";
import FeedbackTeacher from "./features/Teacher/FeedbackTeacher/FeedbackTeacher";
import SalaryTeacher from "./features/Teacher/Salary/SalaryTeacher";
import CreateClass from "./features/Teacher/CreateClass/CreateClass";

/* ================= ADMIN ================= */
import DashboardAdmin from "./features/Admin/DashboardAdmin";
import HomeAdmin from "./features/Admin/Home/HomeAdmin";
import ClassesAdmin from "./features/Admin/Classes/ClassesAdmin";
import TeacherAdmin from "./features/Admin/Teacher/TeacherAdmin";
import StudentAdmin from "./features/Admin/Student/StudentAdmin";
import CalendarAdmin from "./features/Admin/Calendar/CalendarAdmin";
import SalaryAdmin from "./features/Admin/Salary/SalaryAdmin";
import ProfileAdmin from "./features/Admin/Profile/ProfileAdmin";

/* ======================================================
   PROTECTED ROUTE
   Membaca user dari authStore (Zustand) — bukan lagi authContext
====================================================== */
type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: UserRole;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // Belum login → ke halaman login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Role tidak cocok → ke halaman login
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/* ======================================================
   APP
====================================================== */
function App() {
  return (
    <Routes>

      {/* ================= LOGIN ================= */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* ================= STUDENT ================= */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="siswa">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomeAdmin />} />
        <Route path="classes"  element={<ClassesAdmin />} />
        <Route path="teacher"  element={<TeacherAdmin />} />
        <Route path="student"  element={<StudentAdmin />} />
        <Route path="calendar" element={<CalendarAdmin />} />
        <Route path="salary"   element={<SalaryAdmin />} />
        <Route path="Profile"  element={<ProfileAdmin />} />
      </Route>

      {/* ================= TEACHER ================= */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="guru">
            <DashboardTeacher />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomeTeacher />} />
        <Route path="profile"      element={<ProfileTeacher />} />
        <Route path="classes"      element={<ClassTeacher />} />
        <Route path="create-class" element={<CreateClass />} />
        <Route path="calendar"     element={<CalendarTeacher />} />
        <Route path="feedback"     element={<FeedbackTeacher />} />
        <Route path="salary"       element={<SalaryTeacher />} />
      </Route>

      {/* ================= NOT FOUND ================= */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;