import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    // Simulate API call / fake auth delay
    setTimeout(() => {
      setLoading(false);
      message.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div style={{ width: "100%", maxWidth: 400, padding: "0 32px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Welcome!
      </h1>
      <p style={{ color: "#888", marginBottom: 32 }}>
        Please enter your details to sign in.
      </p>

      <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email." },
            { type: "email", message: "Please enter a valid email address." },
          ]}
        >
          <Input size="large" placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password." },
            {
              min: 6,
              message: "Password must be at least 6 characters long.",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{
              backgroundColor: "#1a73e8",
              borderRadius: 8,
              height: 48,
              fontWeight: 600,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

