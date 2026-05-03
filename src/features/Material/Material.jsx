import React, { useState } from "react";
import "./Material.css";
import logo2 from "../../assets/logo2.jpg";
import driveLogo from "../../assets/drive.png";

const ClassMaterial = () => {

  /* ================= STATE ================= */
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const driveLink =
  "https://drive.google.com/drive/folders/1IfJRHWldYcFOalWyduftC4_mg-Vq7UTF?usp=drive_link";

const materials = [
  {
    id: 1,
    title:
      "Introduction to robot components, assembly, and basic programming",
    date: "April 19, 2026",
    progress: "1/5",
    instructor: "Mr. Ilham",
    link: driveLink,
  },
  {
    id: 2,
    title:
      "Basic Programming for Robots (Using Sensors and Actuators)",
    date: "April 22, 2026",
    progress: "2/5",
    instructor: "Mr. Ilham",
    link: driveLink,
  },
  {
    id: 3,
    title: "Robot Movement and Control Systems",
    date: "April 26, 2026",
    progress: "3/5",
    instructor: "Mr. Ilham",
    link: driveLink,
  },
  {
    id: 4,
    title: "Design and Building Simple Robots",
    date: "April 30, 2026",
    progress: "4/5",
    instructor: "Mr. Ilham",
    link: driveLink,
  },
  {
    id: 5,
    title: "Artificial Intelligence in Robotics",
    date: "May 4, 2026",
    progress: "5/5",
    instructor: "Mr. Ilham",
    link: driveLink,
  },

  ];

  /* ================= DETAIL MATERIAL ================= */
  if (selectedMaterial !== null) {
    return (
      <div className="material-page">

        <div className="material-detail-card">

          {/* CLOSE BUTTON */}
          <button
            className="close-btn"
            onClick={() => setSelectedMaterial(null)}
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="detail-header">
            <div className="icon-circle">📄</div>

            <div>
              <h2>{selectedMaterial.title}</h2>
              <p>
                {selectedMaterial.instructor} • {selectedMaterial.date}
              </p>
            </div>
          </div>

          <hr />

          <p className="material-desc">
            Please study this material
          </p>

          {/* GOOGLE DRIVE CARD */}
          <a
            href={selectedMaterial.link}
            target="_blank"
            rel="noreferrer"
            className="drive-box"
          >
            <div>
              <h3>File Drive</h3>
              <p>{selectedMaterial.link}</p>
            </div>

            <img src={driveLogo} alt="Drive" />
          </a>

        </div>

      </div>
    );
  }

  /* ================= LIST MATERIAL ================= */
  return (
    <div className="material-page">

      {/* HEADER */}
      <div className="material-header-banner">
        <div className="header-content">
          <h1>Robotic Class</h1>
          <p>Mr. Ilham</p>
        </div>

        <div className="header-robot-img">
          <img src={logo2} alt="Robot Mascot" />
        </div>
      </div>

      <h2 className="section-title">Materials</h2>

      {/* CARD LIST */}
      <div className="material-list">
        {materials.map((item) => (
          <div
            key={item.id}
            className="material-item-card clickable"
            onClick={() => setSelectedMaterial(item)}
          >
            <div className="icon-wrapper">📖</div>

            <div className="material-info">
              <h3>
                {item.title} ({item.progress})
              </h3>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClassMaterial;