import axios from "axios";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useAuthStore, { ROLE_REDIRECT } from "../../../store/authStore";
import "./LoginForm.css";

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

      // Ambil user dari store setelah login berhasil
      const user = useAuthStore.getState().user;
      const redirectTo = user ? ROLE_REDIRECT[user.role] : "/student";

      message.success(`Login berhasil! Selamat datang, ${user?.name ?? "User"}.`);
      navigate(redirectTo);
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
        requiredMark={false}
      >
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
            placeholder="Samsoro12@gmail.com"
            suffix={<UserOutlined className="input-icon-suffix" />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password wajib diisi" },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="• • • • • • • • • • • •"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone twoToneColor="#4a4a4a" />
              ) : (
                <EyeInvisibleOutlined style={{ color: "#4a4a4a" }} />
              )
            }
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          block
          loading={loading}
          className="login-submit-btn"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;