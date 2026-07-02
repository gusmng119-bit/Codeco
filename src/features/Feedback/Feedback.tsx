import { useState } from "react";
import "./Feedback.css";

import logo2 from "@/assets/logo2.jpg";
import feedbackImg from "@/assets/feedback.png";
import useClassroomStore from "../../store/classroomStore";

interface FeedbackItem {
  id: number;
  title: string;
  date: string;
  progress: string;
  instructor: string;
  feedback: string;
}

const Feedback = () => {
  const { selectedClass } = useClassroomStore();
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null);

  const currentClass = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  const feedbackData: Record<string, FeedbackItem[]> = {
    robotic: [
      {
        id: 1,
        title: "Introduction to robot components, assembly, and basic programming",
        date: "April 19, 2026",
        progress: "1/5",
        instructor: "Mr. Ilham",
        feedback:
          "You're doing a great job understanding the basics of robotics. I like how you're starting to connect the concepts clearly. Try to notice how robots are used around you in real life. Keep it up, your foundation is getting stronger.",
      },
      {
        id: 2,
        title: "Basic Programming for Robots",
        date: "April 22, 2026",
        progress: "2/5",
        instructor: "Mr. Ilham",
        feedback:
          "You are grasping movement loops well. Just make sure to double check wire connectivity during serial setup next time.",
      },
      {
        id: 3,
        title: "Robot Movement and Control Systems",
        date: "April 25, 2026",
        progress: "3/5",
        instructor: "Mr. Ilham",
        feedback:
          "Wonderful results calibrating motors. Try exploring diagonal path algorithms.",
      },
      {
        id: 4,
        title: "Robot Design and Construction",
        date: "April 28, 2026",
        progress: "4/5",
        instructor: "Mr. Ilham",
        feedback:
          "Robust structural build. Solid chassis configuration.",
      },
      {
        id: 5,
        title: "Robotics Project Presentation",
        date: "May 2, 2026",
        progress: "5/5",
        instructor: "Mr. Ilham",
        feedback:
          "Excellent showcase. Great automation logic demonstration.",
      },
    ],
  };

  const key = currentClass.title.toLowerCase().includes("coding") ? "coding" : "robotic";
  const feedbacks = feedbackData[key] || feedbackData.robotic;

  return (
    <div className="feedback-page">
      {/* HEADER BANNER */}
      <div className="feedback-header-banner">
        <div className="feedback-header-content">
          <h1>{currentClass.title}</h1>
          <p>{currentClass.instructor}</p>
        </div>
        <div className="feedback-robot-img">
          <img src={logo2} alt="Robot" />
        </div>
      </div>

      {/* SECTION TITLE */}
      <h2 className="feedback-section-title">Teacher Feedback</h2>

      {/* LIST OF FEEDBACK */}
      <div className="feedback-list">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className={`feedback-item-card ${
              selectedItem?.id === item.id ? "selected-feedback" : ""
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <div className="feedback-icon-wrapper">
              <span className="feedback-icon">📝</span>
            </div>

            <div className="feedback-info">
              <div className="feedback-card-header">
                <h3>{item.title}</h3>
                <span className="feedback-date">{item.date}</span>
              </div>
              <p className="feedback-preview">
                Instructor: {item.instructor} • Progress: {item.progress}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL PREVIEW (overlay seperti gambar) */}
      {selectedItem && (
        <div className="feedback-detail-overlay">
          <div className="teacher-feedback-card">
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              ✕
            </button>

            <div className="feedback-detail-header">
              <div className="feedback-icon-teal">📝</div>
              <div className="feedback-detail-heading">
                <h3>{selectedItem.title}</h3>
                <p>
                  {selectedItem.instructor} <span className="dot">•</span> {selectedItem.date}
                </p>
              </div>
            </div>

            <div className="detail-divider" />

            <div className="feedback-image">
              <img src={feedbackImg} alt="Feedback" />
            </div>

            <div className="feedback-text-section">
              <p>{selectedItem.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;