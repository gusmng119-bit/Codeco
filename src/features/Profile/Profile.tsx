import { useEffect, useState, type ChangeEvent } from "react";
import "./Profile.css";
import profileImg from "../../assets/Profile.png";
import BannerImg from "../../assets/Baner.jpg";
import useProfileStore from "../../store/profileStore";

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
    setEditMode,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  const [formValues, setFormValues] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <img src={BannerImg} alt="Banner" />
      </div>

      <div className="profile-content">
        <div className="avatar-wrapper">
          <div className="avatar-circle">
            <img src={profileImg} alt="Profile" />
          </div>
        </div>

        <h1 className="profile-title">My Profile</h1>

        {loading && <p style={{ textAlign: "center" }}>Loading profile...</p>}

        <div className="info-card">
          <div className="card-header profile-header-edit">
            <h3>Personal Information</h3>
            <button
              type="button"
              className="edit-profile-btn"
              onClick={handleEditClick}
            >
              {editMode ? "💾 Save" : "✏️ Edit"}
            </button>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>First Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={currentValues.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.firstName || "-"}</p>
              )}
            </div>

            <div className="info-item">
              <label>Last Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={currentValues.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.lastName || "-"}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={currentValues.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.email || "-"}</p>
              )}
            </div>

            <div className="info-item">
              <label>Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={currentValues.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.phone || "-"}</p>
              )}
            </div>

            <div className="info-item full-width">
              <label>Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={currentValues.bio}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.bio || "-"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="card-header">
            <h3>Address</h3>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label>Country</label>
              {editMode ? (
                <input
                  type="text"
                  name="country"
                  value={currentValues.country}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.country || "-"}</p>
              )}
            </div>

            <div className="info-item">
              <label>City / Province</label>
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={currentValues.city}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.city || "-"}</p>
              )}
            </div>

            <div className="info-item full-width">
              <label>Street Address</label>
              {editMode ? (
                <textarea
                  name="streetAddress"
                  value={currentValues.streetAddress}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{currentValues.streetAddress || "-"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;