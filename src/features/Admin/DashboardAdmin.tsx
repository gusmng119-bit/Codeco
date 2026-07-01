import { useState, useEffect, useRef } from "react";
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
  LogOut,
  Award
} from "lucide-react";
import logo1 from "@/assets/logo1.png";
import useAuthStore from "@/store/authStore";

const DashboardAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("class");
  const notifCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isNotifOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsNotifOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    // Fokus ke tombol close agar lebih accessible
    setTimeout(() => {
      notifCloseBtnRef.current?.focus?.();
    }, 0);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNotifOpen]);

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

  const notifications = {
    class: [
      {
        id: 1,
        message: <><strong>Robotic Class</strong> by Mr. Ilham has been finished <span className="notif-hour">(09:00-11:00)</span></>,
        time: "2h ago",
        icon: "gear"
      },
      {
        id: 2,
        message: <><strong>Coding Basic</strong> by Ms. Putri has been rescheduled to tomorrow</>,
        time: "5h ago",
        icon: "calendar"
      },
      {
        id: 3,
        message: <><strong>Science Class</strong> by Ms. Ayu has been successfully created</>,
        time: "1d ago",
        icon: "book"
      }
    ],
    teacher: [
      {
        id: 1,
        message: <><strong>Mr. Ilham</strong> is ready to teach the Robotics Class on April 20</>,
        time: "1h ago",
        icon: "graduation"
      },
      {
        id: 2,
        message: <><strong>Mrs. Dayu</strong> uploaded a new learning file in Programming Class</>,
        time: "4h ago",
        icon: "drive"
      },
      {
        id: 3,
        message: <><strong>Mr. Ilham</strong> is ready to teach the Robotics Class on April 20</>,
        time: "1h ago",
        icon: "graduation"
      },
      {
        id: 4,
        message: <><strong>Mrs. Dayu</strong> uploaded a new learning file in Programming Class</>,
        time: "4h ago",
        icon: "drive"
      },
      {
        id: 5,
        message: <><strong>Mr. Ilham</strong> is ready to teach the Robotics Class on April 20</>,
        time: "1h ago",
        icon: "graduation"
      }
    ],
    "student's": [
      {
        id: 1,
        message: <><strong>Emma Johnson</strong> has successfully completed Programming Class.</>,
        time: "1h ago",
        icon: "users"
      },
      {
        id: 2,
        message: <>A certificate has been generated for <strong>Liam Brown</strong>.</>,
        time: "4h ago",
        icon: "award"
      },
      {
        id: 3,
        message: <><strong>Emma Johnson</strong> has successfully completed Programming Class.</>,
        time: "1h ago",
        icon: "users"
      },
      {
        id: 4,
        message: <>A certificate has been generated for <strong>Liam Brown</strong>.</>,
        time: "4h ago",
        icon: "award"
      }
    ],
    payment: [
      {
        id: 1,
        message: <><strong>Mr. Ilham's</strong> salary has been successfully transferred.</>,
        time: "1h ago",
        icon: "payment"
      }
    ]
  };

  const renderNotifIcon = (iconType: string) => {
    switch (iconType) {
      case "gear":
        return (
          <div className="notif-icon-circle bg-pink-light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
              <path fillRule="evenodd" d="M11.078 2.25c-.424 0-.751.344-.751.766v.163c0 .943-.637 1.74-1.545 1.956a2.417 2.417 0 0 1-1.637-.21l-.146-.084a.75.75 0 0 0-.992.21l-.747 1.295a.75.75 0 0 0 .193.996l.145.084c.801.462 1.157 1.455.836 2.333a2.417 2.417 0 0 1-1.342 1.467h-.168a.75.75 0 0 0-.75.75v1.493c0 .414.336.75.75.75h.168a2.417 2.417 0 0 1 1.342 1.467c.321.878-.035 1.871-.836 2.333l-.145.084a.75.75 0 0 0-.193.996l.747 1.295a.75.75 0 0 0 .992.21l.146-.084a2.417 2.417 0 0 1 1.637-.21c.908.216 1.545 1.013 1.545 1.956v.163c0 .422.327.766.751.766h1.494c.424 0 .751-.344.751-.766v-.163c0-.943.637-1.74 1.545-1.956a2.417 2.417 0 0 1 1.637.21l.146.084a.75.75 0 0 0 .992-.21l.747-1.295a.75.75 0 0 0-.193-.996l-.145-.084a2.417 2.417 0 0 1-.836-2.333 2.417 2.417 0 0 1 1.342-1.467h.168a.75.75 0 0 0 .75-.75v-1.493a.75.75 0 0 0-.75-.75h-.168a2.417 2.417 0 0 1-1.342-1.467c-.321-.878.035-1.871.836-2.333l.145-.084a.75.75 0 0 0 .193-.996l-.747-1.295a.75.75 0 0 0-.992-.21l-.146.084a2.417 2.417 0 0 1-1.637.21c-.908-.216-1.545-1.013-1.545-1.956v-.163a.75.75 0 0 0-.751-.766h-1.494ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "calendar":
        return (
          <div className="notif-icon-circle bg-orange-light">
            <Calendar size={20} />
          </div>
        );
      case "book":
        return (
          <div className="notif-icon-circle bg-blue-light">
            <BookOpen size={20} />
          </div>
        );
      case "graduation":
        return (
          <div className="notif-icon-circle bg-green-light">
            <GraduationCap size={20} />
          </div>
        );
      case "drive":
        return (
          <div className="notif-icon-drive">
            <svg viewBox="0 0 24 24" width="22" height="22" style={{ display: "block" }}>
              <path fill="#FFD043" d="M15.375 16.5h7.25L15.375 4h-7.25l7.25 12.5z" />
              <path fill="#188038" d="M8.125 4L.875 16.5h7.25L15.375 4H8.125z" />
              <path fill="#1967D2" d="M11.75 10.25L8.125 16.5h14.5l-3.625-6.25H11.75z" />
            </svg>
          </div>
        );
      case "users":
        return (
          <div className="notif-icon-circle bg-blue-light">
            <Users size={20} />
          </div>
        );
      case "award":
        return (
          <div className="notif-icon-circle bg-orange-light">
            <Award size={20} />
          </div>
        );
      case "payment":
        return (
          <div className="notif-icon-circle bg-green-light">
            <Wallet size={20} />
          </div>
        );
      default:
        return null;
    }
  };

  const activeNotifications = notifications[activeTab as keyof typeof notifications] || [];

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
            <div className="notification-trigger" onClick={() => setIsNotifOpen(true)}>
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

      {/* ================= MODAL DIALOG (NOTIFICATION / LONCENG) ================= */}
      {isNotifOpen && (
        <div className="notif-overlay" onClick={() => setIsNotifOpen(false)} role="presentation">
          <div
            className="notif-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Notification"
          >
            <div className="notif-modal-header">
              <h3>Notification</h3>
              <button
                className="notif-close-btn"
                onClick={() => setIsNotifOpen(false)}
                aria-label="Close notification"
                ref={notifCloseBtnRef}
              >
                &times;
              </button>
            </div>

            <div className="notif-tabs">
              {['class', 'teacher', "student's", 'payment'].map((tab) => (
                <button 
                  key={tab}
                  className={`notif-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="notif-list-container">
              {activeNotifications.length > 0 ? (
                activeNotifications.map((notif) => (
                  <div className="notif-item-card" key={notif.id}>
                    {renderNotifIcon(notif.icon)}
                    <div className="notif-text-content">
                      <p className="notif-message">
                        {notif.message}
                      </p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af" }}>
                  No notifications
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
