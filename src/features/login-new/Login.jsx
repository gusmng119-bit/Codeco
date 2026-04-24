import { Col, Row } from "antd";
import gambar1 from "../../assets/gambar1.png";
import logo1 from "../../assets/logo1.png";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Row style={{ height: "100%" }}>
        <Col
          xl={12}
          xs={24}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <img
            src={logo1}
            alt="Codeco Logo"
            style={{
              width: 200,
              height: "auto",
              objectFit: "contain",
              paddingBottom: 20,
              paddingLeft: 32,
              paddingTop: 32,
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoginForm />
          </div>
        </Col>
        <Col xl={12} xs={0} style={{ height: "100%" }}>
          <img
            src={gambar1}
            alt="Login Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
