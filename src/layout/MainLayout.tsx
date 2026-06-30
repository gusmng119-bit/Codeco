import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../features/Dashboard/Dashboard.css";

export const MainLayout = () => {
  return (
    <div className="dashboard-wrapper">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN AREA ================= */}
      <div className="main-area">
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
