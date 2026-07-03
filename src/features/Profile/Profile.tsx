import { useEffect, useState, useRef, type ChangeEvent } from "react";
import "../Teacher/Profile/ProfileTeacher.css";
import { FaRegEdit, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useProfileStore from "@/store/profileStore";
import ErrorState from "@/shared/components/ErrorState";

import banner from "@/assets/Baner.jpg";
import profileImgDefault from "@/assets/Profile.png";

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
  city: string;
  streetAddress: string;
};

const defaultProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bio: "",
  country: "",
  city: "",
  streetAddress: "",
};

const Profile = () => {
  const {
    profile,
    editMode,
    loading,
    error,
    setEditMode,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  const [formValues, setFormValues] = useState<ProfileData>(defaultProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem("profileAvatar") || profileImgDefault;
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem("profileAvatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentValues = editMode ? formValues : (profile ?? defaultProfile);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (!editMode) {
      setFormValues(profile ?? defaultProfile);
      setEditMode(true);
      return;
    }

    updateProfile(formValues);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Unable to load profile" message={error} onRetry={fetchProfile} />;
  }

  return (
    <div className="teacher-profile-page">
      {/* BANNER */}
      <div className="profile-banner">
        <img src={banner} alt="banner" />
      </div>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="profile-image-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <img src={avatarUrl} alt="student" className="profile-image" />
          <button className="edit-photo-btn" onClick={handleAvatarClick}>
            <FaRegEdit />
          </button>
        </div>
        <h1>My Profile</h1>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Personal Information</h3>
          <button className="edit-btn" onClick={handleEditClick}>
            <FaRegEdit />
            {editMode ? " Save" : " Edit"}
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>First Name</label>
            {editMode
              ? <input type="text" name="firstName" value={currentValues.firstName} onChange={handleInputChange} />
              : <p>{currentValues.firstName || "-"}</p>}
          </div>

          <div className="profile-item">
            <label>Last Name</label>
            {editMode
              ? <input type="text" name="lastName" value={currentValues.lastName} onChange={handleInputChange} />
              : <p>{currentValues.lastName || "-"}</p>}
          </div>

          <div className="profile-item">
            <label>Email</label>
            {editMode
              ? <input type="email" name="email" value={currentValues.email} onChange={handleInputChange} />
              : <p className="with-icon"><FaEnvelope />{currentValues.email || "-"}</p>}
          </div>

          <div className="profile-item">
            <label>Phone Number</label>
            {editMode
              ? <input type="text" name="phone" value={currentValues.phone} onChange={handleInputChange} />
              : <p className="with-icon"><FaPhoneAlt />{currentValues.phone || "-"}</p>}
          </div>

          <div className="profile-item full-width">
            <label>Bio</label>
            {editMode
              ? <textarea name="bio" value={currentValues.bio} onChange={handleInputChange} />
              : <p>{currentValues.bio || "-"}</p>}
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Address</h3>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Country</label>
            {editMode
              ? <input type="text" name="country" value={currentValues.country} onChange={handleInputChange} />
              : <p>{currentValues.country || "-"}</p>}
          </div>

          <div className="profile-item">
            <label>City / Province</label>
            {editMode
              ? <input type="text" name="city" value={currentValues.city} onChange={handleInputChange} />
              : <p>{currentValues.city || "-"}</p>}
          </div>

          <div className="profile-item full-width">
            <label>Street Address</label>
            {editMode
              ? <textarea name="streetAddress" value={currentValues.streetAddress} onChange={handleInputChange} />
              : <p className="with-icon"><FaMapMarkerAlt />{currentValues.streetAddress || "-"}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;