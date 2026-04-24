import React, { useState } from "react";
import "./Dashboard.css";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.jpg";
import imagesari from './assets/Mrs. Sari.jpeg';
import imagecoki from './assets/coki.jpg';
import profileImg from './assets/Profile.png';
import BannerImg from './assets/Baner.jpg';

const Home = ({ setPage }) => {
  return (
    <>
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
              <img src={logo2} alt="Robot Icon" className="mini-robot" />
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
  );
};

const Classroom = ({ filter, searchClass, onFilterChange, onSearchChange }) => {
  const classes = [
    { id: 1, title: "Coding for Kids", instructor: "Mr. Samsoro", material: "Basic HTML tags and structure", date: "2024-10-20", time: "13:00 - 15:00", type: "yesterday" },
    { id: 2, title: "Lego Class", instructor: "Mr. Ilham", material: "Robot assembly basics", date: "2024-10-21", time: "09:00 - 11:00", type: "today" },
    { id: 3, title: "Robotic Class", instructor: "Mr. Ilham", material: "Robotic logic intro", date: "2024-10-22", time: "10:00 - 12:00", type: "upcoming" },
    { id: 4, title: "AI Basics", instructor: "Mr. Budi", material: "AI fundamentals", date: "2024-10-23", time: "14:00 - 16:00", type: "upcoming" },
  ];

  const filteredClasses = classes.filter(c => 
    (filter === "all" || c.type === filter) &&
    (searchClass === "" || c.title.toLowerCase().includes(searchClass.toLowerCase()))
  );

  return (
    <div className="classroom-page">
      <div className="classroom-top-section">
        <div className="filter-tabs">
          {["yesterday", "today", "upcoming", "all"].map((t) => (
            <button 
              key={t}
              className={`tab ${filter === t ? "active" : ""}`}
              onClick={() => onFilterChange(t)}
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon-inside"></span>
        </div>
      </div>

      <div className="class-list">
        {filteredClasses.map((c) => (
          <div className="class-card" key={c.id}>
            <div className="card-header" style={{backgroundColor: c.type === 'today' ? '#A3E4F1' : c.type === 'upcoming' ? '#F8A5B2' : '#a29bfe'}}>
              <span>{c.type.charAt(0).toUpperCase() + c.type.slice(1)} Class</span>
              <span> {c.date}</span>
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
  );
};

const Teachers = ({ onViewTeacher }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const teachers = [
    { id: 1, name: "Mr. Coki", subject: "Robotic", img: imagecoki, ig: "coki_robotic", yt: "CokiRobotics" },
    { id: 2, name: "Mrs. Sari", subject: "Coding", img: imagesari, ig: "sari_coding", yt: "SariCodes" },
    { id: 3, name: "Mr. Budi", subject: "AI Basics", img: "https://img.freepik.com/free-photo/handsome-cheerful-young-indonesian-man-standing-blue-background_273609-28565.jpg" },
    { id: 4, name: "Ms. Lina", subject: "Web Dev", img: "https://img.freepik.com/free-photo/waist-up-portrait-smiling-indonesian-woman-celebrating-success_273609-44632.jpg" },
  ];

  const handleViewClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
    onViewTeacher && onViewTeacher(teacher); // Callback if needed
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  return (
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
              <h4>{t.name}</h4>
              <p>{t.subject}</p>
              <button className="view-teacher-btn" onClick={() => handleViewClick(t)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTeacher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <div className="modal-left">
                <div className="profile-img-box">
                  <img src={selectedTeacher.img} alt={selectedTeacher.name} />
                </div>
                <div className="status-badge">Available</div>
                <div className="social-media">
                  <p><strong>Sosial Media</strong></p>
                  <ul>
                    <li>📸 @{selectedTeacher.ig || "teacher_ig"}</li>
                    <li>▶️ {selectedTeacher.yt || "TeacherYT"}</li>
                    <li>🔗 linkedin.com/in/{selectedTeacher.name.toLowerCase().replace(' ', '')}</li>
                    <li>📱 @{selectedTeacher.name.toLowerCase().replace(' ', '')}</li>
                  </ul>
                </div>
              </div>
              <div className="modal-right">
                <div className="modal-header-info">
                  <h1>{selectedTeacher.name}</h1>
                  <span className="role-tag">{selectedTeacher.subject} Teacher</span>
                </div>
                <div className="info-section">
                  <div className="info-item">
                    <span className="icon">🎓</span>
                    <div>
                      <p className="label">Pendidikan Terakhir</p>
                      <p className="value">S1 Teknik Informatika</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="icon">📚</span>
                    <div>
                      <p className="label">Mengajar</p>
                      <p className="value">{selectedTeacher.subject}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="about-section">
                  <h3>Tentang {selectedTeacher.name}</h3>
                  <p>Pak {selectedTeacher.name.split(' ')[1]} adalah pengajar {selectedTeacher.subject} dengan latar belakang Teknik Informatika.</p>
                </div>
                <button className="request-btn">Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Certificates = () => {
  const certificates = [
    { className: "Robotic Beginner", instructor: "Mr. Ilham", date: "2024-10-01", image: "https://via.placeholder.com/300x200/64b5c1/ffffff?text=Robotic+Cert" },
    { className: "Coding Basics", instructor: "Mrs. Sari", date: "2024-09-25", image: "https://via.placeholder.com/300x200/a29bfe/ffffff?text=Coding+Cert" },
  ];

  return (
    <div className="cert-page">
      <header className="cert-header">
        <div className="cert-title-area">
          <h2>My Certificates</h2>
          <p>All achievements you've earned</p>
          <div className="cert-count-badge">2</div>
        </div>
        <div className="search-box-cert">
          <input type="text" placeholder="search" />
          <span className="search-icon">🔍</span>
        </div>
      </header>
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <div className="cert-card" key={index}>
            <div className="cert-img-wrapper">
              <img src={cert.image} alt="Certificate" />
            </div>
            <div className="cert-info">
              <h3>{cert.className}</h3>
              <p className="instructor">{cert.instructor}</p>
              <div className="cert-date">
                <span className="calendar-icon">📅</span>
                {cert.date}
              </div>
              <button className="view-cert-btn">
                <span>View Certificate</span>
                <span className="arrow-icon">❯</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = ({ setPage }) => {
  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner">
        <img src={BannerImg} alt="Banner" />
      </div>

      <div className="profile-content">

        {/* BACK BUTTON */}
        <button onClick={() => setPage("home")}>
          ⬅ Back
        </button>

        {/* Avatar */}
        <div className="avatar-wrapper">
  <div className="avatar-circle">
    <img src={profileImg} alt="Profile" />
    <button className="edit-avatar-btn">✎</button>
  </div>
</div>

        <h1 className="profile-title">My profile</h1>

        {/* Personal Information */}
        <div className="info-card">
          <div className="card-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>First name</label>
              <p>Buidiono</p>
            </div>

            <div className="info-item">
              <label>Last name</label>
              <p>Putrosono</p>
            </div>

            <div className="info-item">
              <label>Email</label>
              <p>BudionoPutrosono@gmail.com</p>
            </div>

            <div className="info-item">
              <label>Phone</label>
              <p>+628132567999</p>
            </div>

            <div className="info-item full-width">
              <label>Bio</label>
              <p>STIKOM BALI!! "Always The First"</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="info-card">
          <div className="card-header">
            <h3>Address</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Country</label>
              <p>Indonesia</p>
            </div>

            <div className="info-item">
              <label>City/Province</label>
              <p>Denpasar</p>
            </div>

            <div className="info-item full-width">
              <label>Street Address</label>
              <p>Jl. Tukad Balian No.45</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Dashboard = () => {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("today");
  const [searchClass, setSearchClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "classroom":
        return <Classroom filter={filter} searchClass={searchClass} onFilterChange={setFilter} onSearchChange={setSearchClass} />;
      case "teacher":
        return <Teachers onViewTeacher={handleViewTeacher} />;
      case "certificate":
        return <Certificates />;
      case "profile":
        return <Profile setPage={setPage} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo1} alt="Codeco Logo" className="brand-logo-img-standalone" />
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>
            <span className="nav-icon">🏠</span>
            <span>home</span>
          </div>
          <div className={`nav-item ${page === "classroom" ? "active" : ""}`} onClick={() => setPage("classroom")}>
            <span className="nav-icon">📖</span>
            <span>class room</span>
          </div>
          <div className={`nav-item ${page === "teacher" ? "active" : ""}`} onClick={() => setPage("teacher")}>
            <span className="nav-icon">🎓</span>
            <span>teacher</span>
          </div>
          <div className={`nav-item ${page === "certificate" ? "active" : ""}`} onClick={() => setPage("certificate")}>
            <span className="nav-icon">🏆</span>
            <span>certificate</span>
          </div>
        </nav>
      </aside>
      <div className="main-area">
        
        <main className="content-container">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

