/**
 * Application Configuration
 * 
 * USE_LOCAL_FALLBACK:
 * - Set to `true` (or set env VITE_USE_LOCAL_FALLBACK="true"): Merges local storage / fallback demo data with API responses.
 * - Set to `false` (or set env VITE_USE_LOCAL_FALLBACK="false"): Purely gets and displays strictly whatever the Backend (BE) sends.
 * 
 * API_BASE_URL:
 * - Base URL for Axios requests (configured via env VITE_API_BASE_URL).
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
};

export default appConfig;
