import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type AdminStudent = {
  id: number;
  name: string;
  email: string;
  class: string;
  grade: string;
  status: "Active" | "Inactive";
  avatar?: string;
};

type AdminStudentState = {
  students: AdminStudent[];
  searchTerm: string;
  loading: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  fetchStudents: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useAdminStudentStore = create<AdminStudentState>((set) => ({
  students: [],
  searchTerm: "",
  loading: false,
  error: null,

  setSearchTerm: (searchTerm) => set({ searchTerm }),

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<AdminStudent[]>("/admin/students");
      set({ students: res.data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load students";
      set({ error: msg, loading: false });
    }
  },
}));

export default useAdminStudentStore;
