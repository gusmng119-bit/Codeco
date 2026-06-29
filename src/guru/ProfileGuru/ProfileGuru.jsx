import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Ilham",
    lastName: "Wicaksono",
    email: "ilhamwicaksono@gmail.com",
    phone: "+628123456789",
    bio: "Always The First",
    country: "Indonesia",
    city: "Denpasar",
    address: "Jl. Tukad Balian No.45",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

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

      {/* PERSONAL INFORMATION */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Personal Information</h3>

          <button
            className="edit-btn"
            onClick={handleEdit}
          >
            <FaRegEdit />
            {isEditing ? " Save" : " Edit"}
          </button>
        </div>

        <div className="profile-grid">
          {/* First Name */}
          <div className="profile-item">
            <label>First Name</label>

            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="profile-item">
            <label>Last Name</label>

            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="profile-item">
            <label>Email</label>

            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p className="with-icon">
                <FaEnvelope />
                {formData.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="profile-item">
            <label>Phone Number</label>

            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <p className="with-icon">
                <FaPhoneAlt />
                {formData.phone}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="profile-item full-width">
            <label>Bio</label>

            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Address</h3>
        </div>

        <div className="profile-grid">
          {/* Country */}
          <div className="profile-item">
            <label>Country</label>

            {isEditing ? (
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.country}</p>
            )}
          </div>

          {/* City */}
          <div className="profile-item">
            <label>City / Province</label>

            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.city}</p>
            )}
          </div>

          {/* Address */}
          <div className="profile-item full-width">
            <label>Street Address</label>

            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p className="with-icon">
                <FaMapMarkerAlt />
                {formData.address}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;