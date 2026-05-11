import React, { useState } from "react";
import "./Profile.css";

import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";

const Profile = ({ setPage }) => {

  /* ================================================= */
  /* ================= EDIT MODE ===================== */
  /* ================================================= */

  const [editMode, setEditMode] =
    useState(false);

  /* ================================================= */
  /* ================= PROFILE DATA ================== */
  /* ================================================= */

  const [profileData, setProfileData] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    return (
      savedProfile || {
        firstName: "Budiono",
        lastName: "Putrosono",
        email: "BudionoPutrosono@gmail.com",
        phone: "+628132567999",
        bio: 'STIKOM BALI!! "Always The First"',
        country: "Indonesia",
        city: "Denpasar",
        address: "Jl. Tukad Balian No.45",
      }
    );
  });

  /* ================================================= */
  /* ================= LOAD STORAGE ================== */
  /* ================================================= */



  /* ================================================= */
  /* ================= HANDLE CHANGE ================= */
  /* ================================================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================================================= */
  /* ================= SAVE PROFILE ================== */
  /* ================================================= */

  const handleSave = () => {

    localStorage.setItem(
      "profileData",
      JSON.stringify(profileData)
    );

    alert("Profile updated!");

    setEditMode(false);
  };

  /* ================================================= */
  /* ================= UI ============================ */
  /* ================================================= */

  return (

    <div className="profile-page">

      {/* ================= BANNER ================= */}

      <div className="profile-banner">

        <img
          src={BannerImg}
          alt="Banner"
        />

      </div>

      <div className="profile-content">

        {/* ================= BACK BUTTON ================= */}

        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ⬅ Back
        </button>

        {/* ================= AVATAR ================= */}

        <div className="avatar-wrapper">

          <div className="avatar-circle">

            <img
              src={profileImg}
              alt="Profile"
            />

          </div>

        </div>

        {/* ================= TITLE ================= */}

        <h1 className="profile-title">
          My Profile
        </h1>

        {/* ================================================= */}
        {/* ================= PERSONAL INFO ================= */}
        {/* ================================================= */}

        <div className="info-card">

          <div className="card-header profile-header-edit">

            <button
              className="edit-profile-btn"
              onClick={() => {

                if (editMode) {
                  handleSave();
                } else {
                  setEditMode(true);
                }

              }}
            >

              {editMode
                ? "💾 Save"
                : " Edit"}

            </button>

            <h3>
              Personal Information
            </h3>

          </div>

          <div className="info-grid">

            {/* FIRST NAME */}

            <div className="info-item">

              <label>
                First Name
              </label>

              {editMode ? (

                <input
                  type="text"
                  name="firstName"
                  value={
                    profileData.firstName
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.firstName}
                </p>

              )}

            </div>

            {/* LAST NAME */}

            <div className="info-item">

              <label>
                Last Name
              </label>

              {editMode ? (

                <input
                  type="text"
                  name="lastName"
                  value={
                    profileData.lastName
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.lastName}
                </p>

              )}

            </div>

            {/* EMAIL */}

            <div className="info-item">

              <label>Email</label>

              {editMode ? (

                <input
                  type="email"
                  name="email"
                  value={
                    profileData.email
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.email}
                </p>

              )}

            </div>

            {/* PHONE */}

            <div className="info-item">

              <label>Phone</label>

              {editMode ? (

                <input
                  type="text"
                  name="phone"
                  value={
                    profileData.phone
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.phone}
                </p>

              )}

            </div>

            {/* BIO */}

            <div className="info-item full-width">

              <label>Bio</label>

              {editMode ? (

                <textarea
                  rows="3"
                  name="bio"
                  value={
                    profileData.bio
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.bio}
                </p>

              )}

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ================= ADDRESS ======================= */}
        {/* ================================================= */}

        <div className="info-card">

          <div className="card-header">

            <h3>Address</h3>

          </div>

          <div className="info-grid">

            {/* COUNTRY */}

            <div className="info-item">

              <label>
                Country
              </label>

              {editMode ? (

                <input
                  type="text"
                  name="country"
                  value={
                    profileData.country
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.country}
                </p>

              )}

            </div>

            {/* CITY */}

            <div className="info-item">

              <label>
                City / Province
              </label>

              {editMode ? (

                <input
                  type="text"
                  name="city"
                  value={
                    profileData.city
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.city}
                </p>

              )}

            </div>

            {/* ADDRESS */}

            <div className="info-item full-width">

              <label>
                Street Address
              </label>

              {editMode ? (

                <textarea
                  rows="3"
                  name="address"
                  value={
                    profileData.address
                  }
                  onChange={handleChange}
                />

              ) : (

                <p>
                  {profileData.address}
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;