import React, { useState } from "react";
import "./Profile.css";

// ✅ pastikan path sesuai struktur folder kamu
import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";

const Profile = ({ setPage }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="profile-page">

      {/* ================= BANNER ================= */}
      <div className="profile-banner">
        <img src={BannerImg} alt="Banner" />
      </div>

      <div className="profile-content">

        {/* ================= BACK BUTTON ================= */}
        {setPage && (
          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ⬅ Back
          </button>
        )}

        {/* ================= AVATAR ================= */}
        <div className="avatar-wrapper">
          <div className="avatar-circle">
            <img src={profileImg} alt="Profile" />
            <button
              className="edit-avatar-btn"
              onClick={() => setEditMode(!editMode)}
            >
              ✎
            </button>
          </div>
        </div>

        <h1 className="profile-title">My Profile</h1>

        {/* ================= PERSONAL INFORMATION ================= */}
        <div className="info-card">
          <div className="card-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>First Name</label>
              <p>Budiono</p>
            </div>

            <div className="info-item">
              <label>Last Name</label>
              <p>Putrosono</p>
            </div>

            <div className="info-item">
              <label>Email</label>
              <p>BudionoPutrosono@gmail.com</p>
            </div>

            <div className="info-item">
              <label>Phone</label>
              <p>+628132567999</p>
            </div>

            <div className="info-item full-width">
              <label>Bio</label>
              <p>STIKOM BALI!! "Always The First"</p>
            </div>
          </div>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="info-card">
          <div className="card-header">
            <h3>Address</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Country</label>
              <p>Indonesia</p>
            </div>

            <div className="info-item">
              <label>City / Province</label>
              <p>Denpasar</p>
            </div>

            <div className="info-item full-width">
              <label>Street Address</label>
              <p>Jl. Tukad Balian No.45</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;