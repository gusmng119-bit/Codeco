import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Material.css";

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

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedClass } = useClassroomStore();
  const { materials, fetchMaterials } = useMaterialStore();

  const currentClass = selectedClass || {
    id: 3,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  useEffect(() => {
    fetchMaterials(currentClass.id);
  }, [currentClass.id, fetchMaterials]);

  const materialIdNum = id ? parseInt(id, 10) : null;
  const material = materials.find((m) => m.id === materialIdNum);

  if (!material) {
    return (
      <div className="material-page" style={{ padding: "40px", textAlign: "center" }}>
        <h3>Materi tidak ditemukan</h3>
        <button
          className="view-certificate-btn"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/student/material")}
        >
          ← Kembali ke Materi
        </button>
      </div>
    );
  }

  return (
    <div className="material-page">
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/student/material")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            color: "#64b5c1",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          ← Kembali ke Daftar Materi
        </button>
      </div>

      <div className="material-detail-card" style={{ position: "relative", width: "100%", maxWidth: "100%", boxShadow: "none", border: "1px solid #e2e8f0" }}>
        <div className="detail-header">
          <div className="icon-circle">
            <BookIcon />
          </div>
          <div>
            <h3>{material.title}</h3>
            <p>
              {material.date} • {material.progress} • {material.materialType || "PDF / Video"}
            </p>
          </div>
        </div>

        <div className="material-desc">
          <h4>Description:</h4>
          <p>{material.description || "Tidak ada deskripsi."}</p>
        </div>

        <a
          href={material.link}
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
    </div>
  );
};

export default MaterialDetail;
