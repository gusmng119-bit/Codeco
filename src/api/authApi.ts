import axiosClient from "./axiosClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    email: string;
  };
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },
};
