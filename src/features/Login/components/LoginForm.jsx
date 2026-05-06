import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./LoginForm.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Simulasi Auth sesuai kredensial demo kamu
    setTimeout(() => {
<<<<<<< HEAD:src/features/Login/components/LoginForm.jsx
      setLoading(false);
      message.success("Login successful!");
      // Store a dummy token in localStorage to simulate authentication
      localStorage.setItem("jwtToken", "dummy-jwt-token");
      window.dispatchEvent(new Event("jwt-token-change"));
=======
      const demoEmail = "gusmng119@gmail.com";
      const demoPassword = "admin123";
      
      if (values.email === demoEmail && values.password === demoPassword) {
        setLoading(false);
        message.success("Login successful! Welcome back.");
        localStorage.setItem("token", "fake-jwt-token");
        navigate("/dashboard");
      } else {
        setLoading(false);
        message.error("Invalid email or password.");
      }
>>>>>>> 94c6236 (fix: resolve husky eslint issues):src/features/login-new/components/LoginForm.jsx
    }, 1500);
  };

  return (
    <div className="login-form-container">
      {/* Title sesuai desain gambar */}
      <h1 className="login-title">Welcome!</h1>

      <Form 
        className="login-form" 
        layout="vertical" 
        onFinish={handleSubmit} 
        autoComplete="off"
        requiredMark={false} // Menghilangkan tanda bintang merah agar lebih clean
      >
        {/* Input Email */}
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

        {/* Input Password */}
        <Form.Item
  label="Password"
  name="password"
  rules={[{ required: true, message: "Please enter your password." }]}
>
  <Input.Password 
    placeholder="Enter your password"
    /* Hapus size="large" jika tingginya sudah diatur di CSS */
    variant="borderless" /* Menghilangkan border default AntD */
  />
</Form.Item>

        {/* Button Login */}
        <Form.Item style={{ marginTop: '20px' }}>
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