import { Link } from "react-router-dom";
import "./Homeguru.css";
import robot from "@/assets/logo2.jpg";

import { FaBookOpen, FaUsers, FaComments } from "react-icons/fa";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const Home = () => {
  return (
    <div className="home-page">

      {/* ================= TODAY CLASS ================= */}
      <div className="section-wrap">

        <div className="section-title-row">
          <h3 className="section-title">Today’s classes</h3>
        </div>

        <div className="today-card">

          <img
            src={robot}
            className="robot-img"
            alt="Robot class"
          />

          <div>

            <h2>Robotic Class</h2>

            <p className="class-level">
              Beginner
            </p>

            <div className="class-info">

              <span>
                <MdDateRange className="info-icon" />
                April 17, 2026
              </span>

              <span>
                <MdAccessTime className="info-icon" />
                09.00–11.00
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="section-wrap">

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              <FaBookOpen />
            </div>

            <div>
              <h3>8</h3>
              <p>Active classes</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              <FaUsers />
            </div>

            <div>
              <h3>30</h3>
              <p>Across all classes</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon red">
              <FaComments />
            </div>

            <div>
              <h3>75%</h3>
              <p>Across all classes</p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="section-wrap">

        <div className="overview-grid">

          {/* ================= LEFT ================= */}
          <div className="overview-card">

            <div className="overview-header">

              <h3>Class Overview</h3>

              <Link
                to="/teacher/classes"
                className="view-link"
              >
                View all
              </Link>

            </div>

            {[80, 90, 40].map((progress, i) => (

              <div
                className="overview-item"
                key={i}
              >

                <div className="gear">
                  <IoSettingsSharp />
                </div>

                <div className="overview-info">

                  <h4>Robotic</h4>

                  <p>
                    Grade {i + 3} - Beginner
                  </p>

                  <div className="progress-bar">

                    <div
                      className="progress"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                <span>{progress}%</span>

              </div>
            ))}

          </div>

          {/* ================= RIGHT ================= */}
          <div className="overview-card">

            <div className="overview-header">

              <h3>Calendar Overview</h3>

              <Link
                to="/teacher/calendar"
                className="view-link"
              >
                View calendar
              </Link>

            </div>

            {[21, 24, 28].map((date) => (

              <div
                className="calendar-item"
                key={date}
              >

                <div className="date-box">
                  <span>April</span>
                  <h2>{date}</h2>
                </div>

                <div>

                  <h4>Robotic</h4>

                  <p>
                    Grade 6 - Intermediate
                  </p>

                  <span className="calendar-time">

                    <MdAccessTime className="info-icon" />
                    09:00 - 11:00

                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;