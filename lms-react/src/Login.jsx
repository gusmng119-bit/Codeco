import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import gambar1 from "./assets/gambar1.png";
function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-placeholder">Logo codeco</div>

        <div className="login-content">
          <h1 className="welcome-text">Welcome!</h1>

          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" />
          </div>

          <button
            className="btn-login"
            onClick={() => navigate("/dashboard")}
          >
            Login
          </button>
        </div>
      </div>

      <div className="right-section">
        <img src={gambar1} alt="Preview" />
      </div>
    </div>
  );
}

export default Login;
