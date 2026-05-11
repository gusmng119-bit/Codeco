import React, { useEffect, useState } from "react";
import "./Home.css";

import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";
import certificateImg from "../../assets/certificate.png";

const Home = ({ setPage, selectedClass }) => {

  /* ================= CLASS DATA ================= */
  const classData = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    time: "09:00-11:00",
    material: "Robot Introduction",
  };

  const isLocked = classData?.type === "upcoming";

  /* ================= JOIN STATE ================= */
  const [joined, setJoined] = useState(() => {
    const savedJoin = JSON.parse(localStorage.getItem("joinedClass")) || {};
    return Boolean(savedJoin[classData.title]);
  });

  const handleJoin = () => {

    if (isLocked) {
      alert("This class is not available yet (Upcoming Class)");
      return;
    }

    const savedJoin =
      JSON.parse(localStorage.getItem("joinedClass")) || {};

    savedJoin[classData.title] = true;

    localStorage.setItem(
      "joinedClass",
      JSON.stringify(savedJoin)
    );

    setJoined(true);
  };

  /* ================= PROGRESS ================= */
  const [progress, setProgress] = useState(() => {
    const savedProgress = JSON.parse(localStorage.getItem("learningProgress")) || {};
    return Number(savedProgress[classData.title] || 0);
  });

  /* ================= AUTO PROGRESS ================= */
  useEffect(() => {
    if (!joined) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        const updated = Math.min(prev + 10, 100);

        const savedProgress =
          JSON.parse(localStorage.getItem("learningProgress")) || {};
        savedProgress[classData.title] = updated;
        localStorage.setItem(
          "learningProgress",
          JSON.stringify(savedProgress)
        );

        return updated;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [joined, classData.title]);

  /* ================= NAVIGATION ================= */
  const goPage = (page) => {

    // ✅ profile selalu bisa dibuka
    if (page === "profile") {
      setPage?.("profile");
      return;
    }

    // ✅ class upcoming dikunci
    if (isLocked) {
      alert("This class is still Upcoming and cannot be accessed yet");
      return;
    }

    // ✅ material & feedback harus join
    if (
      (page === "feedback" || page === "material") &&
      !joined
    ) {
      alert("Join class first!");
      return;
    }

    setPage?.(page);
  };

  /* ================= CERTIFICATE ================= */
  const [showCertificate, setShowCertificate] = useState(false);
  /* ================= PROFILE NAME ================= */
  const [profileName] = useState(() => {
    const savedProfile = JSON.parse(
      localStorage.getItem("profileData")
    );
    return savedProfile?.firstName || "User";
  });

  const downloadCertificate = () => {

    if (progress < 100) {
      alert("Complete learning progress first!");
      return;
    }

    const oldCertificates =
      JSON.parse(localStorage.getItem("certificates")) || [];

    const exist = oldCertificates.find(
      (c) => c.className === classData.title
    );

    if (exist) {
      alert("Certificate already saved!");
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
      JSON.stringify([
        ...oldCertificates,
        newCertificate
      ])
    );

    alert("Certificate downloaded!");
    setShowCertificate(false);
  };

  /* ====================================================== */
  return (
    <>

      {/* ================= GREETING ================= */}
      <header
        className="user-greeting-card"
        onClick={() => goPage("profile")}
      >
        <div className="avatar-main">
          <img src={profileImg} alt="Profile" />
        </div>

        <h1>Hi, {profileName}!</h1>
      </header>

      {/* ================= TODAY CLASS ================= */}
      <section className="class-highlight">

        <h2 className="label-text">Today's Class</h2>

        <div className={`hero-card ${joined ? "hero-active" : ""}`}>

          <div className="hero-img-wrapper">
            <img src={logo2} alt="Class" />
          </div>

          <div className="hero-info">
            <h3>{classData.title}</h3>

            <p className="instructor">
              {classData.instructor}
            </p>

            <div className="hero-meta">
              <span>Today</span>
              <span>🕒 {classData.time}</span>
            </div>
          </div>

          {/* ================= JOIN BUTTON ================= */}
          <button
            className={`join-now-btn
              ${joined ? "joined" : ""}
              ${isLocked ? "locked" : ""}
            `}
            onClick={handleJoin}
            disabled={joined || isLocked}
          >

            {isLocked
              ? "Upcoming Class"
              : joined
              ? "Joined"
              : "Join Class"}

          </button>

        </div>
      </section>

      {/* ================= DASHBOARD GRID ================= */}
      <div className="dashboard-grid">

        <div>

          {/* ================= STATUS ================= */}
          <div className="status-row">

            {/* FEEDBACK */}
            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() => goPage("feedback")}
            >

              {!joined && (
                <span className="icon-lock">🔒</span>
              )}

              <h4>Teacher Feedback</h4>

              {joined ? (
                <p>⭐ Excellent participation!</p>
              ) : (
                <p>Will appear after joining class</p>
              )}

            </div>

            {/* MATERIAL */}
            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() => goPage("material")}
            >

              {!joined && (
                <span className="icon-lock">📖</span>
              )}

              <h4>Today's Material</h4>

              {joined ? (
                <ul>
                  <li>{classData.material}</li>
                </ul>
              ) : (
                <p>Material locked</p>
              )}

            </div>

          </div>

          {/* ================= PROGRESS ================= */}
          <div className="progress-section">

            <h4>Learning Progress</h4>

            <div className="progress-card-inner">

              <img
                src={logo2}
                alt="Robot"
                className="mini-robot"
              />

              <div className="progress-details">

                <div className="progress-header">
                  <strong>{classData.title}</strong>
                  <span>{progress}%</span>
                </div>

                <p>{classData.instructor}</p>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p>
                  {progress === 100
                    ? "Course Completed!"
                    : joined
                    ? "Learning in progress..."
                    : "Join to start learning"}
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATE ================= */}
        <div
          className={`certificate-sidebar ${
            progress < 100 ? "locked" : ""
          }`}
        >

          {progress < 100 ? (
            <>
              <span className="big-lock">🔒</span>

              <p>
                Complete course to unlock certificate
              </p>
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