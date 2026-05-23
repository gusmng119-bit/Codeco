import "./ProfileGuru.css";

import banner from "@/assets/Baner.jpg";
import profile from "@/assets/mrs-sari.jpeg";

import {
  FaRegEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TeacherProfile = () => {
  return (
    <div className="teacher-profile-page">

      {/* BANNER */}
      <div className="profile-banner">
        <img src={banner} alt="banner" />
      </div>

      {/* PROFILE HEADER */}
      <div className="profile-header">

        <div className="profile-image-section">

          <img
            src={profile}
            alt="teacher"
            className="profile-image"
          />

          <button className="edit-photo-btn">
            <FaRegEdit />
          </button>

        </div>

        <h1>My Profile</h1>

      </div>

      {/* PERSONAL INFO */}
      <div className="profile-card">

        <div className="card-header">
          <h3>Personal Information</h3>

          <button className="edit-btn">
            <FaRegEdit />
            Edit
          </button>
        </div>

        <div className="profile-grid">

          <div className="profile-item">
            <label>First Name</label>
            <p>Ilham</p>
          </div>

          <div className="profile-item">
            <label>Last Name</label>
            <p>Wicaksono</p>
          </div>

          <div className="profile-item">
            <label>Email</label>

            <p className="with-icon">
              <FaEnvelope />
              ilhamwicaksono@gmail.com
            </p>
          </div>

          <div className="profile-item">
            <label>Phone Number</label>

            <p className="with-icon">
              <FaPhoneAlt />
              +628123456789
            </p>
          </div>

          <div className="profile-item full-width">
            <label>Bio</label>
            <p>Always The First</p>
          </div>

        </div>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">

        <div className="card-header">

          <h3>Address</h3>

          <button className="edit-btn">
            <FaRegEdit />
            Edit
          </button>

        </div>

        <div className="profile-grid">

          <div className="profile-item">
            <label>Country</label>
            <p>Indonesia</p>
          </div>

          <div className="profile-item">
            <label>City / Province</label>
            <p>Denpasar</p>
          </div>

          <div className="profile-item full-width">
            <label>Street Address</label>

            <p className="with-icon">
              <FaMapMarkerAlt />
              Jl. Tukad Balian No.45
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TeacherProfile;