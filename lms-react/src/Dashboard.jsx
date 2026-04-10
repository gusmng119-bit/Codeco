import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [page, setPage] = useState("home");

  return (
    <div className="dashboard-wrapper">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-box">
            <span className="code-tag">&lt;/&gt;</span>
            <span className="steam-label">STEAM</span>
          </div>
          <h2 className="brand-name">Codeco.co</h2>
        </div>

        <nav className="nav-menu">
          <div
            className={`nav-item ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            <span className="nav-icon">🏠</span>
            <span>home</span>
          </div>

          <div
            className={`nav-item ${page === "classroom" ? "active" : ""}`}
            onClick={() => setPage("classroom")}
          >
            <span className="nav-icon">📖</span>
            <span>class room</span>
          </div>

          <div className="nav-item">
            <span className="nav-icon">🎓</span>
            <span>teacher</span>
          </div>

          <div className="nav-item">
            <span className="nav-icon">🏆</span>
            <span>certificate</span>
          </div>
        </nav>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="main-area">

        {/* TOP BAR (ASLI) */}
        <header className="top-bar">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search your lessons..." />
          </div>

          <div className="top-nav-actions">
            <button className="action-btn">🔔</button>
            <button className="action-btn">⚙️</button>

            <div className="profile-mini">
              <span className="user-name">Samsoro</span>
              <div className="avatar-small">👦</div>
            </div>
          </div>
        </header>

        <main className="content-container">

          {/* ================= HOME (TIDAK DIUBAH) ================= */}
          {page === "home" && (
            <>
              <header className="user-greeting-card">
                <div className="avatar-main">👦</div>
                <h1>Hi, Samsoro!</h1>
              </header>

              <section className="class-highlight">
                <h2 className="label-text">Today's class</h2>

                <div className="hero-card">
                  <div className="hero-img-wrapper">
                    <img
                      src="https://img.freepik.com/free-vector/cute-robot-working-laptop-cartoon-vector-icon-illustration_138676-5125.jpg"
                      alt="Robot"
                    />
                  </div>

                  <div className="hero-info">
                    <h3>Robotic Class</h3>
                    <p className="instructor">Mr. Ilham</p>

                    <div className="hero-meta">
                      <span>📅 April 17, 2026</span>
                      <span>🕒 09.00-11.00</span>
                    </div>
                  </div>

                  <button className="join-now-btn">Join class</button>
                </div>
              </section>

              <div className="dashboard-grid">
                <div className="grid-left-col">
                  <div className="status-row">

                    <div className="status-card locked">
                      <span className="icon-lock">🔒</span>
                      <h4>Teacher Feedback</h4>
                      <p>
                        Will be shown here after you complete the class
                      </p>
                    </div>

                    <div className="status-card locked">
                      <span className="icon-lock">📖</span>
                      <h4>Today's Material</h4>
                      <p>
                        Class material will be accessible after you join the class
                      </p>
                    </div>

                  </div>

                  <div className="progress-section">
                    <h4>Learning progress</h4>

                    <div className="progress-card-inner">
                      <img
                        src="https://img.freepik.com/free-vector/cute-robot-waving-hand-cartoon-vector-icon-illustration_138676-2244.jpg"
                        alt="Robot Icon"
                        className="mini-robot"
                      />

                      <div className="progress-details">
                        <div className="progress-header">
                          <strong>Robotic Class</strong>
                          <span>0%</span>
                        </div>

                        <p className="teacher-sub">Mr. Ilham</p>

                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill"></div>
                        </div>

                        <p className="no-progress-msg">🔒 No progress yet</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="certificate-sidebar locked">
                  <span className="big-lock">🔒</span>
                  <p>No Certificate yet</p>
                  <div className="trophy-silhouette">🏆</div>
                </div>
              </div>
            </>
          )}

          {/* ================= CLASSROOM PAGE ================= */}
          {page === "classroom" && (
            <div className="classroom-page">

              <div className="filter-tabs">
                <button className="tab">Yesterday</button>
                <button className="tab active">Today's</button>
                <button className="tab">Upcoming</button>
                <button className="tab active" style={{background:"#000"}}>
                  see all
                </button>
              </div>

              <div className="class-card">
                <div className="card-header bg-blue">
                  <span>Today's Class</span>
                  <span>📅 April 21, 2026</span>
                </div>

                <div className="card-body">
                  <h3>ROBOTIC CLASS</h3>
                  <div>👤 Mr. Ilham</div>

                  <p>
                    Material: Introduction to robot components,
                    assembly, and basic programming
                  </p>

                  <div className="card-footer">
                    <span>🕒 09:00 - 11:00 AM</span>
                    <button className="view-btn">Join class</button>
                  </div>
                </div>
              </div>
               {/* Card 2 - Next */}
                <div className="class-card">
                  <div className="card-header bg-pink">
                    <span>Next Class</span>
                    <span>📅 April 19, 2026</span>
                  </div>
                  <div className="card-body">
                    <div className="class-title-row">
                      <div className="info-main">
                        <h3>ROBOTIC CLASS</h3>
                        <div className="instructor-info">👤 Mr. Ilham</div>
                      </div>
                    </div>
                    <p className="material-text">
                      Material: Basic robotic logic, variables, and simple program development
                    </p>
                    <div className="card-footer">
                      <div className="time-info">🕒 10:00 - 12:00 AM</div>
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                </div>

                
                

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;