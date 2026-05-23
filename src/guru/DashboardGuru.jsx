import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./DashboardGuru.css";

const DashboardGuru = () => {
  const location = useLocation();

  /* ======================================================
      ROUTE YANG MENYEMBUNYIKAN HEADER (Huruf Kecil Semua)
     ====================================================== */
  const hiddenHeaderRoutes = [
    "/teacher/profile",
    "/teacher/classes",
    "/teacher/calendar",
    "/teacher/create-class",
    "/teacher/feedback", // 1. TAMBAHKAN INI agar halaman feedback aman & konsisten
    "/teacher/salary",   // Sekalian tambahkan rute salary agar seragam
  ];

  /* ======================================================
      CHECK CURRENT ROUTE (Aman dari Huruf Besar / Kecil)
     ====================================================== */
  // Mengubah rute aktif menjadi huruf kecil semua sebelum dicocokkan
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

export default DashboardGuru;