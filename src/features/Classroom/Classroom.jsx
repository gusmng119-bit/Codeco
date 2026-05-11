import "./Classroom.css";

const Classroom = ({
  filter,
  searchClass,
  onFilterChange,
  onSearchChange,
  setSelectedClass,
  setPage,
}) => {

  /* ================================================= */
  /* ================= CLASS DATA ==================== */
  /* ================================================= */

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
      type: "upcoming",
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

  /* ================================================= */
  /* ================= FILTER ======================== */
  /* ================================================= */

  const filteredClasses = classes.filter((c) => {

    const matchFilter =
      filter === "all" || c.type === filter;

    const matchSearch =
      !searchClass ||
      c.title
        .toLowerCase()
        .includes(searchClass.toLowerCase()) ||
      c.instructor
        .toLowerCase()
        .includes(searchClass.toLowerCase());

    return matchFilter && matchSearch;
  });

  /* ================================================= */
  /* ================= OPEN CLASS ==================== */
  /* ================================================= */

  const handleOpenClass = (classData) => {

    /* SAVE CLASS */
    localStorage.setItem(
      "lastClass",
      JSON.stringify(classData)
    );

    /* UPDATE STATE */
    setSelectedClass(classData);

    /* MOVE PAGE */
    setPage("home");
  };

  /* ================================================= */
  /* ================= UI ============================ */
  /* ================================================= */

  return (

    <div className="classroom-page">

      {/* ================= HEADER ================= */}

      <div className="classroom-header">

        {/* FILTER */}

        <div className="filter-tabs">

          {[
            "yesterday",
            "today",
            "upcoming",
            "all",
          ].map((t) => (

            <button
              key={t}
              className={`tab ${
                filter === t ? "active" : ""
              }`}
              onClick={() => onFilterChange(t)}
            >
              {t.charAt(0).toUpperCase() +
                t.slice(1)}
            </button>

          ))}

        </div>

        {/* SEARCH */}

        <div className="search-box-cert">

          <input
            type="text"
            placeholder="Search class..."
            value={searchClass}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />

          <span className="search-icon">
            🔍
          </span>

        </div>

      </div>

      {/* ================= CLASS LIST ================= */}

      <div className="class-list">

        {filteredClasses.length === 0 && (

          <p className="no-class">
            No class found
          </p>

        )}

        {filteredClasses.map((c) => (

          <div
            className="class-card"
            key={c.id}
          >

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
                {c.type.charAt(0).toUpperCase() +
                  c.type.slice(1)}{" "}
                Class
              </span>

              <span>{c.date}</span>

            </div>

            {/* BODY */}

            <div className="card-body">

              <h3>{c.title}</h3>

              <p className="instructor-text">
                <span>{c.instructor}</span>
              </p>

              <p className="material-text">
                {c.material}
              </p>

              <div className="card-footer">

                <div className="time-info">
                  🕒 {c.time}
                </div>

                <button
                  className="view-btn"
                  onClick={() =>
                    handleOpenClass(c)
                  }
                >

                  {c.type === "today"
                    ? "Join Class"
                    : "View Class"}

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