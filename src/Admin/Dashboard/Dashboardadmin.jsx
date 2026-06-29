import React from "react";
import "./DashboardAdmin.css"; // Impor file CSS
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Calendar, 
  Wallet, 
  Bell, 
  ChevronDown, 
  User 
} from "lucide-react";

import logo1 from "../../assets/logo1.png";

const DashboardAdmin = () => {
  const location = useLocation();

  // 1. Definisikan menuItems sesuai dengan konfigurasi route App.jsx
  const menuItems = [
    { name: "Home", path: "/admin", icon: <Home size={20} /> },
    { name: "Classes", path: "/admin/classes", icon: <BookOpen size={20} /> },
    { name: "Teacher", path: "/admin/teacher", icon: <GraduationCap size={20} /> },
    { name: "Student's", path: "/admin/student", icon: <Users size={20} /> },
    { name: "Calendar", path: "/admin/calendar", icon: <Calendar size={20} /> },
    { name: "Salary", path: "/admin/salary", icon: <Wallet size={20} /> },
  ];

  // 2. Fungsi pembantu untuk menentukan teks judul dan deskripsi header secara dinamis
  const getHeaderContent = () => {
    switch (location.pathname) {
      case "/admin/classes":
        return {
          title: "Classes",
          subtitle: "Manage and monitor all classes" // Sesuai dengan mockup image_64d565.png
        };
      case "/admin/teacher":
        return {
          title: "Teachers",
          subtitle: "Welcome back, Admin!" // Sesuai dengan mockup image_64642a.jpg
        };
      case "/admin/student":
        return {
          title: "Students",
          subtitle: "Manage and monitor all students data"
        };
      case "/admin/calendar":
        return {
          title: "Calendar",
          subtitle: "Schedule management and events"
        };
      case "/admin/salary":
        return {
          title: "Salary & Payroll",
          subtitle: "Track and manage finance reports"
        };
      case "/admin":
      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome back, Admin!"
        };
    }
  };

  const currentHeader = getHeaderContent();

  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
          <div className="logo-box">
            <img 
              src={logo1} 
              alt="Codeco STEAM Logo" 
              className="sidebar-logo-img" 
            />
          </div>
        </div>

        <nav className="sidebar-nav">
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
        </nav>
      </aside>

      {/* CONTAINER UTAMA */}
      <div className="main-content-container">
        {/* NAVBAR ATAS */}
        <header className="top-navbar">
          {/* PERBAIKAN: Judul & Subtitle sekarang memanggil data dinamis dari fungsi getHeaderContent() */}
          <div className="header-title">
            <h1>{currentHeader.title}</h1>
            <p>{currentHeader.subtitle}</p>
          </div>

          <div className="header-actions">
            <div className="notification-trigger">
              <Bell size={24} />
              <span className="badge-count">13</span>
            </div>

            <div className="admin-profile">
              <div className="avatar-circle"><User size={20} /></div>
              <div className="profile-info">
                <div className="profile-role-row">
                  <span className="profile-role">Admin</span>
                  <ChevronDown size={14} className="dropdown-arrow" />
                </div>
                <p className="profile-name">Ningsih sari</p>
              </div>
            </div>
          </div>
        </header>

        {/* KONTEN DARI HOME / OUTLET */}
        <main className="dashboard-main-view">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;