import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
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