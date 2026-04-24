import { Col, Row } from "antd";
import gambar1 from "../../assets/gambar1.png";
import logo1 from "../../assets/logo1.png";

const Login = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Row style={{ height: "100%" }}>
        <Col xl={12} xs={24} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <img src={logo1} alt="Codeco Logo" style={{ maxWidth: "100%", height: "auto" }} />
        </Col>
        <Col xl={12} xs={24} style={{ height: "100%" }}>
          <img src={gambar1} alt="Login Preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </Col>
      </Row>
    </div>
  );
};

export default Login;