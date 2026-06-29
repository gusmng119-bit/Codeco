import { useEffect } from "react";
import "./Feedback.css";
import logo2 from "../../assets/logo2.jpg";
import feedbackImg from "../../assets/feedback.png";
import useFeedbackStore from "../../store/feedbackStore";

const Feedback = () => {
  const {
    feedbackList,
    selectedItem,
    loading,
    setSelectedItem,
    fetchFeedback,
  } = useFeedbackStore();

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

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

      <h2 className="feedback-section-title">Class Feedback</h2>

      {/* LIST */}
      <div className="feedback-list">
        {loading && <p>Loading feedback...</p>}

        {!loading &&
          feedbackList.map((item) => (
            <div key={item.id} className="feedback-item-card">
              <div className="feedback-icon-wrapper">
                <span className="feedback-icon">📋</span>
              </div>

              <div className="feedback-info">
                <div className="feedback-card-header">
                  <h3>
                    {item.title} ({item.progress})
                  </h3>
                  <p className="feedback-date">{item.date}</p>
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
