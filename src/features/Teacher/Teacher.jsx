import { useState } from "react";
import "./Teacher.css";

import imagesari from "@/assets/mrs-sari.jpeg";
import imagecoki from "@/assets/coki.jpg";

const Teachers = () => {
  /* ================= STATE ================= */
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");
  const [requestedTeachers, setRequestedTeachers] = useState([]);

  /* ================= DATA ================= */
  const teachers = [
    {
      id: 1,
      name: "Mr. Ilham",
      subject: "Robotic",
      img: imagecoki,
      education: "S1 Teknik Informatika",
      teaching: "Robotic",
      about:
        "Pak Ilham adalah pengajar Robotic dengan pengalaman pembelajaran berbasis praktik.",
      ig: "IlhamGanteng11",
      yt: "IlhamRobotic",
      linkedin: "linkedin.com/in/ilham",
      tiktok: "@ilhamsirobot",
    },
    {
      id: 2,
      name: "Mrs. Sari",
      subject: "Coding",
      img: imagesari,
      education: "S1 Sistem Informasi",
      teaching: "Programming",
      about:
        "Ibu Sari fokus pada pembelajaran coding interaktif.",
      ig: "sari_coding",
      yt: "SariCodes",
      linkedin: "linkedin.com/in/sari",
      tiktok: "@saricode",
    },
  ];

  /* ================= SEARCH ================= */
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= MODAL ================= */
  const handleViewClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  /* ================= REQUEST ================= */
  const handleRequestTeacher = (e) => {
    e.stopPropagation(); // agar klik tombol tidak menutup modal
    if (!selectedTeacher) return;

    if (requestedTeachers.includes(selectedTeacher.id)) return;

    setRequestedTeachers((prev) => [...prev, selectedTeacher.id]);

    setNotification(`✅ Request sent successfully to ${selectedTeacher.name}`);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="teacher-page">

      {/* ===== NOTIFICATION ===== */}
      {notification && (
        <div className="request-notification">
          {notification}
        </div>
      )}

      {/* ===== HEADER ===== */}
      <header className="teacher-header">
        <h2>Our Teachers</h2>

        <div className="search-box-cert">
          <input
            type="text"
            placeholder="Search teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </header>

      {/* ===== GRID ===== */}
      <div className="teacher-grid">
        {filteredTeachers.map((t) => (
          <div className="teacher-card" key={t.id}>
            <img src={t.img} alt={t.name} />

            <div className="teacher-info">
              <h4>{t.name}</h4>
              <p>{t.subject}</p>

              <button onClick={() => handleViewClick(t)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && selectedTeacher && (
        <div className="teacher-modal-overlay" onClick={closeModal}>
          <div
            className="teacher-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="teacher-modal-body">

              {/* ===== LEFT ===== */}
              <div className="modal-left">

                <div className="teacher-photo-frame">
                  <img src={selectedTeacher.img} alt={selectedTeacher.name} />
                </div>

                <div className="status-available">
                  Available
                </div>

                <div className="social-section">
                  <h4>Sosial Media</h4>
                  <p>📸 @{selectedTeacher.ig}</p>
                  <p>▶ {selectedTeacher.yt}</p>
                  <p>🔗 {selectedTeacher.linkedin}</p>
                  <p>🎵 {selectedTeacher.tiktok}</p>
                </div>

              </div>

              {/* ===== RIGHT ===== */}
              <div className="modal-right">

                <h1>{selectedTeacher.name}</h1>

                <span className="teacher-role">
                  {selectedTeacher.subject} Teacher
                </span>

                <div className="info-list">

                  <div className="info-box">
                    <span>🎓</span>
                    <div>
                      <p>Pendidikan Terakhir</p>
                      <strong>{selectedTeacher.education}</strong>
                    </div>
                  </div>

                  <div className="info-box">
                    <span>📚</span>
                    <div>
                      <p>Mengajar</p>
                      <strong>{selectedTeacher.teaching}</strong>
                    </div>
                  </div>

                </div>

                <hr />

                <div className="about-teacher">
                  <h3>Tentang {selectedTeacher.name}</h3>
                  <p>{selectedTeacher.about}</p>
                </div>

                {/* ✅ REQUEST BUTTON */}
                <button
                  className="request-button"
                  onClick={handleRequestTeacher}
                  disabled={requestedTeachers.includes(selectedTeacher.id)}
                >
                  {requestedTeachers.includes(selectedTeacher.id)
                    ? "Requested"
                    : "Request"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Teachers;
