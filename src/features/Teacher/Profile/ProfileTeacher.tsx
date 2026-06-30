import { useEffect } from "react";
import "./ProfileTeacher.css";
import { FaRegEdit, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useProfileStore from "@/store/profileStore";
import ErrorState from "@/shared/components/ErrorState";

import banner from "@/assets/Baner.jpg";
import profile from "@/assets/mrs-sari.jpeg";

const ProfileTeacher = () => {
  const {
    profile: data,
    editMode,
    loading,
    error,
    setEditMode,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    updateProfile({ [e.target.name]: e.target.value });
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
          <img src={profile} alt="teacher" className="profile-image" />
          <button className="edit-photo-btn"><FaRegEdit /></button>
        </div>
        <h1>My Profile</h1>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Personal Information</h3>
          <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
            <FaRegEdit />
            {editMode ? " Save" : " Edit"}
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>First Name</label>
            {editMode
              ? <input type="text" name="firstName" value={data?.firstName ?? ""} onChange={handleChange} />
              : <p>{data?.firstName}</p>}
          </div>

          <div className="profile-item">
            <label>Last Name</label>
            {editMode
              ? <input type="text" name="lastName" value={data?.lastName ?? ""} onChange={handleChange} />
              : <p>{data?.lastName}</p>}
          </div>

          <div className="profile-item">
            <label>Email</label>
            {editMode
              ? <input type="email" name="email" value={data?.email ?? ""} onChange={handleChange} />
              : <p className="with-icon"><FaEnvelope />{data?.email}</p>}
          </div>

          <div className="profile-item">
            <label>Phone Number</label>
            {editMode
              ? <input type="text" name="phone" value={data?.phone ?? ""} onChange={handleChange} />
              : <p className="with-icon"><FaPhoneAlt />{data?.phone}</p>}
          </div>

          <div className="profile-item full-width">
            <label>Bio</label>
            {editMode
              ? <textarea name="bio" value={data?.bio ?? ""} onChange={handleChange} />
              : <p>{data?.bio}</p>}
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="profile-card">
        <div className="card-header"><h3>Address</h3></div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Country</label>
            {editMode
              ? <input type="text" name="country" value={data?.country ?? ""} onChange={handleChange} />
              : <p>{data?.country}</p>}
          </div>

          <div className="profile-item">
            <label>City / Province</label>
            {editMode
              ? <input type="text" name="city" value={data?.city ?? ""} onChange={handleChange} />
              : <p>{data?.city}</p>}
          </div>

          <div className="profile-item full-width">
            <label>Street Address</label>
            {editMode
              ? <textarea name="streetAddress" value={data?.streetAddress ?? ""} onChange={handleChange} />
              : <p className="with-icon"><FaMapMarkerAlt />{data?.streetAddress}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTeacher;
