import { useState } from "react";
import "./Dashboard.css";

import logo1 from "../../assets/logo1.png";

import Home from "../Home/Home";
import Classroom from "../Classroom/Classroom";
import Teacher from "../Teacher/Teacher";
import Certificate from "../Certificate/Certificate";
import Profile from "../Profile/Profile";
import ClassMaterial from "../Material/Material";
import FeedbackClass from "../Feedback/Feedback";

const Dashboard = () => {
  /* ================= PAGE ================= */
  const [page, setPage] = useState("home");

  /* ================= CLASS FILTER ================= */
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");

  /* ================= GLOBAL STATE ================= */
  const [selectedClass, setSelectedClass] = useState(null);
  const [joined, setJoined] = useState(false);

  /* ================= CERTIFICATE ================= */
  const [certificates, setCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("certificates")) || [];
  });

  const saveCertificate = (course) => {
    const oldCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    const exist = oldCertificates.find(
      (c) => c.className === course.title
    );

    if (exist) {
      alert("Certificate already saved!");
      return;
    }

    const newCertificate = {
      id: Date.now(),
      className: course.title,
      instructor: course.instructor,
      date: new Date().toLocaleDateString(),
      image: course.certificateImg,
    };

    const updatedCertificates = [...oldCertificates, newCertificate];

    localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
    setCertificates(updatedCertificates);
  };

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
          {page === "home" && (
            <Home
              setPage={setPage}
              selectedClass={selectedClass}
              joined={joined}
              setJoined={setJoined}
              saveCertificate={saveCertificate}
            />
          )}

          {page === "classroom" && (
            <Classroom
              filter={filter}
              searchClass={searchClass}
              onFilterChange={setFilter}
              onSearchChange={setSearchClass}
              setPage={setPage}
              setSelectedClass={setSelectedClass}
            />
          )}

          {page === "teacher" && <Teacher />}

          {page === "certificate" && (
            <Certificate certificates={certificates} />
          )}

          {page === "profile" && <Profile setPage={setPage} />}

          {page === "material" && <ClassMaterial setPage={setPage} />}

          {page === "feedback" && <FeedbackClass setPage={setPage} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;