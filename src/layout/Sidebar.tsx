import { NavLink, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import "../features/Dashboard/Dashboard.css";
import useAuthStore from "../store/authStore";

export const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <img src={logo1} alt="logo" className="brand-logo-img-standalone" />
      </div>

      <nav className="nav-menu">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/dashboard/classroom"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          📖 Classroom
        </NavLink>

        <NavLink
          to="/dashboard/teacher"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          🎓 Teacher
        </NavLink>

        <NavLink
          to="/dashboard/certificate"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          🏆 Certificate
        </NavLink>

        <div style={{ marginTop: "auto", paddingTop: "20px" }}>
          <button
            onClick={handleLogout}
            className="nav-item"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              color: "#ef4444",
              fontWeight: "600",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
