import React, { useState } from 'react';
import './CreateClass.css';

// Ikon SVG presisi sesuai gambar
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4fb2be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const CreateClass = () => {
  const [activeTab, setActiveTab] = useState('materials');

  return (
    <div className="create-class-page">
      {/* --- TOP PROFILE HEADER BAR --- */}
      <div className="cc-top-bar">
        <div className="cc-profile-group">
          <div className="cc-avatar-placeholder">👨‍💻</div>
          <h2 className="cc-welcome-text">Hi, Mr.Ilham!</h2>
        </div>
      </div>

      {/* --- SECTION TITLE WITH ACTION BUTTON --- */}
      <div className="cc-section-header">
        <h3 className="cc-main-title">My Classes</h3>
        <button className="cc-save-btn">Create Class</button>
      </div>

      {/* --- MAIN HERO CARD INFO --- */}
      <div className="cc-hero-card">
        <div className="cc-hero-left">
          <h1 className="cc-class-name-placeholder">Classes Name</h1>
          <p className="cc-grade-placeholder">Grade Level</p>
          
          <div className="cc-meta-info-group">
            <div className="cc-meta-item">
              <ClockIcon />
              <span>time</span>
            </div>
            <div className="cc-meta-item">
              <CalendarIcon />
              <span>dd-mm-yy</span>
            </div>
          </div>
        </div>
        
        <div className="cc-hero-right">
          {/* Menggunakan ilustrasi robot 3D publik yang mirip dengan mockup */}
          <img 
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300" 
            alt="Robot Illustration" 
            className="cc-robot-img"
          />
        </div>
      </div>

      {/* --- TABS NAVIGATOR STRIP --- */}
      <div className="cc-tabs-container">
        <div className="cc-tabs-nav">
          <button 
            className={`cc-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Link & Materials
          </button>
          <button 
            className={`cc-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>

        {/* --- TAB CONTENT INNER BOX --- */}
        <div className="cc-tab-content">
          {activeTab === 'materials' && (
            <div className="cc-materials-panel">
              
              {/* Link Meeting Input Field */}
              <div className="cc-form-group">
                <label className="cc-form-label">Link Meeting</label>
                <input 
                  type="text" 
                  className="cc-form-input" 
                  placeholder="Meet, zoom and Microsoft Teams" 
                />
              </div>

              {/* Materials Input Field */}
              <div className="cc-form-group">
                <label className="cc-form-label">Materials</label>
                <input 
                  type="text" 
                  className="cc-form-input" 
                  placeholder="PDF, PPT, DOCX and Gdrive" 
                />
              </div>

              {/* Drag & Drop File Upload Area */}
              <div className="cc-upload-zone">
                <div className="cc-upload-inner">
                  <UploadIcon />
                  <div className="cc-upload-text-group">
                    <p className="cc-upload-main-text">
                      <span className="cc-link-highlight">Drag & drop files here</span> or <span className="cc-link-highlight">click to upload</span>
                    </p>
                    <p className="cc-upload-sub-text">PDF, PPT, DOCX, Video (Max 100MB)</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'students' && (
            <div className="cc-students-panel">
              <p className="cc-empty-tab-text">Daftar siswa akan muncul di sini.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CreateClass;