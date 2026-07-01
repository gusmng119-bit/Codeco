import "./DashboardAdmin.css";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Wallet,
  Bell,
  ChevronDown,
  User,
  LogOut
} from "lucide-react";
import logo1 from "@/assets/logo1.png";
import useAuthStore from "@/store/authStore";

const DashboardAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Home",      path: "/admin",          icon: <Home size={20} /> },
    { name: "Classes",   path: "/admin/classes",  icon: <BookOpen size={20} /> },
    { name: "Teacher",   path: "/admin/teacher",  icon: <GraduationCap size={20} /> },
    { name: "Student's", path: "/admin/student",  icon: <Users size={20} /> },
    { name: "Calendar",  path: "/admin/calendar", icon: <Calendar size={20} /> },
    { name: "Salary",    path: "/admin/salary",   icon: <Wallet size={20} /> },
  ];

  const getHeaderContent = () => {
    switch (location.pathname) {
      case "/admin/classes":  return { title: "Classes",        subtitle: "Manage and monitor all classes" };
      case "/admin/teacher":  return { title: "Teachers",       subtitle: "Welcome back, Admin!" };
      case "/admin/student":  return { title: "Students",       subtitle: "Manage and monitor all students data" };
      case "/admin/calendar": return { title: "Calendar",       subtitle: "Schedule management and events" };
      case "/admin/salary":   return { title: "Salary & Payroll", subtitle: "Track and manage finance reports" };
      default:                return { title: "Dashboard",      subtitle: "Welcome back, Admin!" };
    }
  };

  const currentHeader = getHeaderContent();

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
          <div className="logo-box">
            <img src={logo1} alt="Codeco STEAM Logo" className="sidebar-logo-img" />
          </div>
        </div>

        <nav className="sidebar-nav" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div
            className="nav-item logout-item"
            onClick={handleLogout}
            style={{ marginTop: "auto", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", padding: "12px 24px" }}
          >
            <span className="nav-icon"><LogOut size={20} /></span>
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content-container">
        {/* TOP NAVBAR */}
        <header className="top-navbar">
          <div className="header-title">
            <h1>{currentHeader.title}</h1>
            <p>{currentHeader.subtitle}</p>
          </div>

          <div className="header-actions">
            <div className="notification-trigger">
              <Bell size={24} />
              <span className="badge-count">13</span>
            </div>

            <div
  className="admin-profile"
  onClick={() => navigate("/admin/profile")}
  style={{ cursor: "pointer" }}
>
  <div className="avatar-circle"><User size={20} /></div>
  <div className="profile-info">
    <div className="profile-role-row">
      <span className="profile-role">Admin</span>
      <ChevronDown size={14} className="dropdown-arrow" />
    </div>
    <p className="profile-name">{authUser?.name ?? "Admin"}</p>
  </div>
</div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="dashboard-main-view">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
