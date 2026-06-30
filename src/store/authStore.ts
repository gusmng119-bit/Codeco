import { create } from "zustand";
import { authApi, type LoginPayload } from "../api/endpoints/authApi";
import type { UserRole } from "../api/types/auth";
import appConfig from "../config/appConfig";

/* ======================================================
   HELPERS
====================================================== */

/**
 * Decode user payload from base64-encoded token.
 * Token format: btoa(JSON.stringify({ email, role, name }))
 */
const decodeToken = (token: string): { email: string; role: UserRole; name: string } | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

const ROLE_REDIRECT: Record<UserRole, string> = {
  siswa: "/student",
  guru: "/teacher",
  admin: "/admin",
};

export { ROLE_REDIRECT };

/* ======================================================
   STORE TYPES
====================================================== */

/* eslint-disable no-unused-vars */
type AuthUser = {
  email: string;
  role: UserRole;
  name: string;
};

type LoginFn = (payload: LoginPayload) => Promise<void>;
type SetTokenFn = (token: string | null) => void;
/* eslint-enable no-unused-vars */

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  login: LoginFn;
  logout: () => void;
  setToken: SetTokenFn;
};

/* ======================================================
   INITIAL STATE
====================================================== */

const getInitialState = (): { token: string | null; user: AuthUser | null } => {
  if (typeof window === "undefined") return { token: null, user: null };

  const storedToken = localStorage.getItem("jwtToken");
  if (storedToken) {
    const decoded = decodeToken(storedToken);
    if (decoded) return { token: storedToken, user: decoded };
  }

  if (appConfig.BYPASS_LOGIN) {
    const role = appConfig.BYPASS_LOGIN_ROLE;
    const bypassUser: AuthUser = { email: `${role}@codeco.com`, role, name: "Demo User" };
    const bypassToken = btoa(JSON.stringify(bypassUser));
    localStorage.setItem("jwtToken", bypassToken);
    return { token: bypassToken, user: bypassUser };
  }

  return { token: null, user: null };
};

/* ======================================================
   STORE
====================================================== */

const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  login: async (payload) => {
    const auth = await authApi.login(payload);

    if (typeof window !== "undefined") {
      localStorage.setItem("jwtToken", auth.token);
      window.dispatchEvent(new Event("jwt-token-change"));
    }

    set({ token: auth.token, user: auth.user as AuthUser });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
      window.dispatchEvent(new Event("jwt-token-change"));
    }
    set({ token: null, user: null });
  },

  setToken: (token) => {
    if (!token) {
      set({ token: null, user: null });
      return;
    }
    const decoded = decodeToken(token);
    set({ token, user: decoded });
  },
}));

export default useAuthStore;
