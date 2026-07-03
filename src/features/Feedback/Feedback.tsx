import { useEffect, useMemo } from "react";
import "./Feedback.css";

import logo2 from "@/assets/logo2.jpg";
import feedbackImg from "@/assets/feedback.png";
import useClassroomStore from "../../store/classroomStore";
import useMaterialStore from "../../store/materialStore";
import useFeedbackStore from "../../store/feedbackStore";

const Feedback = () => {
  const { selectedClass } = useClassroomStore();
  const { materials, fetchMaterials } = useMaterialStore();
  const { feedbackList, fetchFeedback, selectedItem, setSelectedItem } = useFeedbackStore();

  const currentClass = selectedClass || {
    id: 3,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
  };

  useEffect(() => {
    fetchMaterials(currentClass.id);
  }, [currentClass.id, fetchMaterials]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const feedbacks = useMemo(() => {
    const materialIds = new Set(materials.map((m) => m.id));
    return feedbackList.filter((f) => f.materialId && materialIds.has(f.materialId));
  }, [feedbackList, materials]);

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