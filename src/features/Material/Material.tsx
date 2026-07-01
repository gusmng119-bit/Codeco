import { useState, useMemo } from "react";
import "./Material.css";

import logo2 from "@/assets/logo2.jpg";
import driveLogo from "@/assets/drive.png";
import useClassroomStore from "../../store/classroomStore";

const ClassMaterial = () => {
  const { selectedClass } = useClassroomStore();
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  /* ================= DEFAULT CLASS ================= */
  const currentClass = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  /* ================= DRIVE LINK ================= */
  const driveLink =
    "https://drive.google.com/drive/folders/1IfJRHWldYcFOalWyduftC4_mg-Vq7UTF?usp=drive_link";

  /* ================================================= */
  /* ================= MATERIAL DATA ================= */
  /* ================================================= */

  const materialData = useMemo<Record<string, any[]>>(() => ({
    "Robotic Class": [
      {
        id: 1,
        title: "Introduction to Robot Components",
        description: "Learn robot hardware, sensors, motors, and controller basics.",
        date: "April 19, 2026",
        progress: "1/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
      {
        id: 2,
        title: "Basic Programming for Robots",
        description: "Understanding robot logic, movement commands, and automation.",
        date: "April 22, 2026",
        progress: "2/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
      {
        id: 3,
        title: "Robot Movement and Control Systems",
        description: "Learn robot movement calibration and control systems.",
        date: "April 25, 2026",
        progress: "3/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
      {
        id: 4,
        title: "Robot Design and Construction",
        description: "Calibrating and designing robot chassis and frame mechanisms.",
        date: "April 28, 2026",
        progress: "4/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
      {
        id: 5,
        title: "Robotics Project Presentation",
        description: "Showcasing and testing your completed robotics automation projects.",
        date: "May 2, 2026",
        progress: "5/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
    ],
  }), []);

  const materials = materialData[currentClass.title] || [];

  return (
    <div className="material-container">
      {/* HEADER SECTION */}
      <header className="class-header-material">
        <div className="header-info-material">
          <h1>{currentClass.title}</h1>
          <p>{currentClass.instructor}</p>
        </div>
      </header>

      {/* DETAILED CONTENT SECTION */}
      <section className="detail-section">
        {/* LEFT COLUMN: LIST OF TOPICS */}
        <div className="topics-list-col">
          <div className="list-header-material">
            <h3>Topik materi</h3>
          </div>

          <div className="topics-scroll-area">
            {materials.map((m) => (
              <div
                key={m.id}
                className={`topic-card ${
                  selectedMaterial?.id === m.id ? "selected-topic" : ""
                }`}
                onClick={() => setSelectedMaterial(m)}
              >
                <div className="card-top-row">
                  <span className="date-tag">{m.date}</span>
                  <span className="session-progress">{m.progress}</span>
                </div>
                <h4>{m.title}</h4>
                <p className="inst-sub">Instructor: {m.instructor}</p>
              </div>
            ))}

            {materials.length === 0 && (
              <p style={{ textAlign: "center", color: "#64748b", padding: "20px" }}>
                Belum ada materi untuk kelas ini.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL PREVIEW OF SELECTED TOPIC */}
        <div className="material-preview-col">
          {selectedMaterial ? (
            <div className="preview-inner-box">
              <div className="preview-header-row">
                <span className="prev-date">{selectedMaterial.date}</span>
              </div>

              <div className="robot-banner-card">
                <img src={logo2} alt="Robot banner" className="banner-logo" />
                <div className="banner-text-details">
                  <h3>{selectedMaterial.title}</h3>
                  <p className="prev-inst">Instructor: {selectedMaterial.instructor}</p>
                </div>
              </div>

              <div className="desc-box">
                <h4>Description:</h4>
                <p>{selectedMaterial.description}</p>
              </div>

              <div className="attachment-card">
                <div className="drive-details">
                  <img src={driveLogo} alt="Google Drive logo" className="gdrive-logo" />
                  <div>
                    <h4>Google drive</h4>
                    <p>PDF, PPT, VIDEO &amp; DOCX</p>
                  </div>
                </div>
                <a
                  href={selectedMaterial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-anchor-btn"
                >
                  Download materi
                </a>
              </div>
            </div>
          ) : (
            <div className="select-prompt-box">
              <p>Pilih salah satu topik di sebelah kiri untuk melihat detail materi.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClassMaterial;
