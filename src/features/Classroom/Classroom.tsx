import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Classroom.css";
import useClassroomStore, { FilterType } from "../../store/classroomStore";
import type { ClassItem } from "../../api/types/features";
import EmptyState from "../../shared/components/EmptyState";
import ErrorState from "../../shared/components/ErrorState";

const Classroom = () => {
  const navigate = useNavigate();
  const {
    classes,
    filter,
    searchClass,
    setFilter,
    setSearchClass,
    setSelectedClass,
    fetchClasses,
    loading,
    error,
  } = useClassroomStore();

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const filteredClasses = classes.filter((c) => {
    const matchFilter = filter === "all" || c.type === filter;
    const matchSearch =
      searchClass === "" ||
      c.title.toLowerCase().includes(searchClass.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchClass.toLowerCase());

    return matchFilter && matchSearch;
  });

  const handleOpenClass = (c: ClassItem) => {
    setSelectedClass(c);
    navigate("/dashboard/home");
  };

  const filterOptions: FilterType[] = ["yesterday", "today", "upcoming", "all"];

  return (
    <div className="classroom-page">
      {/* HEADER */}
      <div className="classroom-header">
        {/* FILTER */}
        <div className="filter-tabs">
          {filterOptions.map((t) => (
            <button
              key={t}
              className={`tab ${filter === t ? "active" : ""}`}
              onClick={() => setFilter(t)}
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
            onChange={(e) => setSearchClass(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* CLASS LIST / FALLBACKS */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          <p className="no-class">Loading classes from backend...</p>
        </div>
      )}

      {!loading && error && (
        <ErrorState
          title="Unable to load classroom schedules"
          message={error}
          onRetry={fetchClasses}
        />
      )}

      {!loading && !error && filteredClasses.length === 0 && (
        <EmptyState
          title="No Classes Found"
          message="There are no classes matching your filter criteria. Try selecting 'All' or clearing search."
          icon="📖"
        />
      )}

      {!loading && !error && filteredClasses.length > 0 && (
        <div className="class-list">
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
                  <div className="time-info">🕒 {c.time}</div>

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
      )}
    </div>
  );
};

export default Classroom;
