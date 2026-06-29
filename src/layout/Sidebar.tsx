import { NavLink } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import "../features/Dashboard/Dashboard.css";

export const Sidebar = () => {
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
      </nav>
    </aside>
  );
};

export default Sidebar;
