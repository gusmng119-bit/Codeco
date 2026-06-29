import React, { useState } from 'react';
import './FeedbackGuru.css'; 

// ==========================================
// --- REUSABLE SVG ICONS COMPONENT ---
// ==========================================
const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="16" y2="12"/>
    <line x1="12" x2="12.01" y1="8" y2="8"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" x2="6" y2="18" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

// ==========================================
// --- MAIN COMPONENT ---
// ==========================================
const FeedbackGuru = () => {
  // --- STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // --- MOCK DATA ---
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Samsoro',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Samsoro1',
      status: 'Belum diisi',
      statusType: 'pending',
      feedback: ''
    },
    {
      id: 2,
      name: 'Budiono',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Budiono',
      status: 'Belum diisi',
      statusType: 'pending',
      feedback: ''
    },
    {
      id: 3,
      name: 'Samsoro',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Samsoro2',
      status: 'Selesai',
      statusType: 'success',
      filledTime: 'Diisi: 17 April 2026, 12.40 PM',
      feedback: 'Kerja bagus! Pemahaman materi logika kodingnya sudah sangat matang.'
    }
  ]);

  // --- HANDLERS ---
  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setFeedbackText(student.feedback || ""); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setFeedbackText("");
    setSelectedImage(null);
    setErrorMessage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
    setSelectedImage(file); // Hanya menyimpan object file untuk kebutuhan kirim API/Log
  };

  const handleSaveFeedback = () => {
    if (!feedbackText.trim()) return;

    console.log("=== DATA FEEDBACK DISIMPAN ===");
    console.log("ID Siswa    :", selectedStudent.id);
    console.log("Nama Siswa  :", selectedStudent.name);
    console.log("Isi Feedback:", feedbackText);
    console.log("Nama Gambar :", selectedImage ? selectedImage.name : "Tidak ada file");

    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, status: 'Selesai', statusType: 'success', feedback: feedbackText, filledTime: 'Baru saja diperbarui' }
          : student
      )
    );

    handleCloseModal();
  };

  return (
    <div className="feedback-page">
      
      {/* --- TOP PROFILE HEADER BAR --- */}
      <div className="feedback-top-bar">
        <div className="profile-info-group">
          <div className="avatar-placeholder">👨‍💻</div>
          <h2 className="welcome-text">Hi, Mr.Ilham!</h2>
        </div>
        <button className="edit-profile-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
          Edit Profile
        </button>
      </div>

      {/* --- DASHBOARD SECTION --- */}
      <div className="feedback-dashboard-card">
        <div className="feedback-dashboard-inner">
          <div className="left-alert-panel">
            <h3 className="section-title-main">Feedback Dashboard</h3>
            <div className="deadline-alert-box">
              <div className="alert-icon-wrapper">
                <ClockIcon />
              </div>
              <div className="alert-text-wrapper">
                <p className="alert-title">Deadline feedback <span className="highlight-red">1 hari setelah kelas berakhir</span></p>
                <p className="alert-subtitle">Pastikan semua feedback diisi tepat waktu untuk mendapatkan salary</p>
              </div>
            </div>
          </div>
          <div className="right-counter-panel">
            <p className="counter-label">Feedback Tertunda</p>
            <p className="counter-number">2</p>
            <p className="counter-status-text">Perlu diisi</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTAINER --- */}
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
            <span>Kelas berakhir: sabtu, 17 April 2026, 11:40 AM</span>
          </div>
          <div className="info-right-text">
            <span>Batas feedback: Senin, 19 April 2026, 11:00</span>
            <span className="badge-countdown">Deadline: 1 hari 8 jam</span>
          </div>
        </div>

        {/* --- DAFTAR SISWA --- */}
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
                  <span className={`status-badge badge-${student.statusType}`}>
                    {student.status}
                  </span>
                  <div className="action-button-group">
                    {student.statusType === 'pending' ? (
                      <button 
                        className="action-btn-feedback"
                        onClick={() => handleOpenModal(student)}
                      >
                        Beri Feedback
                      </button>
                    ) : (
                      <div className="completed-action-wrapper">
                        <button 
                          className="action-btn-edit"
                          onClick={() => handleOpenModal(student)}
                        >
                          Lihat / Edit
                        </button>
                        {student.filledTime && (
                          <span className="filled-timestamp-text">{student.filledTime}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL POP-UP --- */}
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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                {errorMessage && <p className="upload-error">{errorMessage}</p>}
              </div>
              {/* Box Preview Gambar sudah dihapus secara permanen dari sini */}
            </div>

            <div className="fb-modal-footer">
              <button type="button" className="fb-btn-cancel" onClick={handleCloseModal}>
                Batal
              </button>
              <button 
                type="button" 
                className="fb-btn-submit" 
                onClick={handleSaveFeedback}
                disabled={!feedbackText.trim()}
              >
                Simpan Feedback
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackGuru;