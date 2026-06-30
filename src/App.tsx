import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./features/auth/authContext";

/* ================= LOGIN ================= */
import Login from "./features/Login/Login";

/* ================= STUDENT ================= */
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

/* ================= ADMIN ================= */
import DashboardAdmin from "./Admin/Dashboard/Dashboardadmin";
import HomeAdmin from "./Admin/Home/HomeAdmin";
import ClassesAdmin from "./Admin/Class/ClassesAdmin";
import TeacherAdmin from "./Admin/Teacher/TeacherAdmin";
import StudentAdmin from "./Admin/Student/StudentAdmin";
import CalendarAdmin from "./Admin/Calendar/CalendarAdmin";
import SalaryAdmin from "./Admin/Salary/SalaryAdmin";
import ProfileAdmin from "./Admin/Profile/ProfileAdmin";


/* ======================================================
   PROTECTED ROUTE
====================================================== */
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (
    role &&
    user.role?.toLowerCase() !== role.toLowerCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ======================================================
   APP
====================================================== */
function App() {
  return (
    <AuthProvider>
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
          <Route
            index
            element={<HomeAdmin />}
          />

          <Route
            path="classes"
            element={<ClassesAdmin />}
          />

          <Route
            path="teacher"
            element={<TeacherAdmin />}
          />

          <Route
            path="student"
            element={<StudentAdmin />}
          />

          <Route
            path="calendar"
            element={<CalendarAdmin />}
          />

          <Route
            path="salary"
            element={<SalaryAdmin />}
          />

          <Route
            path="Profile"
            element={<ProfileAdmin />}
          />


        </Route>

        {/* ================= TEACHER ================= */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="guru">
              <DashboardGuru />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<HomeGuru />}
          />

          <Route
            path="profile"
            element={<TeacherProfile />}
          />

          <Route
            path="classes"
            element={<Class />}
          />

          <Route
            path="create-class"
            element={<CreateClassGuru />}
          />

          <Route
            path="calendar"
            element={<Calendar />}
          />

          <Route
            path="feedback"
            element={<FeedbackGuru />}
          />

          <Route
            path="salary"
            element={<Salary />}
          />
        </Route>

        {/* ================= NOT FOUND ================= */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;