import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";
import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";

const Profile = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { profile, editMode, loading, setEditMode, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    logout();
    navigate("/");
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

            <img
              src={profileImg}
              alt="Profile"
            />

          </div>

        </div>

        <h1 className="profile-title">My Profile</h1>

        {loading && <p style={{ textAlign: "center" }}>Loading profile...</p>}

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
              <label>First Name</label>
              <p>{p.firstName}</p>
            </div>

            {/* LAST NAME */}

            <div className="info-item">
              <label>Last Name</label>
              <p>{p.lastName}</p>
            </div>

            {/* EMAIL */}

            <div className="info-item">

              <label>Email</label>
              <p>{p.email}</p>
            </div>

            {/* PHONE */}

            <div className="info-item">

              <label>Phone</label>
              <p>{p.phone}</p>
            </div>

            {/* BIO */}

            <div className="info-item full-width">

              <label>Bio</label>
              <p>{p.bio}</p>
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
              <label>Country</label>
              <p>{p.country}</p>
            </div>

            {/* CITY */}

            <div className="info-item">
              <label>City / Province</label>
              <p>{p.city}</p>
            </div>

            {/* ADDRESS */}

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
