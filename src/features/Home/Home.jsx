import { useState } from "react";
import "./Home.css";
import profileImg from "../../assets/Profile.png";
import logo2 from "../../assets/logo2.jpg";

const Home = ({ setPage }) => {
  const [joined, setJoined] = useState(false);

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
            <img src={logo2} alt="Robotic Class" />
          </div>

          <div className="hero-info">
            <h3>Robotic Class</h3>
            <p className="instructor">Mr. Ilham</p>

            <div className="hero-meta">
              <span>📅 Today</span>
              <span>🕒 09:00-11:00</span>
            </div>
          </div>

          <button
            className="join-now-btn"
            onClick={() => setJoined(true)}
          >
            {joined ? "Joined" : "Join class"}
          </button>
        </div>
      </section>

      {/* ================= DASHBOARD GRID ================= */}
      <div className="dashboard-grid">
        <div className="grid-left-col">

          <div className="status-row">

            <div 
  className={`status-card ${!joined ? "locked" : ""} cursor-pointer`} 
  onClick={() => joined && setPage("feedback")} // Hanya pindah jika sudah 'joined'
  style={{ cursor: joined ? 'pointer' : 'not-allowed' }}
>
  {!joined && <span className="icon-lock">🔒</span>}

  <h4>Teacher Feedback</h4>

  {!joined ? (
    <p>Will be shown here after you complete the class</p>
  ) : (
    <>
      <p>⭐ Excellent participation!</p>
      <p>Keep practicing robotics logic.</p>
      <div className="view-feedback-hint"></div>
    </>
  )}
</div>

            {/* ===== MATERIAL ===== */}
            <div
              className={`status-card ${!joined ? "locked" : "clickable"}`}
              onClick={() => {
                if (joined) setPage("material");
                else alert("Silahkan join class terlebih dahulu!");
              }}
              style={{ cursor: joined ? "pointer" : "not-allowed" }}
            >
              {!joined && <span className="icon-lock">📖</span>}

              <h4>Today's Material</h4>

              {!joined ? (
                <p>Class material will be accessible after you join</p>
              ) : (
                <ul>
                  <li>Robot Assembly</li>
                  <li>Sensor Introduction</li>
                  <li>Movement Logic</li>
                </ul>
              )}
            </div>

          </div>

          {/* ================= PROGRESS ================= */}
          <div className="progress-section">
            <h4>Learning progress</h4>

            <div className="progress-card-inner">
              <img src={logo2} alt="Robot" className="mini-robot" />

              <div className="progress-details">
                <div className="progress-header">
                  <strong>Robotic Class</strong>
                  <span>{joined ? "50%" : "0%"}</span>
                </div>

                <p className="teacher-sub">Mr. Ilham</p>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: joined ? "50%" : "0%" }}
                  />
                </div>

                <p className="no-progress-msg">
                  {joined ? "🚀 Progress Started!" : "🔒 No progress yet"}
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
              <span className="big-lock">🏆</span>
              <p>Certificate Ready Soon!</p>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default Home;