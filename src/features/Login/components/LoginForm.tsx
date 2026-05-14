import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      await login(values);
      message.success("Login successful! Welcome back.");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ?? "Invalid email or password."
        : "Invalid email or password.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
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

