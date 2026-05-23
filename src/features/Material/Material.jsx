import React, { useState, useMemo } from "react";
import "./Material.css";

import logo2 from "@/assets/logo2.jpg";
import driveLogo from "@/assets/drive.png";

const ClassMaterial = ({ selectedClass }) => {

  /* ================= STATE ================= */
  const [selectedMaterial, setSelectedMaterial] =
    useState(null);

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

  const materialData = useMemo(() => ({

    /* ================= ROBOTIC ================= */
    "Robotic Class": [
      {
        id: 1,
        title:
          "Introduction to Robot Components",
        description:
          "Learn robot hardware, sensors, motors, and controller basics.",
        date: "April 19, 2026",
        progress: "1/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },

      {
        id: 2,
        title:
          "Basic Programming for Robots",
        description:
          "Understanding robot logic, movement commands, and automation.",
        date: "April 22, 2026",
        progress: "2/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },

      {
        id: 3,
        title:
          "Robot Movement and Control Systems",
        description:
          "Learn robot movement calibration and control systems.",
        date: "April 26, 2026",
        progress: "3/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },

      {
        id: 4,
        title:
          "Building Simple Robots",
        description:
          "Practice assembling simple autonomous robots.",
        date: "April 30, 2026",
        progress: "4/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },

      {
        id: 5,
        title:
          "Artificial Intelligence in Robotics",
        description:
          "Introduction to AI implementation inside robotic systems.",
        date: "May 4, 2026",
        progress: "5/5",
        instructor: "Mr. Ilham",
        link: driveLink,
      },
    ],

    /* ================= CODING ================= */
    "Coding Class": [
      {
        id: 1,
        title: "HTML Introduction",
        description:
          "Learn HTML structure and semantic elements.",
        date: "May 2, 2026",
        progress: "1/4",
        instructor: "Mrs. Sinta",
        link: driveLink,
      },

      {
        id: 2,
        title: "CSS Styling and Layout",
        description:
          "Learn Flexbox, Grid, and responsive layouts.",
        date: "May 5, 2026",
        progress: "2/4",
        instructor: "Mrs. Sinta",
        link: driveLink,
      },

      {
        id: 3,
        title: "JavaScript Basic",
        description:
          "Understand variables, functions, loops, and DOM.",
        date: "May 8, 2026",
        progress: "3/4",
        instructor: "Mrs. Sinta",
        link: driveLink,
      },

      {
        id: 4,
        title: "React Introduction",
        description:
          "Build simple interfaces using React components.",
        date: "May 12, 2026",
        progress: "4/4",
        instructor: "Mrs. Sinta",
        link: driveLink,
      },
    ],

    /* ================= AI ================= */
    "AI Class": [
      {
        id: 1,
        title:
          "Introduction to Artificial Intelligence",
        description:
          "Understand AI concepts and real-world implementation.",
        date: "May 10, 2026",
        progress: "1/3",
        instructor: "Mr. Budi",
        link: driveLink,
      },

      {
        id: 2,
        title:
          "Machine Learning Basic",
        description:
          "Learn supervised learning and model training.",
        date: "May 12, 2026",
        progress: "2/3",
        instructor: "Mr. Budi",
        link: driveLink,
      },

      {
        id: 3,
        title:
          "Deep Learning Introduction",
        description:
          "Introduction to neural networks and deep learning.",
        date: "May 15, 2026",
        progress: "3/3",
        instructor: "Mr. Budi",
        link: driveLink,
      },
    ],

  }), []);

  /* ================= CURRENT MATERIAL ================= */

  const materials =
    materialData[currentClass.title] || [];

  /* ================================================= */
  /* ================= DETAIL PAGE =================== */
  /* ================================================= */

  if (selectedMaterial) {

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

            <div className="icon-circle">
              📄
            </div>

            <div>

              <h2>
                {selectedMaterial.title}
              </h2>

              <p>
                {selectedMaterial.instructor}
                {" • "}
                {selectedMaterial.date}
              </p>

            </div>

          </div>

          <hr />

          {/* DESCRIPTION */}
          <p className="material-desc">
            {selectedMaterial.description}
          </p>

          {/* GOOGLE DRIVE */}
          <a
            href={selectedMaterial.link}
            target="_blank"
            rel="noreferrer"
            className="drive-box"
          >

            <div>

              <h3>
                File Drive
              </h3>

              <p>
                Open class material files
              </p>

            </div>

            <img
              src={driveLogo}
              alt="Drive"
            />

          </a>

        </div>

      </div>
    );
  }

  /* ================================================= */
  /* ================= LIST PAGE ===================== */
  /* ================================================= */

  return (

    <div className="material-page">

      {/* ================= HEADER ================= */}
      <div className="material-header-banner">

        <div className="header-content">

          <h1>
            {currentClass.title}
          </h1>

          <p>
            {currentClass.instructor}
          </p>

        </div>

        <div className="header-robot-img">

          <img
            src={logo2}
            alt="Robot Mascot"
          />

        </div>

      </div>

      {/* ================= TITLE ================= */}
      <h2 className="section-title">
        Materials
      </h2>

      {/* ================= EMPTY STATE ================= */}
      {materials.length === 0 ? (

        <div className="empty-material">

          <h3>
            No materials available
          </h3>

          <p>
            Please select a class first
          </p>

        </div>

      ) : (

        <div className="material-list">

          {materials.map((item) => (

            <div
              key={item.id}
              className="material-item-card clickable"
              onClick={() => setSelectedMaterial(item)}
            >

              <div className="icon-wrapper">
                📖
              </div>

              <div className="material-info">

                <h3>

                  {item.title}
                  {" "}
                  ({item.progress})

                </h3>

                <p>
                  {item.date}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ClassMaterial;