import React, { useEffect, useState, type ChangeEvent } from "react";
import "./FeedbackTeacher.css";
import useTeacherFeedbackStore from "@/store/teacherFeedbackStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";
import useAuthStore from "@/store/authStore";

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="16" y2="12" />
    <line x1="12" x2="12.01" y1="8" y2="8" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const FeedbackTeacher = () => {
  const user = useAuthStore((state) => state.user);
  const { students, loading, error, fetchStudents, saveFeedback } = useTeacherFeedbackStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? null;
  const pendingCount = students.filter((s) => s.statusType === "pending").length;

  const handleOpenModal = (id: number) => {
    const student = students.find((s) => s.id === id);
    if (!student) return;
    setSelectedStudentId(id);
    setFeedbackText(student.feedback || "");
    setSelectedImage(null);
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
    setFeedbackText("");
    setSelectedImage(null);
    setErrorMessage("");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setErrorMessage("Ukuran gambar maksimal 1 MB");
      setSelectedImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("File harus berupa gambar");
      setSelectedImage(null);
      return;
    }

    setErrorMessage("");
    setSelectedImage(file);
  };

  const handleSaveFeedback = () => {
    if (!feedbackText.trim() || selectedStudentId === null) return;
    saveFeedback(selectedStudentId, feedbackText);
    handleCloseModal();
  };

  return (
    <div className="feedback-page">
      <div className="feedback-top-bar">
        <div className="profile-info-group">
          <div className="avatar-placeholder"></div>
          <h2 className="welcome-text">Hi, {user?.name ?? "Teacher"}!</h2>
        </div>
      </div>

      <div className="feedback-dashboard-card">
        <div className="feedback-dashboard-inner">
          <div className="left-alert-panel">
            <h3 className="section-title-main">Feedback Dashboard</h3>
            <div className="deadline-alert-box">
              <div className="alert-icon-wrapper"><ClockIcon /></div>
              <div className="alert-text-wrapper">
                <p className="alert-title">
                  Deadline feedback <span className="highlight-red">1 hari setelah kelas berakhir</span>
                </p>
                <p className="alert-subtitle">Pastikan semua feedback diisi tepat waktu untuk mendapatkan salary</p>
              </div>
            </div>
          </div>
          <div className="right-counter-panel">
            <p className="counter-label">Feedback Tertunda</p>
            <p className="counter-number">{pendingCount}</p>
            <p className="counter-status-text">Perlu diisi</p>
          </div>
        </div>
      </div>

      <div className="feedback-main-container">
        <div className="class-selector-group">
          <label className="selector-label">Pilih Kelas</label>
          <div className="select-wrapper">
            <select className="class-dropdown-select" defaultValue="default">
              <option value="default">Kelas Coding Dasar - Sabtu, 17 April 2026</option>
            </select>
          </div>
        </div>

        <div className="info-deadline-banner">
          <div className="info-left-text">
            <InfoIcon />
            <span>Kelas berakhir: Sabtu, 17 April 2026, 11:40 AM</span>
          </div>
          <div className="info-right-text">
            <span>Batas feedback: Senin, 19 April 2026, 11:00</span>
            <span className="badge-countdown">Deadline: 1 hari 8 jam</span>
          </div>
        </div>

        {loading && (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            <p>Loading students...</p>
          </div>
        )}

        {!loading && error && (
          <ErrorState title="Unable to load students" message={error} onRetry={fetchStudents} />
        )}

        {!loading && !error && students.length === 0 && (
          <EmptyState title="No Students" message="Belum ada siswa di kelas ini." icon="👥" />
        )}

        {!loading && !error && students.length > 0 && (
          <div className="students-list-wrapper">
            <h4 className="list-title">Daftar Siswa</h4>
            <div className="list-container">
              {students.map((student) => (
                <div key={student.id} className="student-row-card">
                  <div className="student-left-info">
                    <span className="row-index-number">{student.id}</span>
                    <img src={student.avatar} alt={student.name} className="student-avatar-img" />
                    <span className="student-name-text">{student.name}</span>
                  </div>
                  <div className="student-right-actions">
                    <span className={`status-badge badge-${student.statusType}`}>{student.status}</span>
                    <div className="action-button-group">
                      {student.statusType === "pending" ? (
                        <button className="action-btn-feedback" onClick={() => handleOpenModal(student.id)}>
                          Beri Feedback
                        </button>
                      ) : (
                        <div className="completed-action-wrapper">
                          <button className="action-btn-edit" onClick={() => handleOpenModal(student.id)}>
                            Lihat / Edit
                          </button>
                          {student.filledTime && <span className="filled-timestamp-text">{student.filledTime}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fb-modal-overlay" onClick={handleCloseModal}>
          <div className="fb-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="fb-modal-header">
              <h2 className="fb-modal-title">Beri Feedback</h2>
              <button className="fb-modal-close-btn" onClick={handleCloseModal}>
                <CloseIcon />
              </button>
            </div>

            <div className="fb-modal-student-profile">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="fb-modal-avatar" />
              <span className="fb-modal-student-name">{selectedStudent.name}</span>
            </div>

            <div className="fb-modal-body">
              <div className="fb-modal-field-group">
                <label className="fb-modal-label">Feedback</label>
                <textarea
                  className="fb-modal-textarea"
                  placeholder="Tulis feedback untuk siswa..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>

              <div className="fb-modal-field-group">
                <label className="fb-modal-label">Tambahkan Gambar (Maksimal 1 MB)</label>
                <div className="fb-modal-upload-wrapper">
                  <input
                    type="text"
                    className="fb-modal-upload-input"
                    placeholder="Pilih gambar..."
                    value={selectedImage ? selectedImage.name : ""}
                    readOnly
                  />
                  <label className="fb-modal-upload-btn">
                    <UploadCloudIcon />
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  </label>
                </div>
                {errorMessage && <p className="upload-error">{errorMessage}</p>}
              </div>
            </div>

            <div className="fb-modal-footer">
              <button type="button" className="fb-btn-cancel" onClick={handleCloseModal}>
                Batal
              </button>
              <button type="button" className="fb-btn-submit" onClick={handleSaveFeedback} disabled={!feedbackText.trim()}>
                Simpan Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTeacher;