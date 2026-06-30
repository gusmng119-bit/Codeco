import React, { useEffect } from "react";
import "./ClassTeacher.css";
import { useNavigate } from "react-router-dom";
import useTeacherClassStore from "@/store/teacherClassStore";
import EmptyState from "@/shared/components/EmptyState";
import ErrorState from "@/shared/components/ErrorState";

import {
  FaUsers,
  FaFlask,
  FaPalette,
} from "react-icons/fa";

import {
  MdOutlineClass,
  MdCalendarMonth,
} from "react-icons/md";

import {
  BiCodeAlt,
  BiSearch,
} from "react-icons/bi";

import {
  IoSettingsSharp,
} from "react-icons/io5";

import profile from "@/assets/mrs-sari.jpeg";
import useAuthStore from "@/store/authStore";

/* ======================================================
   ICON MAP berdasarkan nama kelas
===================================================== */
const iconMap: Record<string, React.ReactNode> = {
  Robotic:    <IoSettingsSharp />,
  Programming: <BiCodeAlt />,
  Science:    <FaFlask />,
  Design:     <FaPalette />,
};

const ClassTeacher = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const {
    classes,
    searchTerm,
    loading,
    error,
    setSearchTerm,
    fetchClasses,
  } = useTeacherClassStore();

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const filtered = classes.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="myclasses-page">

      {/* HEADER */}
      <div className="myclasses-header">

        <div className="myclasses-profile">
          <img src={profile} alt="" />
          <h1>Hi, {user?.name ?? "Teacher"}!</h1>
        </div>

        <button
          className="create-btn"
          onClick={() => navigate("/teacher/create-class")}
          type="button"
        >
          + Create Class
        </button>

      </div>

      {/* TITLE */}
      <h1 className="page-title">My Classes</h1>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stats-card">
          <div className="stats-icon blue">
            <MdOutlineClass />
          </div>
          <div>
            <h2>{classes.length}</h2>
            <p>Total Class</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon green">
            <FaUsers />
          </div>
          <div>
            <h2>{classes.reduce((sum, c) => sum + c.students, 0)}</h2>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon yellow">
            <MdCalendarMonth />
          </div>
          <div>
            <h2>{classes.length}</h2>
            <p>Schedule</p>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="search-box">
        <BiSearch />
        <input
          type="text"
          placeholder="Search class"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* STATES */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          <p>Loading classes...</p>
        </div>
      )}

      {!loading && error && (
        <ErrorState
          title="Unable to load classes"
          message={error}
          onRetry={fetchClasses}
        />
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="No Classes Found"
          message={searchTerm ? "No classes match your search." : "You have no classes yet."}
          icon="📚"
        />
      )}

      {/* CLASS LIST */}
      {!loading && !error && filtered.length > 0 && (
        <div className="class-list">
          {filtered.map((item) => (
            <div className="class-card" key={item.id}>

              {/* LEFT */}
              <div className="class-left">
                <div
                  className="class-icon"
                  style={{ background: item.color }}
                >
                  {iconMap[item.title] ?? <IoSettingsSharp />}
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <span className={`status ${item.status === "Done" ? "done" : ""}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* STUDENT */}
              <div className="class-student">
                <h2>{item.students}</h2>
                <p>Siswa</p>
              </div>

              {/* SCHEDULE */}
              <div className="class-schedule">
                <h3>{item.schedule}</h3>
                <p>{item.time}</p>
              </div>

              {/* PROGRESS */}
              <div className="class-progress">
                <h3>Progress Class</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.progress}%`,
                      background: item.color,
                    }}
                  />
                </div>
                <span>{item.progress}%</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ClassTeacher;
