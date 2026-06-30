import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";
import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";
import type { ProfileData } from "../../api/types/features";

const Profile = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { profile, editMode, loading, setEditMode, fetchProfile, updateProfile } = useProfileStore();

  const [formValues, setFormValues] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    country: "",
    city: "",
    streetAddress: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Sync store profile data to local formValues once loaded
  useEffect(() => {
    if (profile) {
      setFormValues(profile);
    }
  }, [profile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateProfile(formValues);
  };

  const p = profile || {
    firstName: "Budiono",
    lastName: "Putrosono",
    email: "BudionoPutrosono@gmail.com",
    phone: "+628132567999",
    bio: 'STIKOM BALI!! "Always The First"',
    country: "Indonesia",
    city: "Denpasar",
    streetAddress: "Jl. Tukad Balian No.45",
  };

  const currentValues = editMode ? formValues : p;

  return (
    <div className="profile-page">
      {/* ================= BANNER ================= */}
      <div className="profile-banner">
        <img src={BannerImg} alt="Banner" />
      </div>

      <div className="profile-content">
        {/* ================= ACTIONS ================= */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button className="back-btn" onClick={() => navigate("/dashboard/home")}>
            ⬅ Back
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#fef2f2",
              color: "#ef4444",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* ================= AVATAR ================= */}
        <div className="avatar-wrapper">
          <div className="avatar-circle">
            <img src={profileImg} alt="Profile" />
          </div>
        </div>

        <h1 className="profile-title">My Profile</h1>

        {loading && <p style={{ textAlign: "center" }}>Loading profile...</p>}

        {/* ================= PERSONAL INFO ================= */}
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
              {editMode ? "💾 Save" : "Edit"}
            </button>
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            {/* FIRST NAME */}
            <div className="info-item">
              <label>First Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={currentValues.firstName}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.firstName}</p>
              )}
            </div>

            {/* LAST NAME */}
            <div className="info-item">
              <label>Last Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={currentValues.lastName}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.lastName}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="info-item">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={currentValues.email}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.email}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="info-item">
              <label>Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={currentValues.phone}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.phone}</p>
              )}
            </div>

            {/* BIO */}
            <div className="info-item full-width">
              <label>Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={currentValues.bio}
                  onChange={handleInputChange}
                  className="profile-textarea"
                />
              ) : (
                <p>{p.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* ================= ADDRESS ======================= */}
        <div className="info-card">
          <div className="card-header">
            <h3>Address</h3>
          </div>

          <div className="info-grid">
            {/* COUNTRY */}
            <div className="info-item">
              <label>Country</label>
              {editMode ? (
                <input
                  type="text"
                  name="country"
                  value={currentValues.country}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.country}</p>
              )}
            </div>

            {/* CITY */}
            <div className="info-item">
              <label>City / Province</label>
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={currentValues.city}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p>{p.city}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div className="info-item full-width">
              <label>Street Address</label>
              {editMode ? (
                <textarea
                  name="streetAddress"
                  value={currentValues.streetAddress}
                  onChange={handleInputChange}
                  className="profile-textarea"
                />
              ) : (
                <p>{p.streetAddress}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
