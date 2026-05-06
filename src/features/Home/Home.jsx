import React, { useState } from "react";
import "./Home.css";

import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";
import certificateImg from "../../assets/certificate.png";

import { useOutletContext } from "react-router-dom";

const Home = () => {
  /* ================= OUTLET CONTEXT ================= */
  const outlet = useOutletContext?.() || {};

  const { setPage, joined, setJoined, selectedClass } = outlet;

  /* ================= LOCAL FALLBACK STATE ================= */
  const [localJoined, setLocalJoined] = useState(false);

  // gunakan context jika ada, jika tidak pakai local state
  const isJoined =
    typeof joined === "boolean" ? joined : localJoined;

  const handleJoin =
    typeof setJoined === "function"
      ? () => setJoined(true)
      : () => setLocalJoined(true);

  const goPage =
    typeof setPage === "function"
      ? setPage
      : () => {};

  /* ================= CLASS DATA ================= */
  const classData =
    selectedClass || {
      title: "Robotic Class",
      instructor: "Mr. Ilham",
      time: "09:00-11:00",
    };

  /* ================= CERTIFICATE MODAL ================= */
  const [showCertificate, setShowCertificate] = useState(false);

  const downloadCertificate = () => {
    const oldCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    const alreadyExist = oldCertificates.find(
      (c) => c.className === classData.title
    );

    if (alreadyExist) {
      alert("Certificate already saved!");
      setShowCertificate(false);
      return;
    }

    const newCertificate = {
      id: Date.now(),
      className: classData.title,
      instructor: classData.instructor,
      date: new Date().toLocaleDateString(),
      image: certificateImg,
    };

    localStorage.setItem(
      "certificates",
      JSON.stringify([...oldCertificates, newCertificate])
    );

    alert("Certificate saved!");
    setShowCertificate(false);
  };

  return (
    <>
      {/* ================= USER GREETING ================= */}
      <header
        className="user-greeting-card"
        onClick={() => goPage("profile")}
        style={{ cursor: "pointer" }}
      >
        <div className="avatar-main">
          <img src={profileImg} alt="Profile" />
        </div>

        <h1>Hi, Samsoro!</h1>
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

          {/* ✅ FIX JOIN BUTTON */}
          <button
            className={`join-now-btn ${isJoined ? "joined" : ""}`}
            onClick={handleJoin}
            disabled={isJoined}
          >
            {isJoined ? "Joined" : "Join Class"}
          </button>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}
      <div className="dashboard-grid">
        <div className="grid-left-col">

          {/* FEEDBACK */}
          <div className="status-row">
            <div
              className={`status-card ${!isJoined ? "locked" : ""}`}
              onClick={() => isJoined && goPage("feedback")}
            >
              {!isJoined && <span className="icon-lock">🔒</span>}
              <h4>Teacher Feedback</h4>

              {!isJoined ? (
                <p>Will appear after joining class</p>
              ) : (
                <>
                  <p>⭐ Excellent participation!</p>
                  <p>Keep practicing robotics logic.</p>
                </>
              )}
            </div>

            <div
              className={`status-card ${!isJoined ? "locked" : ""}`}
              onClick={() =>
                isJoined
                  ? goPage("material")
                  : alert("Join class first!")
              }
            >
              {!isJoined && <span className="icon-lock">📖</span>}
              <h4>Today's Material</h4>

              {!isJoined ? (
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
                  <span>{isJoined ? "50%" : "0%"}</span>
                </div>

                <p className="teacher-sub">
                  {classData.instructor}
                </p>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: isJoined ? "50%" : "0%",
                    }}
                  />
                </div>

                <p className="no-progress-msg">
                  {isJoined
                    ? "Progress Started!"
                    : "🔒 No progress yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATE ================= */}
        <div
          className={`certificate-sidebar ${
            !isJoined ? "locked" : ""
          }`}
        >
          {!isJoined ? (
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
              onClick={downloadCertificate}
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