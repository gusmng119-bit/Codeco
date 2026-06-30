// Mengimpor aset ikon asli Kalender (Calendar), User/Orang (User), Waktu (Clock), dan Search
import { Calendar, User, Clock, Search } from "lucide-react"; 
import "./Classroom.css";

const Classroom = ({
  filter,
  searchClass,
  onFilterChange,
  onSearchChange,
  setSelectedClass,
  setPage,
}) => {

  const classes = [

  /* ================= ROBOTIC ================= */

  {
    id: 1,
    title: "Robotic Class",
    instructor: "Mr. Ilham",
    material: "Robot Introduction",
    date: "2026-05-08",
    time: "09:00 - 11:00",
    type: "today",
  },

  {
    id: 2,
    title: "Robotic Advance",
    instructor: "Mr. Ilham",
    material: "Advanced Robot Logic",
    date: "2026-05-10",
    time: "10:00 - 12:00",
    type: "upcoming",
  },

  /* ================= CODING ================= */

  {
    id: 3,
    title: "Coding Class",
    instructor: "Mrs. Sinta",
    material: "HTML Introduction",
    date: "2026-05-07",
    time: "13:00 - 15:00",
    type: "today",
  },

  {
    id: 4,
    title: "Coding Advanced",
    instructor: "Mrs. Sinta",
    material: "JavaScript DOM",
    date: "2026-05-11",
    time: "14:00 - 16:00",
    type: "yesterday",
  },

  /* ================= AI ================= */

  {
    id: 5,
    title: "AI Class",
    instructor: "Mr. Budi",
    material: "AI Introduction",
    date: "2026-05-09",
    time: "15:00 - 17:00",
    type: "today",
  },

  {
    id: 6,
    title: "AI Practice",
    instructor: "Mr. Budi",
    material: "Machine Learning Basic",
    date: "2026-05-12",
    time: "15:00 - 17:00",
    type: "upcoming",
  },

];

  const filteredClasses = classes.filter((c) => {
    const matchFilter = filter === "all" || c.type === filter;
    const matchSearch =
      !searchClass ||
      c.title.toLowerCase().includes(searchClass.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchClass.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleOpenClass = (classData) => {
    localStorage.setItem("lastClass", JSON.stringify(classData));
    setSelectedClass(classData);
    setPage("home");
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
              onClick={() => onFilterChange(t.id)}
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
            onChange={(e) => onSearchChange(e.target.value)}
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

        {filteredClasses.map((c) => (
          <div className="custom-class-card" key={c.id}>
            
            {/* Bagian Atas - Menggunakan Aset Ikon Kalender */}
            <div
              className={`custom-card-top-bar ${
                c.type === "today"
                  ? "top-blue"
                  : c.type === "upcoming"
                  ? "top-pink"
                  : "top-purple"
              }`}
            >
              <span className="top-bar-label">
                {c.type === "today"
                  ? "Today's Class"
                  : c.type === "upcoming"
                  ? "Next Class"
                  : "Yesterday Class"}
              </span>
              <span className="top-bar-date">
                <Calendar size={16} /> {c.date}
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
              
              <p className="custom-material-desc">{c.material}</p>
              
              {/* Bagian Bawah Kanan */}
              <div className="custom-card-bottom-bar">
                <div className="custom-time-lbl">
                  <Clock size={15} /> {c.time}
                </div>
                <button className="custom-action-btn" onClick={() => handleOpenClass(c)}>
                  {c.type === "today" ? "Join class" : "View"}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classroom;