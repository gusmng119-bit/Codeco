import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreateClass.css";
import useClassroomStore from "@/store/classroomStore";
import useAuthStore from "@/store/authStore";
import profile from "@/assets/mrs-sari.jpeg";
import logo2 from "@/assets/logo2.jpg";

// ==========================================
// --- SVG ICONS ---
// ==========================================
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4fb2be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fb2be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

// ==========================================
// --- MAIN COMPONENT ---
// ==========================================
const CreateClass = () => {
  const user = useAuthStore((state) => state.user);
  const { createClass, loading, error } = useClassroomStore();
  const location = useLocation();
  const navigate = useNavigate();
  const classData = location.state?.classData;

  const [activeTab, setActiveTab]       = useState("materials");
  const [meetingLink, setMeetingLink]   = useState("");
  const [materialNote, setMaterialNote] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError]   = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const getClassDate = (title?: string) => {
    if (!title) return "April 30, 2026";
    const cleanTitle = title.trim();
    if (cleanTitle.startsWith("Robotic")) return "April 30, 2026";
    if (cleanTitle.startsWith("Programming")) return "April 21, 2026";
    if (cleanTitle.startsWith("Science")) return "April 22, 2026";
    if (cleanTitle.startsWith("Design")) return "April 24, 2026";
    return "April 30, 2026";
  };

  const handleFileValidationAndAdd = (files: FileList) => {
    const valid: File[] = [];
    let errMsg = "";
    Array.from(files).forEach((file) => {
      if (file.size > 100 * 1024 * 1024) {
        errMsg = `File "${file.name}" melebihi batas maksimal 100MB.`;
        return;
      }
      valid.push(file);
    });
    if (errMsg) setUploadError(errMsg);
    else setUploadError("");
    if (valid.length > 0) setUploadedFiles((prev) => [...prev, ...valid]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFileValidationAndAdd(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileValidationAndAdd(e.dataTransfer.files);
  };

  const removeFile = (idx: number) => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleCreateClassSubmit = async () => {
    const result = await createClass({
      name: classData?.title || "New Class",
      total_sessions: 5,
      price: 750000,
    });
    if (result) {
      alert(`Kelas berhasil disimpan dengan ${uploadedFiles.length} file materi!`);
    }
  };

  return (
    <div className="create-class-page">
      {/* TOP BAR */}
      <div className="cc-top-bar">
        <div className="cc-profile-group">
          <img src={profile} alt="profile" className="cc-profile-avatar" />
          <div className="cc-profile-text">
            <h2 className="cc-welcome-text">Hi, {user?.name ?? "Teacher"}!</h2>
            <p className="cc-sub-text">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="cc-section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="cc-back-btn" onClick={() => navigate("/teacher/classes")} type="button">
            <ArrowLeftIcon />
          </button>
          <h3 className="cc-main-title">My Classes</h3>
        </div>
        <button className="cc-save-btn" onClick={handleCreateClassSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Class"}
        </button>
      </div>

      {error && <p style={{ color: "#ef4444", marginBottom: "12px" }}>⚠️ {error}</p>}

      {/* HERO CARD */}
      <div className="cc-hero-card">
        <div className="cc-hero-left">
          <h1 className="cc-class-name-placeholder">{classData ? `${classData.title} Class` : "Classes Name"}</h1>
          <div className="cc-meta-info-group" style={{ marginTop: '20px' }}>
            <div className="cc-meta-item"><ClockIcon /><span>{classData?.time || "time"}</span></div>
            <div className="cc-meta-item"><CalendarIcon /><span>{getClassDate(classData?.title)}</span></div>
          </div>
        </div>
        <div className="cc-hero-right">
          <img src={logo2} alt="Robot Illustration" className="cc-robot-img" />
        </div>
      </div>

      {/* TABS */}
      <div className="cc-tabs-container">
        <div className="cc-tabs-nav">
          <button className={`cc-tab-btn ${activeTab === "materials" ? "active" : ""}`} onClick={() => setActiveTab("materials")}>
            Link &amp; Materials
          </button>
          <button className={`cc-tab-btn ${activeTab === "students" ? "active" : ""}`} onClick={() => setActiveTab("students")}>
            Students
          </button>
        </div>

        <div className="cc-tab-content">
          {activeTab === "materials" && (
            <div className="cc-materials-panel">
              <div className="cc-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <label className="cc-form-label" style={{ margin: 0 }}>Link Meeting</label>
                  <button 
                    className="cc-edit-link-btn" 
                    type="button"
                    onClick={() => linkInputRef.current?.focus()}
                  >
                    ✏️ Edit
                  </button>
                </div>
                <input 
                  type="text" 
                  className="cc-form-input" 
                  placeholder="Meet,zoom and Microsoft Teams" 
                  value={meetingLink} 
                  onChange={(e) => setMeetingLink(e.target.value)} 
                  ref={linkInputRef}
                />
              </div>

              <div className="cc-form-group">
                <label className="cc-form-label">Materials</label>
                <input 
                  type="text" 
                  className="cc-form-input" 
                  placeholder="PDF,PPT,DOCX and Gdrive" 
                  value={materialNote} 
                  onChange={(e) => setMaterialNote(e.target.value)} 
                />
              </div>

              <div className="cc-upload-zone" onClick={() => fileInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} style={{ cursor: "pointer" }}>
                <div className="cc-upload-inner">
                  <UploadIcon />
                  <div className="cc-upload-text-group">
                    <p className="cc-upload-main-text">
                      <span className="cc-link-highlight">Drag &amp; drop files here</span> or <span className="cc-link-highlight">click to upload</span>
                    </p>
                    <p className="cc-upload-sub-text">PDF, PPT, DOCX, Video (Max 100MB)</p>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} multiple />
              </div>

              {uploadError && <p className="cc-upload-error-msg">{uploadError}</p>}

              {uploadedFiles.length > 0 && (
                <div className="cc-file-list-container">
                  <h4 className="cc-file-list-title">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="cc-file-list">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="cc-file-item">
                        <div className="cc-file-item-left">
                          <FileTextIcon />
                          <div className="cc-file-details">
                            <span className="cc-file-name">{file.name}</span>
                            <span className="cc-file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>
                        </div>
                        <button type="button" className="cc-file-remove-btn" onClick={(e) => { e.stopPropagation(); removeFile(index); }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "students" && (
            <div className="cc-students-panel">
              <p className="cc-empty-tab-text">no student's in the class</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
