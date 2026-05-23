import React, { useState } from "react";
import "./Feedback.css";

import logo2 from "@/assets/logo2.jpg";
import feedbackImg from "@/assets/feedback.png";

const Feedback = ({ selectedClass }) => {

  /* ================================================= */
  /* ================= STATE ========================= */
  /* ================================================= */

  const [selectedItem, setSelectedItem] =
    useState(null);

  /* ================================================= */
  /* ================= FEEDBACK DATA ================= */
  /* ================================================= */

  const feedbackData = {

    /* ================= ROBOTIC ================= */

    robotic: [

      {
        id: 1,

        title:
          "Introduction to robot components, assembly, and programming",

        date: "April 19, 2026",

        progress: "1/5",

        instructor: "Mr. Ilham",

        feedback:
          "Excellent understanding of basic robot components. Your assembly process is already very neat and structured. Keep practicing programming logic to improve robot response accuracy.",
      },

      {
        id: 2,

        title:
          "Basic Programming for Robots",

        date: "April 22, 2026",

        progress: "2/5",

        instructor: "Mr. Ilham",

        feedback:
          "Good progress in using sensors and actuators. Try to optimize your conditional logic so the robot movement becomes smoother and more responsive.",
      },

      {
        id: 3,

        title:
          "Robot Movement and Control Systems",

        date: "April 26, 2026",

        progress: "3/5",

        instructor: "Mr. Ilham",

        feedback:
          "You are starting to understand robot control systems very well. Continue practicing movement calibration and motor synchronization for better stability.",
      },
    ],

    /* ================= CODING ================= */

    coding: [

      {
        id: 1,

        title: "HTML Introduction",

        date: "May 2, 2026",

        progress: "1/4",

        instructor: "Mrs. Sinta",

        feedback:
          "Great job understanding basic HTML structure. Your semantic tags usage is already correct and easy to read.",
      },

      {
        id: 2,

        title: "CSS Styling and Layout",

        date: "May 5, 2026",

        progress: "2/4",

        instructor: "Mrs. Sinta",

        feedback:
          "Your CSS layout is improving significantly. Try using Flexbox and Grid more often to create responsive designs.",
      },

      {
        id: 3,

        title: "JavaScript Basic",

        date: "May 8, 2026",

        progress: "3/4",

        instructor: "Mrs. Sinta",

        feedback:
          "Very good understanding of variables and functions. Continue practicing DOM manipulation and event handling.",
      },
    ],

    /* ================= AI ================= */

    ai: [

      {
        id: 1,

        title:
          "Introduction to Artificial Intelligence",

        date: "May 10, 2026",

        progress: "1/3",

        instructor: "Mr. Budi",

        feedback:
          "You already understand the basic concept of Artificial Intelligence very well. Continue exploring real-world AI implementation examples.",
      },

      {
        id: 2,

        title:
          "Machine Learning Basic",

        date: "May 12, 2026",

        progress: "2/3",

        instructor: "Mr. Budi",

        feedback:
          "Excellent progress in understanding machine learning workflow. Focus more on data training and model evaluation.",
      },
    ],
  };

  /* ================================================= */
  /* ================= CURRENT DATA ================== */
  /* ================================================= */

  let feedbackKey = "";

  if (
    selectedClass?.title
      ?.toLowerCase()
      .includes("robot")
  ) {

    feedbackKey = "robotic";

  } else if (
    selectedClass?.title
      ?.toLowerCase()
      .includes("coding")
  ) {

    feedbackKey = "coding";

  } else if (
    selectedClass?.title
      ?.toLowerCase()
      .includes("ai")
  ) {

    feedbackKey = "ai";
  }

  const materials =
    feedbackData[feedbackKey] || [];

  /* ================================================= */
  /* ================= DETAIL PAGE =================== */
  /* ================================================= */

  if (selectedItem) {

    return (

      <div className="feedback-page">

        <div className="teacher-feedback-card">

          {/* CLOSE BUTTON */}

          <button
            className="close-btn"
            onClick={() =>
              setSelectedItem(null)
            }
          >
            ✕
          </button>

          {/* HEADER */}

          <div className="feedback-detail-header">

            <div className="feedback-icon-teal">
              📄
            </div>

            <div>

              <h2>
                {selectedItem.title}
              </h2>

              <p>
                {selectedItem.instructor}
                {" • "}
                {selectedItem.date}
              </p>

            </div>

          </div>

          <hr />

          {/* IMAGE */}

          <div className="feedback-image">

            <img
              src={feedbackImg}
              alt="Feedback"
            />

          </div>

          {/* FEEDBACK TEXT */}

          <div className="feedback-text-section">

            <p>
              {selectedItem.feedback}
            </p>

          </div>

        </div>

      </div>
    );
  }

  /* ================================================= */
  /* ================= LIST PAGE ===================== */
  /* ================================================= */

  return (

    <div className="feedback-page">

      {/* ================= HEADER ================= */}

      <div className="feedback-header-banner">

        <div className="feedback-header-content">

          <h1>
            {selectedClass?.title ||
              "No Class"}
          </h1>

          <p>
            {selectedClass?.instructor ||
              "-"}
          </p>

        </div>

        <div className="feedback-robot-img">

          <img
            src={logo2}
            alt="Robot Mascot"
          />

        </div>

      </div>

      {/* ================= TITLE ================= */}

      <h2 className="feedback-section-title">
        Class Feedback
      </h2>

      {/* ================= EMPTY ================= */}

      {materials.length === 0 ? (

        <p>No feedback available</p>

      ) : (

        <div className="feedback-list">

          {materials.map((item) => (

            <div
              key={item.id}
              className="feedback-item-card"
            >

              {/* ICON */}

              <div className="feedback-icon-wrapper">

                <span className="feedback-icon">
                  📋
                </span>

              </div>

              {/* CONTENT */}

              <div className="feedback-info">

                <div className="feedback-card-header">

                  <h3>
                    {item.title}
                    {" "}
                    ({item.progress})
                  </h3>

                  <p className="feedback-date">
                    {item.date}
                  </p>

                </div>

                <p className="feedback-preview">

                  {item.feedback.substring(
                    0,
                    120
                  )}
                  ...

                </p>

                <div className="feedback-view-more">

                  <span
                    className="feedback-view-btn"
                    onClick={() =>
                      setSelectedItem(item)
                    }
                  >
                    View feedback
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Feedback;