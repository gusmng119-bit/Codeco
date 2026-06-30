/**
 * Application Configuration
 * 
 * USE_LOCAL_FALLBACK:
 * - Set to `true` (or set env VITE_USE_LOCAL_FALLBACK="true"): Merges local storage / fallback demo data with API responses.
 * - Set to `false` (or set env VITE_USE_LOCAL_FALLBACK="false"): Purely gets and displays strictly whatever the Backend (BE) sends.
 * 
 * API_BASE_URL:
 * - Base URL for Axios requests (configured via env VITE_API_BASE_URL).
 * 
 * BYPASS_LOGIN:
 * - Set to `true` (or set env VITE_BYPASS_LOGIN="true"): Automatically bypasses login check and sets dummy token.
 * 
 * BYPASS_VALIDATION:
 * - Set to `true`: Accepts ANY non-empty username/password during mock login test.
 * - Set to `false`: Verifies credentials against MOCK_USER_EMAIL and MOCK_USER_PASSWORD.
 */
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
  BYPASS_VALIDATION:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BYPASS_VALIDATION !== undefined
      ? import.meta.env.VITE_BYPASS_VALIDATION === "true"
      : false,
  MOCK_USER_EMAIL:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_MOCK_USER_EMAIL
      ? import.meta.env.VITE_MOCK_USER_EMAIL
      : "student@codeco.com",
  MOCK_USER_PASSWORD:
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_MOCK_USER_PASSWORD
      ? import.meta.env.VITE_MOCK_USER_PASSWORD
      : "password123",
};

export default appConfig;
