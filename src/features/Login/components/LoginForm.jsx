import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    // Simulasi Auth (demo credentials)
    setTimeout(() => {
      const demoEmail = "gusmng119@gmail.com";
      const demoPassword = "admin123";

      if (values.email === demoEmail && values.password === demoPassword) {
        setLoading(false);
        message.success("Login successful! Welcome back.");

        // Keep consistent with ProtectedRoute/LoginRoute
        localStorage.setItem("jwtToken", "dummy-jwt-token");
        window.dispatchEvent(new Event("jwt-token-change"));
        navigate("/dashboard");
      } else {
        setLoading(false);
        message.error("Invalid email or password.");
      }
    }, 1500);
  };

  return (
    <div className="login-form-container">
      <h1 className="login-title">Welcome!</h1>

      <Form
        className="login-form"
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email." },
            { type: "email", message: "Please enter a valid email address." },
          ]}
        >
          <Input
            size="large"
            placeholder="example@mail.com"
            className="custom-input"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password." }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item style={{ marginTop: "20px" }}>
          <Button
            className="login-button"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

