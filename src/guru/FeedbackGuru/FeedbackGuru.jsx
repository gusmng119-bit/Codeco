import React, { useState } from 'react';
import './FeedbackGuru.css'; 

// --- Ikon SVG Terbawa Sebelumnya ---
const ClockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const InfoIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>;

// --- Ikon Baru untuk Keperluan Modal (Sesuai Gambar Mockup) ---
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

const FeedbackGuru = () => {
  // State untuk mengontrol buka/tutup modal & menyimpan data siswa yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const students = [
    {
      id: 1,
      name: 'Samsoro',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Samsoro1',
      status: 'Belum diisi',
      statusType: 'pending'
    },
    {
      id: 2,
      name: 'Budiono',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Budiono',
      status: 'Belum diisi',
      statusType: 'pending'
    },
    {
      id: 3,
      name: 'Samsoro',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Samsoro2',
      status: 'Selesai',
      statusType: 'success',
      filledTime: 'Diisi: 17 April 2026, 12.40 PM'
    }
  ];

  // Fungsi untuk membuka modal sesuai siswa yang diklik
  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setFeedbackText(""); // Reset text field atau bisa diisi data jika status 'success'
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveFeedback = () => {
    console.log(`Feedback untuk ${selectedStudent.name}: ${feedbackText}`);
    // Taruh integrasi API simpan data di sini jika diperlukan nanti
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Edit Profile
        </button>
      </div>

      {/* --- DASHBOARD SECTION CONTENT --- */}
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

      {/* --- MAIN INTERFACE SELECTION & LIST --- */}
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

      {/* ======================================================
          MODAL POP-UP PANEL (AKTIF SAAT BUTTON DIKLIK)
         ====================================================== */}
      {isModalOpen && selectedStudent && (
        <div className="fb-modal-overlay" onClick={handleCloseModal}>
          <div className="fb-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Modal */}
            <div className="fb-modal-header">
              <h2 className="fb-modal-title">Beri Feedback</h2>
              <button className="fb-modal-close-btn" onClick={handleCloseModal}>
                <CloseIcon />
              </button>
            </div>

            {/* Identitas Siswa */}
            <div className="fb-modal-student-profile">
              <img 
                src={selectedStudent.avatar} 
                alt={selectedStudent.name} 
                className="fb-modal-avatar"
              />
              <span className="fb-modal-student-name">{selectedStudent.name}</span>
            </div>

            {/* Form Input Body */}
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
                <div className="fb-modal-upload-wrapper">
                  <input type="text" className="fb-modal-upload-input" placeholder="Masukan foto..." readOnly />
                  <button className="fb-modal-upload-btn">
                    <UploadCloudIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="fb-modal-footer">
              <button className="fb-btn-cancel" onClick={handleCloseModal}>Batal</button>
              <button className="fb-btn-submit" onClick={handleSaveFeedback}>Simpan Feedback</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FeedbackGuru;