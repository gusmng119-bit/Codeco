import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Material.css";

import logo2 from "@/assets/logo2.jpg";
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
            className="material-item-card clickable"
            onClick={() => navigate(`/student/material/${m.id}`)}
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
    </div>
  );
};

export default ClassMaterial;