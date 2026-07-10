import { create } from "zustand";

export type ActivePage =
  | "home"
  | "classroom"
  | "teacher"
  | "certificate"
  | "profile"
  | "material"
  | "feedback";

/* eslint-disable no-unused-vars */
type DashboardState = {
  page: ActivePage;
  setPage: (page: ActivePage) => void;
};
/* eslint-enable no-unused-vars */

const useDashboardStore = create<DashboardState>((set) => ({
  page: "home",
  setPage: (page) => set({ page }),
}));

export default useDashboardStore;
