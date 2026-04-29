import "./Classroom.css";

const Classroom = ({ filter, searchClass, onFilterChange, onSearchChange }) => {

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
  ];

  const filteredClasses = classes.filter(
    (c) =>
      (filter === "all" || c.type === filter) &&
      (searchClass === "" ||
        c.title.toLowerCase().includes(searchClass.toLowerCase()))
  );

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
          <input type="text" placeholder="search" />
          <span className="search-icon">🔍</span>
        </div>
        
        
        

      </div>

      {/* CLASS LIST */}
      <div className="class-list">
        {filteredClasses.map((c) => (
          <div className="class-card" key={c.id}>

            {/* HEADER CARD */}
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

              <div className="class-title-row">
                <h3>{c.title}</h3>
              </div>
              <p className="material-text">{c.material}</p>

              <div className="card-footer">
                <div className="time-info">
                  🕒 {c.time}
                </div>

                <button className="view-btn">
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