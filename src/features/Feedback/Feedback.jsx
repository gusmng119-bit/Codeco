import React, { useState } from "react";
import "./Feedback.css";
import logo2 from "../../assets/logo2.jpg";
import feedbackImg from "../../assets/feedback.png";

const Feedback = () => {

  /* ================= STATE ================= */
  const [selectedItem, setSelectedItem] = useState(null);

  const materials = [
    {
      id: 1,
      title:
        "Introduction to robot components, assembly, and basic programming",
      date: "April 17, 2024",
      progress: "1/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback:
        "You're doing a great job understanding the basics of robotics. Keep connecting concepts to real-life applications!",
    },
    {
      id: 2,
      title:
        "Basic Programming for Robots (Sensors and Actuators)",
      date: "April 19, 2024",
      progress: "2/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback:
        "Nice progress on sensors and actuators. Practice more programs to build confidence.",
    },
    {
      id: 3,
      title: "Robot Movement and Control Systems",
      date: "April 26, 2024",
      progress: "3/5",
      instructor: "Mr. Ilham",
      link: "https://drive.google.com/",
      feedback:
        "Great work implementing PID controller and movement logic!",
    },
  ];

  /* ================= DETAIL PAGE ================= */
  if (selectedItem) {
    return (
      <div className="feedback-page">

        <div className="teacher-feedback-card">

          {/* CLOSE */}
          <button
            className="close-btn"
            onClick={() => setSelectedItem(null)}
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="feedback-detail-header">
            <div className="feedback-icon-teal">📄</div>

            <div>
              <h2>{selectedItem.title}</h2>
              <p>
                {selectedItem.instructor} • {selectedItem.date}
              </p>
            </div>
          </div>

          <hr />

          {/* IMAGE */}
          <div className="feedback-image">
            <img src={feedbackImg} alt="Feedback" />
          </div>

          {/* FEEDBACK TEXT */}
          <div className="feedback-text-section">
            <p>{selectedItem.feedback}</p>
          </div>

          {/* DRIVE LINK */}
         
        </div>

      </div>
    );
  }

  /* ================= LIST PAGE ================= */
  return (
    <div className="feedback-page">

      {/* HEADER */}
      <div className="feedback-header-banner">
        <div className="feedback-header-content">
          <h1>Robotics Class Feedback</h1>
          <p>Mr. Ilham</p>
        </div>

        <div className="feedback-robot-img">
          <img src={logo2} alt="Robot Mascot" />
        </div>
      </div>

      <h2 className="feedback-section-title">
        Class Feedback
      </h2>

      {/* LIST */}
      <div className="feedback-list">
        {materials.map((item) => (
          <div key={item.id} className="feedback-item-card">

            <div className="feedback-icon-wrapper">
              <span className="feedback-icon">📋</span>
            </div>

            <div className="feedback-info">
              <div className="feedback-card-header">
                <h3>
                  {item.title} ({item.progress})
                </h3>
                <p className="feedback-date">
                  {item.date}
                </p>
              </div>

              <p className="feedback-preview">
                {item.feedback.substring(0, 120)}...
              </p>

              <div className="feedback-view-more">
                <span
                  className="feedback-view-btn"
                  onClick={() => setSelectedItem(item)}
                >
                  View feedback
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Feedback;