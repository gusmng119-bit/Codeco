/**
 * Application Configuration
 *
 * USE_LOCAL_FALLBACK:
 * - true  → Merges local mock / fallback data with API responses.
 * - false → Purely uses whatever the Backend (BE) sends.
 *
 * API_BASE_URL:
 * - Base URL for Axios requests (configured via env VITE_API_BASE_URL).
 *
 * BYPASS_LOGIN:
 * - true  → Automatically bypasses login check and sets a dummy token on startup.
 *
 * BYPASS_LOGIN_ROLE:
 * - Role yang dipakai saat BYPASS_LOGIN=true. Default: "siswa".
 * - Valid values: "siswa" | "guru" | "admin"
 *
 * BYPASS_VALIDATION:
 * - true  → Accepts ANY non-empty email/password during mock login (role dari BYPASS_LOGIN_ROLE).
 * - false → Verifies against MOCK_USERS in authMock (siswa/guru/admin@codeco.com).
 */

import type { UserRole } from "../api/types/auth";

export const appConfig = {
  USE_LOCAL_FALLBACK:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_USE_LOCAL_FALLBACK !== undefined
      ? import.meta.env.VITE_USE_LOCAL_FALLBACK === "true"
      : true,

  API_BASE_URL:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL
      : "/",

  BYPASS_LOGIN:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BYPASS_LOGIN !== undefined
      ? import.meta.env.VITE_BYPASS_LOGIN === "true"
      : false,

  BYPASS_LOGIN_ROLE: (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BYPASS_LOGIN_ROLE
      ? import.meta.env.VITE_BYPASS_LOGIN_ROLE
      : "siswa"
  ) as UserRole,

  BYPASS_VALIDATION:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BYPASS_VALIDATION !== undefined
      ? import.meta.env.VITE_BYPASS_VALIDATION === "true"
      : false,
};

export default appConfig;
