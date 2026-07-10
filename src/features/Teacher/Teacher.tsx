import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./Teacher.css";

import useTeacherStore from "@/store/teacherStore";
import type { TeacherItem } from "@/api/types/features";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";

const Teachers = () => {
  /* ================= STORE (Zustand) ================= */
  const {
    teachers,
    selectedTeacher,
    showModal,
    searchTerm,
    notification,
    loading,
    error,
    setSearchTerm,
    setSelectedTeacher,
    setShowModal,
    fetchTeachers,
    requestTeacher,
  } = useTeacherStore();

  /* ================= LOCAL STATE (bukan data) ================= */
  const [requestedTeachers, setRequestedTeachers] = useState<number[]>([]);

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

  /* ================= REQUEST ================= */
  const handleRequestTeacher = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedTeacher) return;
    if (requestedTeachers.includes(selectedTeacher.id)) return;

    setRequestedTeachers((prev) => [...prev, selectedTeacher.id]);
    requestTeacher();

    setTimeout(() => {
      // notification is handled by the store
    }, 3000);
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

        <div className="search-box-teacher">
          <input
            type="text"
            placeholder="Search teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon-teacher">
            <Search size={16} />
          </span>
        </div>
      </header>

      {/* ===== GRID / FALLBACKS ===== */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          <p>Loading teachers from backend...</p>
        </div>
      )}

      {!loading && error && (
        <ErrorState
          title="Unable to load teachers list"
          message={error}
          onRetry={fetchTeachers}
        />
      )}

      {!loading && !error && filteredTeachers.length === 0 && (
        <EmptyState
          title="No Teachers Found"
          message="No teachers match your search query."
          icon="🎓"
        />
      )}

      {!loading && !error && filteredTeachers.length > 0 && (
        <div className="teacher-grid">
          {filteredTeachers.map((t, index) => (
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
      )}

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
