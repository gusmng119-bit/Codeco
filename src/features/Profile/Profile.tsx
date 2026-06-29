import { useEffect } from "react";
import "./Profile.css";
import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";
import useProfileStore from "../../store/profileStore";
import useDashboardStore from "../../store/dashboardStore";

const Profile = () => {
  const setPage = useDashboardStore((state) => state.setPage);
  const { profile, editMode, loading, setEditMode, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  return (
    <div className="profile-page">
      {/* ================= BANNER ================= */}
      <div className="profile-banner">
        <img src={BannerImg} alt="Banner" />
      </div>

      <div className="profile-content">
        {/* ================= BACK BUTTON ================= */}
        <button className="back-btn" onClick={() => setPage("home")}>
          ⬅ Back
        </button>

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

        {loading && <p style={{ textAlign: "center" }}>Loading profile...</p>}

        {/* ================= PERSONAL INFORMATION ================= */}
        <div className="info-card">
          <div className="card-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>First Name</label>
              <p>{p.firstName}</p>
            </div>

            <div className="info-item">
              <label>Last Name</label>
              <p>{p.lastName}</p>
            </div>

            <div className="info-item">
              <label>Email</label>
              <p>{p.email}</p>
            </div>

            <div className="info-item">
              <label>Phone</label>
              <p>{p.phone}</p>
            </div>

            <div className="info-item full-width">
              <label>Bio</label>
              <p>{p.bio}</p>
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
              <p>{p.country}</p>
            </div>

            <div className="info-item">
              <label>City / Province</label>
              <p>{p.city}</p>
            </div>

            <div className="info-item full-width">
              <label>Street Address</label>
              <p>{p.streetAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
