import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import logo1 from "../../assets/logo1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");

  // ✅ CLASS YANG DIPILIH
  const [selectedClass] = useState(null);

  // ✅ STATUS JOIN CLASS (GLOBAL)
  const [joined, setJoined] = useState(false);

  const currentPage = useMemo(() => {
    const route = location.pathname.replace(/^\/dashboard\/?/, "");
    return route === "" ? "home" : route;
  }, [location.pathname]);

  const setPage = (page) => {
    const path = page === "home" ? "/dashboard" : `/dashboard/${page}`;
    navigate(path);
  };

  const outletContext = {
    setPage,
    selectedClass,
    joined,
    setJoined,
    filter,
    searchClass,
    setFilter,
    setSearchClass,
  };

  return (
    <div className="dashboard-wrapper">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="logo-section">
          <img
            src={logo1}
            alt="logo"
            className="brand-logo-img-standalone"
          />
        </div>

        <nav className="nav-menu">

          <div
            className={`nav-item ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            🏠 Home
          </div>

          <div
            className={`nav-item ${currentPage === "classroom" ? "active" : ""}`}
            onClick={() => setPage("classroom")}
          >
            📖 Classroom
          </div>

          <div
            className={`nav-item ${currentPage === "teacher" ? "active" : ""}`}
            onClick={() => setPage("teacher")}
          >
            🎓 Teacher
          </div>

          <div
            className={`nav-item ${currentPage === "certificate" ? "active" : ""}`}
            onClick={() => setPage("certificate")}
          >
            🏆 Certificate
          </div>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-area">
        <main className="content-container">
          <Outlet context={outletContext} />
        </main>
      </div>

    </div>
  );
};

export default Dashboard;