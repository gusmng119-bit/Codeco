import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaCommentDots, FaWallet } from "react-icons/fa"; 
import logo1 from "../../assets/logo1.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = (path) =>
    location.pathname.toLowerCase() === path.toLowerCase() ? "active" : "";

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="logo-section">
        <img src={logo1} alt="logo" />
      </div>

      {/* MENU */}
      <nav className="nav-menu">
        {/* DASHBOARD / HOME */}
        <div
          className={`nav-item ${activeMenu("/teacher")}`}
          onClick={() => navigate("/teacher")}
        >
          <AiOutlineHome />
          <span>Dashboard</span>
        </div>

        {/* MY CLASSES */}
        <div
          className={`nav-item ${activeMenu("/teacher/classes")}`}
          onClick={() => navigate("/teacher/classes")}
        >
          <BiBook />
          <span>My Classes</span>
        </div>

        {/* CALENDAR */}
        <div 
          className={`nav-item ${activeMenu("/teacher/calendar")}`}
          onClick={() => navigate("/teacher/calendar")}
        >
          <MdOutlineCalendarMonth />
          <span>Calendar</span>
        </div>

        {/* FEEDBACK (PERBAIKAN: Diubah dari feedbackGuru menjadi feedback) */}
        <div 
          className={`nav-item ${activeMenu("/teacher/feedback")}`}
          onClick={() => navigate("/teacher/feedback")}
        >
          <FaCommentDots />
          <span>Feedback</span>
        </div>

        {/* SALARY (PERBAIKAN: Diubah dari Salary menjadi salary huruf kecil) */}
        <div 
          className={`nav-item ${activeMenu("/teacher/salary")}`}
          onClick={() => navigate("/teacher/salary")}
        >
          <FaWallet />
          <span>Salary</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;