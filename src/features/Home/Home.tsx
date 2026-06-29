import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";
import certificateImg from "../../assets/certificate.png";

import useClassroomStore from "../../store/classroomStore";
import useCertificateStore from "../../store/certificateStore";
import useProfileStore from "../../store/profileStore";

const Home = () => {
  const navigate = useNavigate();
  const { selectedClass, joined, joinClass, fetchClasses } = useClassroomStore();
  const { saveCertificate } = useCertificateStore();
  const { profile, fetchProfile } = useProfileStore();

  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchProfile();
  }, [fetchClasses, fetchProfile]);

  const classData = selectedClass || {
    id: 3,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    time: "09:00 - 11:00",
  };

  const handleJoin = async () => {
    await joinClass(classData.id);
  };

  const handleDownloadCertificate = async () => {
    await saveCertificate({
      title: classData.title,
      instructor: classData.instructor,
      certificateImg,
    });
    setShowCertificate(false);
  };

  const userName = profile?.firstName ? `${profile.firstName}!` : "Samsoro!";

  return (
    <>
      {/* ================= USER GREETING ================= */}
      <header
        className="user-greeting-card"
        onClick={() => navigate("/dashboard/profile")}
        style={{ cursor: "pointer" }}
      >
        <div className="avatar-main">
          <img src={profileImg} alt="Profile" />
        </div>

        <h1>Hi, {userName}</h1>
      </header>

      {/* ================= TODAY CLASS ================= */}
      <section className="class-highlight">
        <h2 className="label-text">Today's class</h2>

        <div className="hero-card">
          <div className="hero-img-wrapper">
            <img src={logo2} alt="Class" />
          </div>

          <div className="hero-info">
            <h3>{classData.title}</h3>
            <p className="instructor">{classData.instructor}</p>

            <div className="hero-meta">
              <span>Today</span>
              <span>🕒 {classData.time}</span>
            </div>
          </div>

          <button
            className={`join-now-btn ${joined ? "joined" : ""}`}
            onClick={handleJoin}
            disabled={joined}
          >
            {joined ? "Joined" : "Join Class"}
          </button>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}
      <div className="dashboard-grid">
        <div className="grid-left-col">
          {/* FEEDBACK */}
          <div className="status-row">
            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() => joined && navigate("/dashboard/feedback")}
            >
              {!joined && <span className="icon-lock">🔒</span>}
              <h4>Teacher Feedback</h4>

              {!joined ? (
                <p>Will appear after joining class</p>
              ) : (
                <>
                  <p>⭐ Excellent participation!</p>
                  <p>Keep practicing robotics logic.</p>
                </>
              )}
            </div>

            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() =>
                joined ? navigate("/dashboard/material") : alert("Join class first!")
              }
            >
              {!joined && <span className="icon-lock">📖</span>}
              <h4>Today's Material</h4>

              {!joined ? (
                <p>Material locked</p>
              ) : (
                <ul>
                  <li>{classData.title}</li>
                  <li>Sensor Introduction</li>
                  <li>Movement Logic</li>
                </ul>
              )}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="progress-section">
            <h4>Learning Progress</h4>

            <div className="progress-card-inner">
              <img src={logo2} alt="Robot" className="mini-robot" />

              <div className="progress-details">
                <div className="progress-header">
                  <strong>{classData.title}</strong>
                  <span>{joined ? "50%" : "0%"}</span>
                </div>

                <p className="teacher-sub">{classData.instructor}</p>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: joined ? "50%" : "0%",
                    }}
                  />
                </div>

                <p className="no-progress-msg">
                  {joined ? "Progress Started!" : "🔒 No progress yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATE ================= */}
        <div className={`certificate-sidebar ${!joined ? "locked" : ""}`}>
          {!joined ? (
            <>
              <span className="big-lock">🔒</span>
              <p>No Certificate yet</p>
            </>
          ) : (
            <>
              <img
                src={certificateImg}
                alt="Certificate"
                className="certificate-img"
              />

              <button
                className="view-certificate-btn"
                onClick={() => setShowCertificate(true)}
              >
                View Certificate
              </button>
            </>
          )}
        </div>
      </div>

      {/* ================= CERTIFICATE MODAL ================= */}
      {showCertificate && (
        <div
          className="certificate-overlay"
          onClick={() => setShowCertificate(false)}
        >
          <div
            className="certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowCertificate(false)}
            >
              ✕
            </button>

            <img
              src={certificateImg}
              alt="Certificate"
              className="certificate-preview"
            />

            <h3>{classData.title}</h3>

            <button
              className="download-btn"
              onClick={handleDownloadCertificate}
            >
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
