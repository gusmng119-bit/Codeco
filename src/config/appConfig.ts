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
};

export default appConfig;
