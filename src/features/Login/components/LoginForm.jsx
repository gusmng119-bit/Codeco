import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";


import "./LoginForm.css";

const LoginForm = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  /* ================= DUMMY DATABASE ================= */
  const users = [
    {
      email: "admin@mail.com",
      password: "admin123",
      role: "admin",
      name: "Admin",
    },
    {
      email: "guru@mail.com",
      password: "guru123",
      role: "guru",
      name: "Pak Guru",
    },
    {
      email: "siswa@mail.com",
      password: "siswa123",
      role: "siswa",
      name: "Budi",
    },
  ];

  /* ================= LOGIN ================= */
  const handleSubmit = (values) => {

    setLoading(true);

    setTimeout(() => {

      const user = users.find(
        (u) =>
          u.email === values.email &&
          u.password === values.password
      );

      if (!user) {
        message.error("Invalid email or password");
        setLoading(false);
        return;
      }

      // ✅ GLOBAL LOGIN (AuthContext)
      login(user);

      message.success(`Welcome ${user.name}!`);

      /* ================= ROLE REDIRECT ================= */
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "guru":
          navigate("/teacher");
          break;

        case "siswa":
          navigate("/student");
          break;


        default:
          navigate("/");
      }

      setLoading(false);

    }, 700);
  };

  return (
    <div className="login-form-container">

      <h1 className="login-title">Welcome!</h1>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email wajib diisi" },
            { type: "email", message: "Format email tidak valid" },
          ]}
        >
          <Input size="large" placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password wajib diisi" },
          ]}
        >
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>

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