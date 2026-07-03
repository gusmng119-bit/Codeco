import { useEffect } from "react";
import "./Material.css";

import logo2 from "@/assets/logo2.jpg";
import driveLogo from "@/assets/drive.png";
import useClassroomStore from "../../store/classroomStore";
import useMaterialStore from "../../store/materialStore";

const BookIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    <path d="M8 6h8" />
    <path d="M8 10h8" />
  </svg>
);

const ClassMaterial = () => {
  const { selectedClass } = useClassroomStore();
  const { materials, fetchMaterials, selectedMaterial, setSelectedMaterial } = useMaterialStore();

  const currentClass = selectedClass || {
    id: 3,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  useEffect(() => {
    fetchMaterials(currentClass.id);
  }, [currentClass.id, fetchMaterials]);

  return (
    <div className="material-page">
      <div className="material-header-banner">
        <div className="header-content">
          <h1>{currentClass.title}</h1>
          <p>{currentClass.instructor}</p>
        </div>
        <div className="header-robot-img">
          <img src={logo2} alt="Robot" />
        </div>
      </div>

      <h2 className="section-title">Materi Pembelajaran</h2>

      <div className="material-list">
        {materials.map((m) => (
          <div
            key={m.id}
            className={`material-item-card clickable ${
              selectedMaterial?.id === m.id ? "selected-topic" : ""
            }`}
            onClick={() => setSelectedMaterial(m)}
          >
            <div className="icon-wrapper">
              <BookIcon />
            </div>

            <div className="material-info">
              <div className="feedback-card-header">
                <h3>{m.title}</h3>
                <span className="feedback-date">{m.date}</span>
              </div>
              <p>
                Instructor: {m.instructor} • {m.progress} • {m.duration}
              </p>
            </div>
          </div>
        ))}

        {materials.length === 0 && (
          <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
            Belum ada materi untuk kelas ini.
          </p>
        )}
      </div>

      {selectedMaterial && (
        <div className="material-detail-card">
          <button className="close-btn" onClick={() => setSelectedMaterial(null)} type="button">
            ✕
          </button>

          <div className="detail-header">
            <div className="icon-circle">
              <BookIcon />
            </div>
            <div>
              <h3>{selectedMaterial.title}</h3>
              <p>
                {selectedMaterial.date} • {selectedMaterial.progress} •{" "}
                {selectedMaterial.materialType}
              </p>
            </div>
          </div>

          <div className="material-desc">
            <h4>Description:</h4>
            <p>{selectedMaterial.description}</p>
          </div>

          <a
            href={selectedMaterial.link}
            target="_blank"
            rel="noopener noreferrer"
            className="drive-box clickable"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img src={driveLogo} alt="Google Drive" />
              <div>
                <h4>Google Drive</h4>
                <p>PDF, PPT, VIDEO & DOCX</p>
              </div>
            </div>
            <span style={{ fontWeight: "600", color: "#4285f4" }}>Download →</span>
          </a>
        </div>
      )}

      {!selectedMaterial && (
        <div
          className="select-prompt-box"
          style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}
        >
          <p>Pilih salah satu topik di sebelah kiri untuk melihat detail materi.</p>
        </div>
      )}
    </div>
  );
};

export default ClassMaterial;