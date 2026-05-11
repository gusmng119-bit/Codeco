import { Col, Row } from "antd";
import "./Login.css";

import gambar1 from "../../assets/gambar1.png";
import logo1 from "../../assets/logo1.png";

import LoginForm from "./components/LoginForm";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div className="login-container">

      <Row className="login-row" align="middle">

        {/* ================= LEFT SECTION ================= */}
        <Col
          xl={12}
          lg={12}
          md={24}
          xs={24}
          className="left-section"
        >
          <div className="content-wrapper">

            {/* LOGO */}
            <div className="logo-container-login">
              <img
                src={logo1}
                alt="Logo"
                className="brand-logo-login"
              />
            </div>

            {/* FORM */}
            <div className="login-content">
              <LoginForm
                setIsLoggedIn={setIsLoggedIn}
              />
            </div>

          </div>
        </Col>

        {/* ================= RIGHT SECTION ================= */}
        <Col
          xl={12}
          lg={12}
          md={0}
          xs={0}
          className="right-section"
        >
          <div className="image-wrapper">

            <img
              src={gambar1}
              alt="Login Illustration"
              className="login-hero-image"
            />

          </div>
        </Col>

      </Row>
    </div>
  );
};

export default Login;