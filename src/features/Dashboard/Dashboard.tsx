import "./Dashboard.css";
import logo1 from "../../assets/logo1.png";

import Home from "../Home/Home";
import Classroom from "../Classroom/Classroom";
import Teacher from "../Teacher/Teacher";
import Certificate from "../Certificate/Certificate";
import Profile from "../Profile/Profile";
import ClassMaterial from "../Material/Material";
import FeedbackClass from "../Feedback/Feedback";
import useDashboardStore from "../../store/dashboardStore";

const Dashboard = () => {
  const { page, setPage } = useDashboardStore();

  return (
    <div className="dashboard-wrapper">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo1} alt="logo" className="brand-logo-img-standalone" />
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

      {/* ================= MAIN ================= */}
      <div className="main-area">
        <main className="content-container">
          {page === "home" && <Home />}
          {page === "classroom" && <Classroom />}
          {page === "teacher" && <Teacher />}
          {page === "certificate" && <Certificate />}
          {page === "profile" && <Profile />}
          {page === "material" && <ClassMaterial />}
          {page === "feedback" && <FeedbackClass />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
