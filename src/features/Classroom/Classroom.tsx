import { useEffect } from "react";
import { Calendar, User, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useClassroomStore, { FilterType } from "../../store/classroomStore";
import type { ClassItem } from "../../api/types/features";
import "./Classroom.css";

const Classroom = () => {
  const navigate = useNavigate();
  const {
    classes,
    filter,
    searchClass,
    setFilter,
    setSearchClass,
    setSelectedClass,
    setJoined,
    fetchClasses,
  } = useClassroomStore();

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const filteredClasses = classes.filter((c) => {
    // Map backend class status/type if necessary, or check item values
    const type = c.type || "today"; // default fallback for visual labeling
    const matchFilter = filter === "all" || type === filter;
    const matchSearch =
      !searchClass ||
      c.title.toLowerCase().includes(searchClass.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchClass.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleOpenClass = (classData: ClassItem) => {
    setSelectedClass(classData);
    const savedJoin = JSON.parse(localStorage.getItem("joinedClass") || "{}");
    setJoined(savedJoin[classData.title] || false);
    
    // Navigate to dashboard material or detail
    navigate(`/student/home/${classData.id}`);
  };

  return (
    <div className="custom-classroom-container">
      {/* ================= CONTROLS HEADER ================= */}
      <div className="custom-header-controls">
        <div className="custom-tabs-group">
          {[
            { id: "yesterday", label: "Yesterday" },
            { id: "today", label: "Today's" },
            { id: "upcoming", label: "Upcoming" },
            { id: "all", label: "See all" },
          ].map((t) => (
            <button
              key={t.id}
              className={`custom-tab-btn ${filter === t.id ? "active" : ""}`}
              onClick={() => setFilter(t.id as FilterType)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="custom-search-wrapper">
          <input
            type="text"
            placeholder="search class"
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
          />
          <span className="custom-search-icon">
            <Search size={16} />
          </span>
        </div>
      </div>

      {/* ================= CARDS LIST ================= */}
      <div className="custom-cards-list">
        {filteredClasses.length === 0 && (
          <p className="custom-no-data">No class found</p>
        )}

        {filteredClasses.map((c) => {
          const type = c.type || "today";
          return (
            <div className="custom-class-card" key={c.id}>
              
              {/* Bagian Atas - Menggunakan Aset Ikon Kalender */}
              <div
                className={`custom-card-top-bar ${
                  type === "today"
                    ? "top-blue"
                    : type === "upcoming"
                    ? "top-pink"
                    : "top-purple"
                }`}
              >
                <span className="top-bar-label">
                  {type === "today"
                    ? "Today's Class"
                    : type === "upcoming"
                    ? "Next Class"
                    : "Yesterday Class"}
                </span>
                <span className="top-bar-date">
                  <Calendar size={16} /> {c.date || "2026-05-08"}
                </span>
              </div>

              {/* Bagian Konten Tengah */}
              <div className="custom-card-middle-content">
                <div className="custom-title-line">
                  <h3>{c.title}</h3>
                  <span className="custom-instructor">
                    <User size={15} /> {c.instructor}
                  </span>
                </div>
                
                <p className="custom-material-desc">{c.material || "Robot Introduction"}</p>
                
                {/* Bagian Bawah Kanan */}
                <div className="custom-card-bottom-bar">
                  <div className="custom-time-lbl">
                    <Clock size={15} /> {c.time || "09:00 - 11:00"}
                  </div>
                  <button className="custom-action-btn" onClick={() => handleOpenClass(c)}>
                    {type === "today" ? "Join class" : "View"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classroom;
