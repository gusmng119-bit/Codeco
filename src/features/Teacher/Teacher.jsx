import { useState } from "react";
import "./Teacher.css";

import imagesari from "../../assets/Mrs. Sari.jpeg";
import imagecoki from "../../assets/coki.jpg";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const teachers = [
    { id: 1, name: "Mr. Coki", subject: "Robotic", img: imagecoki, ig: "coki_robotic", yt: "CokiRobotics" },
    { id: 2, name: "Mrs. Sari", subject: "Coding", img: imagesari, ig: "sari_coding", yt: "SariCodes" },
    {
      id: 3,
      name: "Mr. Budi",
      subject: "AI Basics",
      img: "https://img.freepik.com/free-photo/handsome-cheerful-young-indonesian-man-standing-blue-background_273609-28565.jpg",
    },
    {
      id: 4,
      name: "Ms. Lina",
      subject: "Web Dev",
      img: "https://img.freepik.com/free-photo/waist-up-portrait-smiling-indonesian-woman-celebrating-success_273609-44632.jpg",
    },
  ];

  /* ================= HELPER FUNCTIONS ================= */

  const getHonorific = (name) => {
    if (name.startsWith("Mr.")) return "Bapak";
    if (name.startsWith("Mrs.") || name.startsWith("Ms.")) return "Ibu";
    return "Pengajar";
  };

  const getLastName = (name) => {
    return name.split(" ").slice(1).join(" ");
  };

  /* ================= HANDLER ================= */

  const handleViewClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
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
          <span>🔍</span>
        </div>
      </header>

      {/* ================= GRID ================= */}
      <div className="teacher-grid">
        {teachers.map((t) => (
          <div className="teacher-card" key={t.id}>
            <div className="teacher-img-container">
              <img src={t.img} alt={t.name} />
            </div>

            <div className="teacher-info-card">
              <h4>{t.name}</h4>
              <p>{t.subject}</p>

              <button
                className="view-teacher-btn"
                onClick={() => handleViewClick(t)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedTeacher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>

            <div className="modal-body">
              <div className="modal-left">
                <img
                  src={selectedTeacher.img}
                  alt={selectedTeacher.name}
                  className="profile-img"
                />

                <div className="status-badge">Available</div>

                <div className="social-media">
                  <p><strong>Social Media</strong></p>
                  <ul>
                    <li>📸 @{selectedTeacher.ig || "teacher_ig"}</li>
                    <li>▶️ {selectedTeacher.yt || "TeacherYT"}</li>
                    <li>
                      🔗 linkedin.com/in/
                      {selectedTeacher.name
                        .toLowerCase()
                        .replace(/\s/g, "")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="modal-right">
                <h1>{selectedTeacher.name}</h1>

                <span className="role-tag">
                  {selectedTeacher.subject} Teacher
                </span>

                <div className="info-section">
                  <div className="info-item">
                    🎓 S1 Teknik Informatika
                  </div>

                  <div className="info-item">
                    📚 Mengajar {selectedTeacher.subject}
                  </div>
                </div>

                <hr />

                <div className="about-section">
                  <h3>Tentang {selectedTeacher.name}</h3>
                  <p>
                    {getHonorific(selectedTeacher.name)}{" "}
                    {getLastName(selectedTeacher.name)} adalah
                    pengajar {selectedTeacher.subject} dengan latar
                    belakang Teknik Informatika.
                  </p>
                </div>

                <button className="request-btn">
                  Request
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