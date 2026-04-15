import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import gambar1 from "./assets/gambar1.png";
import logo1 from "./assets/logo1.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Fake auth delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-container-login">
          <img 
            src={logo1} 
            alt="Codeco Logo" 
            className="brand-logo-login" 
          />
        </div>

        <div className="login-content">
          <h1 className="welcome-text">Welcome!</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className={`btn-login ${loading ? 'loading' : ''}`}
              disabled={loading}
              type="submit"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <div className="right-section">
        <img src={gambar1} alt="Login Preview" />
      </div>
    </div>
  );
}

export default Login;

