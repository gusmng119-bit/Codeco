import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";

import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";
import certificateImg from "../../assets/certificate.png";

import useClassroomStore from "../../store/classroomStore";
import useCertificateStore from "../../store/certificateStore";
import useProfileStore from "../../store/profileStore";
import useAttendanceStore from "../../store/attendanceStore";
import useMaterialStore from "../../store/materialStore";
import useFeedbackStore from "../../store/feedbackStore";

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { classes, selectedClass, joined, joinClass, fetchClasses, setSelectedClass, setJoined } = useClassroomStore();
  const { saveCertificate } = useCertificateStore();
  const { profile, fetchProfile } = useProfileStore();
  const { markAttendance } = useAttendanceStore();
  const { materials, fetchMaterials } = useMaterialStore();
  const { feedbackList, fetchFeedback } = useFeedbackStore();

  const [showCertificate, setShowCertificate] = useState(false);

  /* ================= PROFILE NAME ================= */
  const userName = profile?.firstName ? `${profile.firstName}!` : "Samsoro!";

  useEffect(() => {
    fetchClasses();
    fetchProfile();
    fetchFeedback();
  }, [fetchClasses, fetchProfile, fetchFeedback]);

  useEffect(() => {
    if (id && classes.length > 0) {
      const classIdNum = parseInt(id, 10);
      const foundClass = classes.find((c) => c.id === classIdNum);
      if (foundClass) {
        setSelectedClass(foundClass);
        const savedJoin = JSON.parse(localStorage.getItem("joinedClass") || "{}");
        const isJoined = foundClass.type === "yesterday" || savedJoin[foundClass.title] || false;
        setJoined(isJoined);
      }
    }
  }, [id, classes, setSelectedClass, setJoined]);

  const classData = selectedClass || {
    id: 3,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    time: "09:00 - 11:00",
    type: "upcoming" as const,
  };

  useEffect(() => {
    fetchMaterials(classData.id);
  }, [classData.id, fetchMaterials]);

  // Compute progress based on materials and feedbackList
  const totalMaterialsCount = materials.length;
  const completedMaterialsCount = materials.filter((m) =>
    feedbackList.some((f) => f.materialId === m.id)
  ).length;

  const progressPercent = totalMaterialsCount > 0 ? Math.round((completedMaterialsCount / totalMaterialsCount) * 100) : 0;
  const progressText = `${completedMaterialsCount}/${totalMaterialsCount}`;

  const getHeaderTitle = (type: string) => {
    switch (type) {
      case "yesterday":
        return "Past Class";
      case "upcoming":
        return "Upcoming Class";
      case "today":
      default:
        return "Today's Class";
    }
  };

  const getButtonText = () => {
    if (classData.type === "yesterday") {
      return "Joined";
    }
    if (classData.type === "upcoming") {
      return "Upcoming";
    }
    return joined ? "Joined" : "Join Class";
  };

  const isButtonDisabled = () => {
    if (classData.type === "yesterday") {
      return true;
    }
    if (classData.type === "upcoming") {
      return true;
    }
    return joined;
  };

  // Fungsi Join yang langsung membuka Zoom
  const handleJoin = async () => {
    const zoomLink = "https://us05web.zoom.us/j/3586794809?pwd=9ZZcLp2WeVVKBhmqpalaJvd0LXWH2T.1";

    // Tetap jalankan logic store (opsional)
    await joinClass(classData.id);

    // Save joined state in localStorage so it persists
    const savedJoin = JSON.parse(localStorage.getItem("joinedClass") || "{}");
    savedJoin[classData.title] = true;
    localStorage.setItem("joinedClass", JSON.stringify(savedJoin));

    await markAttendance({
      class_session_id: 1,
      student_id: 1,
      status: "present",
    });

    // Buka Zoom di tab baru
    window.open(zoomLink, "_blank", "noopener,noreferrer");
  };

  const handleDownloadCertificate = async () => {
    await saveCertificate({
      title: classData.title,
      instructor: classData.instructor,
      certificateImg,
    });
    setShowCertificate(false);
  };

  return (
    <>
      {/* ================= USER GREETING ================= */}
      <header
        className="user-greeting-card"
        onClick={() => navigate("/student/profile")}
        style={{ cursor: "pointer" }}
      >
        <div className="avatar-main">
          <img src={profileImg} alt="Profile" />
        </div>
        <h1>Hi, {userName}</h1>
      </header>

      {/* ================= TODAY CLASS ================= */}
      <section className="class-highlight">
        <h2 className="label-text">{getHeaderTitle(classData.type)}</h2>
        <div className={`hero-card ${joined ? "hero-active" : ""}`}>
          <div className="hero-img-wrapper">
            <img src={logo2} alt="Class" />
          </div>
          <div className="hero-info">
            <h3>{classData.title}</h3>
            <p className="instructor">{classData.instructor}</p>
            <div className="hero-meta">
              <span>Today</span>
              <span>{classData.time}</span>
            </div>
          </div>

          <button
            className={`join-now-btn ${isButtonDisabled() ? "joined" : ""}`}
            onClick={handleJoin}
            disabled={isButtonDisabled()}
          >
            {getButtonText()}
          </button>
        </div>
      </section>

      {/* ================= DASHBOARD GRID ================= */}
      <div className="dashboard-grid">
        <div className="grid-left-col">
          {/* FEEDBACK */}
          <div className="status-row">
            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() => joined && navigate("/student/feedback")}
            >
              {!joined && <span className="icon-lock">🔒</span>}
              <h4>Teacher Feedback</h4>

              {!joined ? (
                <p>Will appear after joining class</p>
              ) : (
                <>
                  <p> Excellent participation!</p>
                  <p>Keep practicing robotics logic.</p>
                </>
              )}
            </div>

            <div
              className={`status-card ${!joined ? "locked" : ""}`}
              onClick={() =>
                joined ? navigate("/student/material") : alert("Join class first!")
              }
            >
              {!joined && <span className="icon-lock">📖</span>}
              <h4>Today's Material</h4>

              {!joined ? (
                <p>Material locked</p>
              ) : (
                <ul>
                  {materials.slice(0, 3).map((m) => (
                    <li key={m.id}>{m.title}</li>
                  ))}
                  {materials.length === 0 && <li>No materials yet</li>}
                </ul>
              )}
            </div>
          </div>

          {/* ================= PROGRESS ================= */}
          <div className="progress-section">
            <h4>Learning Progress</h4>
            <div className="progress-card-inner">
              <img src={logo2} alt="Robot" className="mini-robot" />
              <div className="progress-details">
                <div className="progress-header">
                  <strong>{classData.title}</strong>
                  <span>{joined ? `${progressPercent}%` : "0%"}</span>
                </div>

                <p className="teacher-sub">{classData.instructor}</p>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: joined ? `${progressPercent}%` : "0%",
                    }}
                  />
                </div>

                <p className="no-progress-msg">
                  {joined
                    ? progressPercent === 100
                      ? "Progress Completed! (100%)"
                      : `Progress Started! (${progressText})`
                    : "🔒 No progress yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATE ================= */}
        <div className={`certificate-sidebar ${(!joined || progressPercent < 100) ? "locked" : ""}`}>
          {(!joined || progressPercent < 100) ? (
            <>
              <span className="big-lock">🔒</span>
              <p>No Certificate yet</p>
              {joined && (
                <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "10px" }}>
                  Complete all materials to unlock (Progress: {progressPercent}%)
                </p>
              )}
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
        <div className="certificate-overlay" onClick={() => setShowCertificate(false)}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowCertificate(false)}>✕</button>
            <img src={certificateImg} alt="Certificate" className="certificate-preview" />
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