import React, { useState, useEffect } from "react";
import "./Feedback.css";
import logo2 from "../../assets/logo2.jpg";

const Feedback = ({ setPage }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const materials = [
    { 
        id: 1, 
        title: "Introduction to robot components, assembly, and basic programming", 
        date: "April 17, 2024", 
        progress: "1/5",
        instructor: "Mr. Ilham",
        link: "#", 
        feedback: "You're doing a great job understanding the basics of robotics. Keep connecting concepts to real-life applications!"
    },
    { 
        id: 2, 
        title: "Basic Programming for Robots (Sensors and Actuators)", 
        date: "April 19, 2024", 
        progress: "2/5",
        instructor: "Mr. Ilham",
        link: "#", 
        feedback: "Nice progress on sensors/actuators. Practice more programs to build confidence."
    },
    { 
        id: 3, 
        title: "Robot Movement and Control Systems", 
        date: "April 26, 2024", 
        progress: "3/5",
        instructor: "Mr. Ilham",
        link: "#", 
        feedback: "Great work implementing PID controller and movement logic!"
    },
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [selectedItem]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setSelectedItem(null);
  };

  return (
    <div className="feedback-page">
      {/* MODAL DETAIL */}
      {selectedItem && (
        <div className="feedback-modal-overlay" onClick={handleOverlayClick}>
          <div className="feedback-detail-card">
            <button 
              className="feedback-close-btn" 
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="feedback-detail-header">
              <div className="feedback-icon-teal">📋</div>
              <div className="feedback-title-group">
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.instructor} • {selectedItem.date}</p>
              </div>
            </div>

            <hr className="feedback-divider" />
            
            <div className="feedback-detail-body">
              <p className="feedback-instruction">Study feedback &amp; materials:</p>
              
              <div className="feedback-drive-container">
                <div className="feedback-drive-left">
                  <span className="feedback-drive-label">Material Link</span>
                  <span className="feedback-drive-url">{selectedItem.link || 'Contact instructor for materials'}</span>
                </div>
                <div className="feedback-drive-right">
                  📁
                </div>
              </div>

              <div className="feedback-text-section">
                <h4>Teacher Feedback:</h4>
                <p>{selectedItem.feedback}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="feedback-header-banner">
        <div className="feedback-header-content">
          <h1>Robotics Class Feedback</h1>
          <p>Mr. Ilham</p>
        </div>

        <div className="feedback-robot-img">
          <img src={logo2} alt="Robot Mascot" />
        </div>
      </div>

      <h2 className="feedback-section-title">Class Feedback</h2>

      {/* FEEDBACK LIST */}
      <div className="feedback-list">
        {materials.map((item) => (
          <div key={item.id} className="feedback-item-card">
            <div className="feedback-icon-wrapper">
              <span className="feedback-icon">📋</span>
            </div>

            <div className="feedback-info">
              <div className="feedback-card-header">
                <h3>{item.title} ({item.progress})</h3>
                <p className="feedback-date">{item.date}</p>
              </div>
              
              <p className="feedback-preview">
                {item.feedback.substring(0, 150)}...
              </p>
              
              <div className="feedback-view-more">
                <span 
                  className="feedback-view-btn" 
                  onClick={() => setSelectedItem(item)}
                >
                  View feedback &amp; materials
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

