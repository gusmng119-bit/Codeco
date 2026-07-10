import { useEffect, type ChangeEvent } from "react";
import "./ProfileAdmin.css";
import { FaRegEdit, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useProfileStore from "@/store/profileStore";
import ErrorState from "@/shared/components/ErrorState";

import banner from "@/assets/Baner.jpg";
import profileImg from "@/assets/coki.jpg"; // ganti sesuai nama file avatar admin kamu

const ProfileAdmin = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="admin-profile-page">
      {/* BANNER */}
      <div className="profile-banner">
        <img src={banner} alt="banner" />
      </div>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <div className="profile-image-section">
          <img src={profileImg} alt="admin" className="profile-image" />
          <button className="edit-photo-btn"><FaRegEdit /></button>
        </div>
        <h1>My profile</h1>
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
            <label>First name</label>
            {editMode
              ? <input type="text" name="firstName" value={data?.firstName ?? ""} onChange={handleChange} />
              : <p>{data?.firstName}</p>}
          </div>

          <div className="profile-item">
            <label>Last name</label>
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
            <label>Phone number</label>
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
        <div className="card-header">
          <h3>Address</h3>
          <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
            <FaRegEdit />
            {editMode ? " Save" : " Edit"}
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Country</label>
            {editMode
              ? <input type="text" name="country" value={data?.country ?? ""} onChange={handleChange} />
              : <p>{data?.country}</p>}
          </div>

          <div className="profile-item">
            <label>City/Province</label>
            {editMode
              ? <input type="text" name="city" value={data?.city ?? ""} onChange={handleChange} />
              : <p>{data?.city}</p>}
          </div>

          <div className="profile-item full-width">
            <label>Street address</label>
            {editMode
              ? <textarea name="streetAddress" value={data?.streetAddress ?? ""} onChange={handleChange} />
              : <p className="with-icon"><FaMapMarkerAlt />{data?.streetAddress}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;