import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./DashboardTeacher.css";

const DashboardTeacher = () => {
  const location = useLocation();

  /* ======================================================
     ROUTE YANG MENYEMBUNYIKAN HEADER
  ====================================================== */
  const hiddenHeaderRoutes = [
    "/teacher/profile",
    "/teacher/classes",
    "/teacher/calendar",
    "/teacher/create-class",
    "/teacher/feedback",
    "/teacher/salary",
  ];

  const currentPath = location.pathname.toLowerCase();
  const hideHeader = hiddenHeaderRoutes.includes(currentPath);

  return (
    <div className="dashboard-wrapper">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-area">

        {/* ================= HEADER ================= */}
        {!hideHeader && <Header />}

        {/* ================= PAGE CONTENT ================= */}
        <main className="content-container">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardTeacher;
