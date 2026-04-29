# Fix Plan

## Issues Found:
1. **Dashboard.jsx**: `Profile` component referenced but not imported/defined; `setPage` not passed to `<Home />`; missing `"material"` case.
2. **Certificate.jsx**: Missing `export default` statement.
3. **package.json**: Invalid React (`^19.0.0`) and Ant Design (`^6.x`) versions causing dependency failures.
4. **Feedback.jsx**: Component name mismatch, fake links, CSS inconsistencies.

## Steps:
- [x] Create `src/features/Profile/Profile.jsx`
- [x] Fix `Dashboard.jsx` imports, pass `setPage` to `<Home />`, add `"material"` case
- [x] Fix `Certificate.jsx` export
- [x] Fix `package.json` dependency versions
- [x] Feedback.jsx & CSS: Rename component, fix data/CSS naming, improve modal
- [x] Run `npm install` and verify with `npm run dev`

