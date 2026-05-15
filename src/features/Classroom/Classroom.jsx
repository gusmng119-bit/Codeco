import "./Classroom.css";

const Classroom = ({
  filter = "all",
  searchClass = "",
  onFilterChange = () => {},
  onSearchChange = () => {},
  setPage = () => {},
  setSelectedClass = () => {},
}) => {

  /* ================= CLASS DATA ================= */
  const classes = [
    {
      id: 1,
      title: "Coding for Kids",
      instructor: "Mr. Samsoro",
      material: "Basic HTML tags and structure",
      date: "2024-10-20",
      time: "13:00 - 15:00",
      type: "yesterday",
    },
    {
      id: 2,
      title: "Lego Class",
      instructor: "Mr. Ilham",
      material: "Robot assembly basics",
      date: "2024-10-21",
      time: "09:00 - 11:00",
      type: "today",
    },
    {
      id: 3,
      title: "Robotic Class",
      instructor: "Mr. Ilham",
      material: "Robotic logic intro",
      date: "2024-10-22",
      time: "10:00 - 12:00",
      type: "upcoming",
    },
    {
      id: 4,
      title: "AI Basics",
      instructor: "Mr. Budi",
      material: "AI fundamentals",
      date: "2024-10-23",
      time: "14:00 - 16:00",
      type: "upcoming",
    },
    {
      id: 5,
      title: "Robotic Class Advance",
      instructor: "Mr. Ilham",
      material: "Advanced robotic logic",
      date: "2024-10-24",
      time: "10:00 - 12:00",
      type: "today",
    },
    {
      id: 6,
      title: "AI Practice",
      instructor: "Mr. Budi",
      material: "Machine learning intro",
      date: "2024-10-25",
      time: "14:00 - 16:00",
      type: "today",
    },
  ];

  /* ================= FILTER + SEARCH ================= */
  const filteredClasses = classes.filter((c) => {
    const matchFilter = filter === "all" || c.type === filter;

    const matchSearch =
      searchClass === "" ||
      c.title.toLowerCase().includes(searchClass.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchClass.toLowerCase());

    return matchFilter && matchSearch;
  });

  /* ================= OPEN CLASS ================= */
  const handleOpenClass = (c) => {
    setSelectedClass(c);
    setPage("home");
  };

  return (
    <div className="classroom-page">

      {/* HEADER */}
      <div className="classroom-header">

        {/* FILTER */}
        <div className="filter-tabs">
          {["yesterday", "today", "upcoming", "all"].map((t) => (
            <button
              key={t}
              className={`tab ${filter === t ? "active" : ""}`}
              onClick={() => onFilterChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="search-box-cert">
          <input
            type="text"
            placeholder="Search class..."
            value={searchClass}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

      </div>

      {/* CLASS LIST */}
      <div className="class-list">

        {filteredClasses.length === 0 && (
          <p className="no-class">No class found</p>
        )}

        {filteredClasses.map((c) => (
          <div className="class-card" key={c.id}>

            {/* HEADER */}
            <div
              className={`card-header ${
                c.type === "today"
                  ? "bg-blue"
                  : c.type === "upcoming"
                  ? "bg-pink"
                  : "bg-purple"
              }`}
            >
              <span>
                {c.type.charAt(0).toUpperCase() + c.type.slice(1)} Class
              </span>
              <span>{c.date}</span>
            </div>

            {/* BODY */}
            <div className="card-body">

              <h3>{c.title}</h3>
              <p className="material-text">{c.material}</p>

              <div className="card-footer">

                <div className="time-info">
                  🕒 {c.time}
                </div>

                <button
                  className="view-btn"
                  onClick={() => handleOpenClass(c)}
                >
                  {c.type === "today" ? "Join Class" : "View"}
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