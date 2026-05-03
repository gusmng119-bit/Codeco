import { Col, Row } from "antd";
import "./Login.css";
import gambar1 from "../../assets/gambar1.png";
import logo1 from "../../assets/logo1.png";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="login-container">
      <Row className="login-row">
        
        {/* LEFT */}
        <Col xl={12} xs={24} className="left-section">
          
          <div className="logo-container-login">
            <img src={logo1} alt="Codeco Logo" className="brand-logo-login" />
          </div>

          <div className="login-content">
            <LoginForm />
          </div>

        </Col>

        {/* RIGHT */}
        <Col xl={12} xs={0} className="right-section">
          <img src={gambar1} alt="Login Preview" />
        </Col>

      </Row>
    </div>
  );
};

export default Login;