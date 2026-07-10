import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type TeacherClassItem = {
  id: number;
  title: string;
  students: number;
  progress: number;
  color: string;
  status: "Active" | "Done";
  schedule: string;
  time: string;
};

type TeacherClassState = {
  classes: TeacherClassItem[];
  searchTerm: string;
  loading: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  fetchClasses: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useTeacherClassStore = create<TeacherClassState>((set) => ({
  classes: [],
  searchTerm: "",
  loading: false,
  error: null,

  setSearchTerm: (searchTerm) => set({ searchTerm }),

  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<TeacherClassItem[]>("/teacher/classes");
      set({ classes: res.data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load classes";
      set({ error: msg, loading: false });
    }
  },
}));

export default useTeacherClassStore;
