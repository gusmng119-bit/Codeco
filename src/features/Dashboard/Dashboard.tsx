import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

import { AiOutlineHome } from "react-icons/ai"; // home
import { BiBook, BiLogOut } from "react-icons/bi"; // classroom, logout
import { GiGraduateCap } from "react-icons/gi"; // teacher
import { FaTrophy } from "react-icons/fa";     // certificate

import logo1 from "../../assets/logo1.png";
import useAuthStore from "@/store/authStore";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const activeMenu = (path: string) => {
    if (path === "/student") {
      return location.pathname === "/student" ? "active" : "";
    }
    return location.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <div className="dashboard-wrapper">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        {/* ================= LOGO ================= */}
        <div className="logo-section">
          <img
            src={logo1}
            alt="logo"
            className="brand-logo-img-standalone"
          />
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="nav-menu" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <div
            className={`nav-item ${activeMenu("/student")}`}
            onClick={() => navigate("/student")}
          >
            <AiOutlineHome size={28} className="nav-icon" />
            <span>Home</span>
          </div>

          <div
            className={`nav-item ${activeMenu("/student/classroom")}`}
            onClick={() => navigate("/student/classroom")}
          >
            <BiBook size={28} className="nav-icon" />
            <span>Classroom</span>
          </div>

          <div
            className={`nav-item ${activeMenu("/student/teacher")}`}
            onClick={() => navigate("/student/teacher")}
          >
            <GiGraduateCap size={28} className="nav-icon" />
            <span>Teacher</span>
          </div>

          <div
            className={`nav-item ${activeMenu("/student/certificate")}`}
            onClick={() => navigate("/student/certificate")}
          >
            <FaTrophy size={28} className="nav-icon" />
            <span>Certificate</span>
          </div>

          {/* LOGOUT */}
          <div
            className="nav-item logout-item"
            onClick={handleLogout}
            style={{ marginTop: "auto", color: "#ef4444", cursor: "pointer" }}
          >
            <BiLogOut size={28} className="nav-icon" />
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="main-area">
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
