# TODO-fix (step 1)

## Completed
- Reviewed broken merge markers and undefined variables in:
  - `src/features/Dashboard/Dashboard.jsx`
  - `src/features/Home/Home.jsx`

## Next steps
- Fix `Dashboard.jsx`:
  - Remove conflict markers.
  - Define or replace `currentPage` usage.
  - Create `outletContext` and pass required values to nested routes.
  - Ensure correct imports for routed components.

- Fix `Home.jsx`:
  - Remove conflict markers.
  - Ensure `Home` uses `useOutletContext` OR props consistently.
  - Fix `downloadCertificate` body and close braces.

- Run `npm run dev` to verify compilation.

