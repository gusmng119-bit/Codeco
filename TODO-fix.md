# TODO - Fix login -> dashboard flow

## Step 1 (Auth key consistency)
- Update `src/shared/security/login.route.jsx`
  - Change auth check from `localStorage.getItem("jwtToken")` to `localStorage.getItem("isLoggedIn") === "true"`.

- Update `src/shared/security/protected.route.jsx`
  - Change auth check from `localStorage.getItem("jwtToken")` to `localStorage.getItem("isLoggedIn") === "true"`.

## Step 2 (Verification)
- Run the app and verify:
  - Fresh state: `/` shows Login
  - After login: redirect to `/dashboard`
  - After logout: `/dashboard` is blocked and redirects to `/`

