import { create } from "zustand";
import { authApi, type LoginPayload } from "../api/endpoints/authApi";

/* eslint-disable no-unused-vars */
type LoginFn = (payload: LoginPayload) => Promise<void>;
type SetTokenFn = (token: string | null) => void;
/* eslint-enable no-unused-vars */

type AuthState = {
  token: string | null;
  user: { email: string } | null;
  login: LoginFn;
  logout: () => void;
  setToken: SetTokenFn;
};

const getInitialToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  user: null,
  login: async (payload) => {
    const auth = await authApi.login(payload);

    if (typeof window !== "undefined") {
      localStorage.setItem("jwtToken", auth.token);
      window.dispatchEvent(new Event("jwt-token-change"));
    }

    set({ token: auth.token, user: auth.user });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
      window.dispatchEvent(new Event("jwt-token-change"));
    }

    set({ token: null, user: null });
  },
  setToken: (token) => {
    set({ token, user: token ? { email: "" } : null });
  },
}));

export default useAuthStore;
