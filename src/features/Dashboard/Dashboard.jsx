import { useState } from "react";
import "./Dashboard.css";

import Home from "../Home/Home";
import Classroom from "../Classroom/Classroom";
import Teacher from "../Teacher/Teacher";
import Certificate from "../Certificate/Certificate";
import Profile from "../Profile/Profile";
import ClassMaterial from "../Material/Material";
import FeedbackClass from "../Feedback/Feedback";

import logo1 from "../../assets/logo1.png";

const Dashboard = () => {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");

  // ✅ CLASS YANG DIPILIH
  const [selectedClass, setSelectedClass] = useState(null);

  // ✅ STATUS JOIN CLASS (GLOBAL)
  const [joined, setJoined] = useState(false);

  const renderPage = () => {
    switch (page) {

      case "home":
        return (
          <Home
            setPage={setPage}
            selectedClass={selectedClass}
            joined={joined}
            setJoined={setJoined}
          />
        );

      case "classroom":
        return (
          <Classroom
            filter={filter}
            searchClass={searchClass}
            onFilterChange={setFilter}
            onSearchChange={setSearchClass}
            setPage={setPage}
            setSelectedClass={setSelectedClass}
          />
        );

      case "teacher":
        return <Teacher />;

      case "certificate":
        return <Certificate />;

      case "profile":
        return <Profile setPage={setPage} />;

      case "material":
        return (
          <ClassMaterial
            setPage={setPage}
          />
        );

      case "feedback":
        return (
          <FeedbackClass
            setPage={setPage}
          />
        );

      default:
        return (
          <Home
            setPage={setPage}
            selectedClass={selectedClass}
            joined={joined}
            setJoined={setJoined}
          />
        );
    }
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
            className={`nav-item ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            🏠 Home
          </div>

          <div
            className={`nav-item ${page === "classroom" ? "active" : ""}`}
            onClick={() => setPage("classroom")}
          >
            📖 Classroom
          </div>

          <div
            className={`nav-item ${page === "teacher" ? "active" : ""}`}
            onClick={() => setPage("teacher")}
          >
            🎓 Teacher
          </div>

          <div
            className={`nav-item ${page === "certificate" ? "active" : ""}`}
            onClick={() => setPage("certificate")}
          >
            🏆 Certificate
          </div>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-area">
        <main className="content-container">
          {renderPage()}
        </main>
      </div>

    </div>
  );
};

export default Dashboard;