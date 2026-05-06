<<<<<<< HEAD
import { useOutletContext } from "react-router-dom";
=======
import { useState } from "react";
>>>>>>> 94c6236 (fix: resolve husky eslint issues)
import "./Home.css";
import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";
import certificateImg from "../../assets/certificate.png";

<<<<<<< HEAD
const Home = () => {
  const { setPage, joined, setJoined, selectedClass } = useOutletContext();
=======
const Home = ({
  setPage,
  joined,
  setJoined,
  selectedClass,
}) => {

  /* ================= CERTIFICATE MODAL ================= */
  const [showCertificate, setShowCertificate] = useState(false);
>>>>>>> 94c6236 (fix: resolve husky eslint issues)

  const classData = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    time: "09:00-11:00",
  };

  const downloadCertificate = () => {

  const oldCertificates =
    JSON.parse(localStorage.getItem("certificates")) || [];

  // ❌ prevent duplicate
  const alreadyExist = oldCertificates.find(
    (c) => c.className === classData.title
  );

  if (alreadyExist) {
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

  /* ✅ SAVE ONLY (NO DOWNLOAD FILE) */
  localStorage.setItem(
    "certificates",
    JSON.stringify([...oldCertificates, newCertificate])
  );

  alert("Certificate saved to Certificate Page!");

  setShowCertificate(false); // auto close modal
};


  return (
    <>
      {/* ================= USER GREETING ================= */}
      <header
        className="user-greeting-card"
        onClick={() => setPage("profile")}
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

          <button
            className={`join-now-btn ${joined ? "joined" : ""}`}
            onClick={() => !joined && setJoined(true)}
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
              onClick={() => joined && setPage("feedback")}
            >
              {!joined && <span className="icon-lock">🔒</span>}

              <h4>Teacher Feedback</h4>

              {!joined ? (
                <p>Will be shown here after you complete the class</p>
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
                joined
                  ? setPage("material")
                  : alert("Silahkan join class terlebih dahulu!")
              }
            >
              {!joined && <span className="icon-lock">📖</span>}

              <h4>Today's Material</h4>

              {!joined ? (
                <p>Class material will be accessible after you join</p>
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
            <h4>Learning progress</h4>

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
                    style={{ width: joined ? "50%" : "0%" }}
                  />
                </div>

                <p className="no-progress-msg">
                  {joined ? "Progress Started!" : "🔒 No progress yet"}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= CERTIFICATE SIDEBAR ================= */}
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
      {/* CLOSE */}
      <button
        className="close-btn"
        onClick={() => setShowCertificate(false)}
      >
        ✕
      </button>

      {/* CERTIFICATE IMAGE */}
      <img
        src={certificateImg}
        alt="Certificate"
        className="certificate-preview"
      />

      {/* INFO */}
      <h3>{classData.title}</h3>
      

      {/* DOWNLOAD */}
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