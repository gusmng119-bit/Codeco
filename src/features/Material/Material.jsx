import React from "react";
import "./Material.css";
import logo2 from "../../assets/logo2.jpg";

const ClassMaterial = ({ setPage }) => {
  const materials = [
    { id: 1, title: "Introduction to robot components, assembly, and basic programming", date: "April 19, 2026", progress: "1/5" },
    { id: 2, title: "Basic Programming for Robots (Using Sensors and Actuators)", date: "April 22, 2026", progress: "2/5" },
    { id: 3, title: "Robot Movement and Control Systems", date: "April 26, 2026", progress: "3/5" },
    { id: 4, title: "Design and Building Simple Robots", date: "April 30, 2026", progress: "4/5" },
    { id: 5, title: "Artificial Intelligence in Robotics", date: "May 4, 2026", progress: "5/5" },
  ];
  

  return (
    <div className="material-page">

      

      {/* HEADER BANNER */}
      <div className="material-header-banner">
        <div className="header-content">
          <h1>Robotic Class</h1>
          <p>Mr. Ilham</p>
        </div>

        <div className="header-robot-img">
          <img src={logo2} alt="Robot Mascot" />
        </div>
      </div>

      <h2 className="section-title">Materials</h2>

      {/* MATERIAL LIST */}
      <div className="material-list">
        {materials.map((item) => (
          <div key={item.id} className="material-item-card">
            <div className="icon-wrapper">
              📖
            </div>

            <div className="material-info">
              <h3>{item.title} ({item.progress})</h3>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassMaterial;