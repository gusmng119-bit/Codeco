import { create } from "zustand";
import { classesApi } from "../api/endpoints/classesApi";
import type { ClassItem } from "../api/types/features";
import type { CreateClassesPayload, ClassData } from "../api/types/classes";
import appConfig from "../config/appConfig";

export type FilterType = "all" | "today" | "yesterday" | "upcoming";

/* eslint-disable no-unused-vars */
type ClassroomState = {
  classes: ClassItem[];
  apiClasses: ClassData[];
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
  createClass: (payload: CreateClassesPayload) => Promise<ClassData | null>;
};
/* eslint-enable no-unused-vars */

const useClassroomStore = create<ClassroomState>((set, get) => ({
  classes: [],
  apiClasses: [],
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
      const apiData = await classesApi.getApiClasses().catch(() => []);
      set({ classes: data, apiClasses: apiData, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to fetch classes";
      set({ error: msg, loading: false });
    }
  },

  joinClass: async (classId: number) => {
    try {
      await classesApi.joinClass({ classId });
      set({ joined: true });
    } catch (err: unknown) {
      if (appConfig.USE_LOCAL_FALLBACK) {
        set({ joined: true });
      } else {
        const msg = (err as { message?: string })?.message || "Failed to join class";
        set({ error: msg });
      }
    }
  },

  createClass: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await classesApi.createClass(payload);
      set({ apiClasses: [...get().apiClasses, res.data], loading: false });
      return res.data;
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to create class";
      set({ error: msg, loading: false });
      return null;
    }
  },
}));

export default useClassroomStore;
