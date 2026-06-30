import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type AdminClass = {
  id: number;
  name: string;
  teacher: string;
  totalStudents: number;
  schedule: string;
  status: "Active" | "Done";
};

type AdminClassState = {
  classes: AdminClass[];
  searchTerm: string;
  loading: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  fetchClasses: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useAdminClassStore = create<AdminClassState>((set) => ({
  classes: [],
  searchTerm: "",
  loading: false,
  error: null,

  setSearchTerm: (searchTerm) => set({ searchTerm }),

  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<AdminClass[]>("/admin/classes");
      set({ classes: res.data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load classes";
      set({ error: msg, loading: false });
    }
  },
}));

export default useAdminClassStore;
