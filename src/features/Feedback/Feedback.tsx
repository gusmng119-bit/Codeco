import { useState } from "react";
import "./Feedback.css";

import logo2 from "@/assets/logo2.jpg";
import feedbackImg from "@/assets/feedback.png";
import useClassroomStore from "../../store/classroomStore";

const Feedback = () => {
  const { selectedClass } = useClassroomStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const currentClass = selectedClass || {
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  const feedbackData: Record<string, any[]> = {
    robotic: [
      {
        id: 1,
        title: "Introduction to robot components, assembly, and programming",
        date: "April 19, 2026",
        progress: "1/5",
        instructor: "Mr. Ilham",
        feedback:
          "Excellent understanding of basic robot components. Your assembly process is already very neat and structured. Keep practicing programming logic to improve robot response accuracy.",
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

  // Safe fallback to robotic class feedback if not found
  const key = currentClass.title.toLowerCase().includes("coding") ? "coding" : "robotic";
  const feedbacks = feedbackData[key] || feedbackData.robotic;

  return (
    <div className="feedback-container">
      {/* HEADER SECTION */}
      <header className="class-header-feedback">
        <div className="header-info-feedback">
          <h1>{currentClass.title}</h1>
          <p>{currentClass.instructor}</p>
        </div>
      </header>

      {/* DETAILED CONTENT SECTION */}
      <section className="detail-section-feedback">
        {/* LEFT COLUMN: LIST OF FEEDBACK ITEMS */}
        <div className="feedbacks-list-col">
          <div className="list-header-feedback">
            <h3>Feedback</h3>
          </div>

          <div className="feedbacks-scroll-area">
            {feedbacks.map((item) => (
              <div
                key={item.id}
                className={`feedback-card-item ${
                  selectedItem?.id === item.id ? "selected-feedback" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="card-top-row">
                  <span className="date-tag">{item.date}</span>
                  <span className="session-progress">{item.progress}</span>
                </div>
                <h4>{item.title}</h4>
                <p className="inst-sub">Instructor: {item.instructor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW OF SELECTED FEEDBACK */}
        <div className="feedback-preview-col">
          {selectedItem ? (
            <div className="preview-inner-box">
              <div className="preview-header-row">
                <span className="prev-date">{selectedItem.date}</span>
              </div>

              <div className="robot-banner-card">
                <img src={logo2} alt="Robot logo" className="banner-logo" />
                <div className="banner-text-details">
                  <h3>{selectedItem.title}</h3>
                  <p className="prev-inst">Instructor: {selectedItem.instructor}</p>
                </div>
              </div>

              <div className="feedback-desc-box">
                <h4>Feedback:</h4>
                <p>{selectedItem.feedback}</p>
              </div>

              <div className="feedback-visual-card">
                <div className="feedback-visual-details">
                  <img src={feedbackImg} alt="Feedback illustration logo" className="feedback-ill-logo" />
                  <div>
                    <h4>Review completed</h4>
                    <p>Verified by {selectedItem.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="select-prompt-box">
              <p>Pilih salah satu feedback di sebelah kiri untuk melihat ulasan detail.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
