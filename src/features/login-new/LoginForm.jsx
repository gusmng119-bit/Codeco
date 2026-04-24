import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Input, Button, Alert, Typography } from "antd";
import Title from "antd/es/typography/Title";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      <Row
        style={{
          width: "100vw",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Col xl={24}>
          <div
            style={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              //   justifyContent: "center",
            }}
          >
            {/* Form */}
            <div style={{ maxWidth: 550, width: "100%" }}>
              <Title
                style={{ fontSize: 48, fontWeight: 700, marginBottom: 40 }}
              >
                Welcome!
              </Title>

              <Form
                layout="vertical"
                onFinish={handleSubmit}
                disabled={loading}
              >
                <Form.Item
                  label={
                    <span
                      style={{ fontWeight: 600, fontSize: 18, paddingLeft: 10 }}
                    >
                      Email
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                    {
                      type: "email",
                      message: "Please enter a valid email address.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#e0e0e0",
                      border: "none",
                      padding: "18px 25px",
                      fontSize: 16,
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span
                      style={{ fontWeight: 600, fontSize: 18, paddingLeft: 10 }}
                    >
                      Password
                    </span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password." },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long.",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#e0e0e0",
                      border: "none",
                      padding: "18px 25px",
                      fontSize: 16,
                    }}
                  />
                </Form.Item>

                {error && (
                  <Alert
                    message={error}
                    type="error"
                    showIcon
                    style={{
                      marginBottom: 20,
                      borderRadius: 8,
                      borderLeft: "4px solid #f66",
                    }}
                  />
                )}

                <Form.Item style={{ marginTop: 20 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    style={{
                      borderRadius: 50,
                      backgroundColor: "#56bbc4",
                      border: "none",
                      height: "auto",
                      padding: "18px",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginForm;
