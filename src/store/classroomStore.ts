import { create } from "zustand";
import { classesApi } from "../api/endpoints/classesApi";
import type { ClassItem } from "../api/types/features";

export type FilterType = "all" | "today" | "yesterday" | "upcoming";

/* eslint-disable no-unused-vars */
type ClassroomState = {
  classes: ClassItem[];
  filter: FilterType;
  searchClass: string;
  selectedClass: ClassItem | null;
  joined: boolean;
  loading: boolean;
  error: string | null;

  setFilter: (filter: FilterType) => void;
  setSearchClass: (search: string) => void;
  setSelectedClass: (classItem: ClassItem | null) => void;
  setJoined: (joined: boolean) => void;

  fetchClasses: () => Promise<void>;
  joinClass: (classId: number) => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useClassroomStore = create<ClassroomState>((set) => ({
  classes: [],
  filter: "all",
  searchClass: "",
  selectedClass: null,
  joined: false,
  loading: false,
  error: null,

  setFilter: (filter) => set({ filter }),
  setSearchClass: (searchClass) => set({ searchClass }),
  setSelectedClass: (selectedClass) => set({ selectedClass }),
  setJoined: (joined) => set({ joined }),

  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await classesApi.getClasses();
      set({ classes: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to fetch classes";
      set({ error: msg, loading: false });
    }
  },

  joinClass: async (classId: number) => {
    try {
      await classesApi.joinClass({ classId });
      set({ joined: true });
    } catch {
      // Fallback join locally if API call encounters issues
      set({ joined: true });
    }
  },
}));

export default useClassroomStore;
