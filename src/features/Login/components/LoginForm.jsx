import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./LoginForm.css";

const LoginForm = ({ setIsLoggedIn }) => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {

    const demoEmail = "gusmng119@gmail.com";
    const demoPassword = "admin123";

    setLoading(true);

    setTimeout(() => {

      const isValid =
        values.email === demoEmail &&
        values.password === demoPassword;

      if (isValid) {

        message.success("Login successful!");

        // ✅ SAVE LOGIN (string konsisten)
        localStorage.setItem("isLoggedIn", "true");

        // ✅ SAFE CALL (hindari error undefined)
        if (typeof setIsLoggedIn === "function") {
          setIsLoggedIn(true);
        }

      } else {
        message.error("Invalid email or password.");
      }

      setLoading(false);

    }, 600);
  };

  return (
    <div className="login-form-container">

      <h1 className="login-title">Welcome!</h1>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >

        {/* EMAIL */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email wajib diisi" },
            { type: "email", message: "Format email tidak valid" },
          ]}
        >
          <Input
            size="large"
            placeholder="example@mail.com"
          />
        </Form.Item>

        {/* PASSWORD */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password wajib diisi" },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
          />
        </Form.Item>

        {/* BUTTON */}
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          loading={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </Form>
    </div>
  );
};

export default LoginForm;