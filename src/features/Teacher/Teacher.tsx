import { useEffect } from "react";
import "./Teacher.css";
import useTeacherStore from "../../store/teacherStore";
import type { TeacherItem } from "../../api/types/features";

const Teachers = () => {
  const {
    teachers,
    selectedTeacher,
    showModal,
    searchTerm,
    notification,
    loading,
    setSearchTerm,
    setSelectedTeacher,
    setShowModal,
    fetchTeachers,
    requestTeacher,
  } = useTeacherStore();

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (teacher: TeacherItem) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="teacher-page">
      {/* ===== NOTIFICATION ===== */}
      {notification && (
        <div className="request-notification">{notification}</div>
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
        {loading && <p>Loading teachers...</p>}

        {!loading &&
          filteredTeachers.map((t, index) => (
            <div className="teacher-card" key={`${t.id}-${index}`}>
              <img src={t.img} alt={t.name} />

              <div className="teacher-info">
                <h4>{t.name}</h4>
                <p>{t.subject}</p>

                <button onClick={() => handleViewClick(t)}>View</button>
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
                  <img src={selectedTeacher.img} alt="teacher" />
                </div>

                <div className="status-available">Available</div>

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

                <button
                  className="request-button"
                  onClick={() => requestTeacher()}
                >
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
