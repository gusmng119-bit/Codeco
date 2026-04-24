import React, { useState } from "react";
import "./Dashboard.css";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.jpg";

const Dashboard = () => {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState(""); 

  const teachers = [
    { id: 1, name: "Mr. Ilham", subject: "Robotic", img: "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg" },
    { id: 2, name: "Mrs. Sari", subject: "Coding", img: "https://img.freepik.com/free-photo/young-happy-indonesian-businessman-using-smartphone-office_273609-3713.jpg" },
    { id: 3, name: "Mr. Budi", subject: "AI Basics", img: "https://img.freepik.com/free-photo/handsome-cheerful-young-indonesian-man-standing-blue-background_273609-28565.jpg" },
    { id: 4, name: "Ms. Lina", subject: "Web Dev", img: "https://img.freepik.com/free-photo/waist-up-portrait-smiling-indonesian-woman-celebrating-success_273609-44632.jpg" },
  ];

  const classes = [
    { id: 1, title: "CODING FOR KIDS", instructor: "Mr. Samsoro", material: "Basic HTML tags and structure", date: "2026-04-20", time: "13:00 - 15:00 PM", type: "yesterday" },
    { id: 2, title: "CODING FOR KIDS", instructor: "Mr. Samsoro", material: "Basic HTML tags and structure", date: "2026-04-20", time: "13:00 - 15:00 PM", type: "yesterday" },
    { id: 3, title: "Lego CLASS", instructor: "Mr. Ilham", material: "Introduction to robot components, assembly, and programming", date: "2026-04-21", time: "09:00 - 11:00 AM", type: "today" },
    { id: 4, title: "ROBOTIC CLASS", instructor: "Mr. Ilham", material: "Introduction to robot components, assembly, and programming", date: "2026-04-21", time: "09:00 - 11:00 AM", type: "today" },
    { id: 5, title: "Lego CLASS", instructor: "Mr. Ilham", material: "Basic robotic logic and variables", date: "2026-04-19", time: "10:00 - 12:00 AM", type: "upcoming" },
    { id: 6, title: "ROBOTIC CLASS", instructor: "Mr. Ilham", material: "Basic robotic logic and variables", date: "2026-04-19", time: "10:00 - 12:00 AM", type: "upcoming" },
  ];

  const filteredClasses = classes.filter(c => 
    (filter === "all" || c.type === filter) &&
    (searchClass === "" || c.title.toLowerCase().includes(searchClass.toLowerCase()))
  );

  return (
    <div className="dashboard-wrapper">
      
      <aside className="sidebar">
        <div className="logo-section">
          <img 
            src={logo1} 
            alt="Codeco Logo" 
            className="brand-logo-img-standalone" 
          />
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

          <div 
            className={`nav-item ${page === "teacher" ? "active" : ""}`}
            onClick={() => setPage("teacher")}
          >
            <span className="nav-icon">🎓</span>
            <span>teacher</span>
          </div>

          <div 
            className={`nav-item ${page === "certificate" ? "active" : ""}`}
            onClick={() => setPage("certificate")}
          >
            <span className="nav-icon">🏆</span>
            <span>certificate</span>
          </div>
        </nav>
      </aside>
      <div className="main-area">
        
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
                    <img src={logo2} alt="Robotic Class" />
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
                      <p>Will be shown here after you complete the class</p>
                    </div>
                    <div className="status-card locked">
                      <span className="icon-lock">📖</span>
                      <h4>Today's Material</h4>
                      <p>Class material will be accessible after you join the class</p>
                    </div>
                  </div>

                  <div className="progress-section">
                    <h4>Learning progress</h4>
                    <div className="progress-card-inner">
                      <img src="https://img.freepik.com/free-vector/cute-robot-waving-hand-cartoon-vector-icon-illustration_138676-2244.jpg" alt="Robot Icon" className="mini-robot" />
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

          {page === "classroom" && (
            <div className="classroom-page">
              <div className="classroom-top-section">
                <div className="filter-tabs">
                  {["yesterday", "today", "upcoming", "all"].map((t) => (
                    <button 
                      key={t}
                      className={`tab ${filter === t ? "active" : ""}`}
                      onClick={() => setFilter(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="classroom-search">
                  <input 
                    type="text" 
                    placeholder="Search class..." 
                    value={searchClass}
                    onChange={(e) => setSearchClass(e.target.value)}
                  />
                  <span className="search-icon-inside">🔍</span>
                </div>
              </div>

              <div className="class-list">
                {filteredClasses.map((c) => (
                  <div className="class-card" key={c.id}>
                    <div className="card-header" style={{backgroundColor: c.type === 'today' ? '#A3E4F1' : c.type === 'upcoming' ? '#F8A5B2' : '#a29bfe'}}>
                      <span>{c.type.charAt(0).toUpperCase() + c.type.slice(1)} Class</span>
                      <span>📅 {c.date}</span>
                    </div>
                    <div className="card-body">
                      <h3>{c.title}</h3>
                      <div>👤 {c.instructor}</div>
                      <p>{c.material}</p>
                      <div className="card-footer">
                        <span>🕒 {c.time}</span>
                        <button className="view-btn">{c.type === 'today' ? 'Join class' : 'View'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {page === "teacher" && (
            <div className="teacher-page">
              <header className="teacher-header">
                <h2>Our Teachers</h2>
                <div className="search-box-teacher">
                  <input type="text" placeholder="search" />
                  <span className="search-icon-btn">🔍</span>
                </div>
              </header>

              <div className="teacher-grid">
                {teachers.map((t) => (
                  <div className="teacher-card" key={t.id}>
                    <div className="teacher-img-container">
                      <img src={t.img} alt={t.name} />
                    </div>
                    <div className="teacher-info-card">
                      <h4>{t.subject}</h4>
                      <p>{t.name}</p>
                      <button className="view-teacher-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {page === "certificate" && (
            <div className="certificate-page">
              <div style={{padding: '40px', textAlign: 'center'}}>
                <h2>My Certificates</h2>
                <p>No certificates earned yet. Complete your classes to unlock certificates! 🏆</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;

