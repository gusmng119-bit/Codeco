import "./Header.css";
import { useNavigate } from "react-router-dom";

import profile from "../../assets/mrs-sari.jpeg";

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="dashboard-header">

      {/* LEFT */}
      <div
        className="header-left"
        onClick={() => navigate("/teacher/profile")}
      >

        <img
          src={profile}
          alt="profile"
          className="header-avatar"
        />

        <div>

          <h2>Hi, Ms. Sari!</h2>

          <p>Teacher Dashboard</p>

        </div>

      </div>

      {/* RIGHT */}
      <button
        className="edit-profile-btn"
        onClick={() => navigate("/teacher/profile")}
      >
        Edit Profile
      </button>

    </div>
  );
};

export default Header;