import { Col, Row } from "antd";
import "./Login.css";
import gambar1 from "../../assets/gambar1.png";
import logo1 from "../../assets/logo1.png";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="login-container">
      <Row className="login-row" align="middle">
        
        {/* LEFT SECTION: Form & Logo */}
        <Col xl={12} lg={12} md={24} xs={24} className="left-section">
          <div className="content-wrapper">
            <div className="logo-container-login">
              <img src={logo1} alt="Codeco Logo" className="brand-logo-login" />
            </div>

            <div className="login-content">
              {/* Pastikan LoginForm berisi teks "Welcome!" sesuai gambar */}
              <LoginForm />
            </div>
          </div>
        </Col>

        {/* RIGHT SECTION: Image Hero */}
        <Col xl={12} lg={12} md={0} xs={0} className="right-section">
          <div className="image-wrapper">
            <img 
              src={gambar1} 
              alt="Login Preview" 
              className="login-hero-image" 
            />
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default Login;