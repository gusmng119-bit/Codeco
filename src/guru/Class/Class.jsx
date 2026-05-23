import React from "react";
import "./Class.css";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

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

import profile from "../../assets/mrs-sari.jpeg";

const classes = [
  {
    title: "Robotic",
    students: 20,
    progress: 80,
    color: "#ff7aa2",
    icon: <IoSettingsSharp />,
    status: "Active",
  },
  {
    title: "Programming",
    students: 10,
    progress: 80,
    color: "#f4c95d",
    icon: <BiCodeAlt />,
    status: "Active",
  },
  {
    title: "Science",
    students: 20,
    progress: 100,
    color: "#56bbc4",
    icon: <FaFlask />,
    status: "Done",
  },
  {
    title: "Design",
    students: 20,
    progress: 80,
    color: "#a78bfa",
    icon: <FaPalette />,
    status: "Active",
  },
];

const Class = () => {
  const navigate = useNavigate(); // 2. Inisialisasi fungsi navigasi

  return (
    <div className="myclasses-page">

      {/* HEADER */}
      <div className="myclasses-header">

        <div className="myclasses-profile">
          <img src={profile} alt="" />
          <h1>Hi, Mr.Ilham!</h1>
        </div>

        {/* 3. Tambahkan fungsi onClick untuk mengarahkan rute */}
        <button 
          className="create-btn" 
          onClick={() => navigate("/teacher/create-class")}
          type="button"
        >
          + Create Class
        </button>

      </div>

      {/* TITLE */}
      <h1 className="page-title">
        My Classes
      </h1>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stats-card">
          <div className="stats-icon blue">
            <MdOutlineClass />
          </div>
          <div>
            <h2>8</h2>
            <p>Total Class</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon green">
            <FaUsers />
          </div>
          <div>
            <h2>30</h2>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon yellow">
            <MdCalendarMonth />
          </div>
          <div>
            <h2>8</h2>
            <p>Schedule</p>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="search-box">
        <BiSearch />
        <input type="text" placeholder="Search class" />
      </div>

      {/* CLASS LIST */}
      <div className="class-list">

        {classes.map((item, index) => (

          <div className="class-card" key={index}>

            {/* LEFT */}
            <div className="class-left">
              <div
                className="class-icon"
                style={{ background: item.color }}
              >
                {item.icon}
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
              <h3>Mon, Wed, Fri</h3>
              <p>09.00 - 11.00</p>
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

    </div>
  );
};

export default Class;