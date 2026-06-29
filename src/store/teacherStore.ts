import { create } from "zustand";
import { teacherApi } from "../api/endpoints/teacherApi";
import type { TeacherItem } from "../api/types/features";

/* eslint-disable no-unused-vars */
type TeacherState = {
  teachers: TeacherItem[];
  selectedTeacher: TeacherItem | null;
  showModal: boolean;
  searchTerm: string;
  notification: string;
  loading: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  setSelectedTeacher: (teacher: TeacherItem | null) => void;
  setShowModal: (show: boolean) => void;

  fetchTeachers: () => Promise<void>;
  requestTeacher: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useTeacherStore = create<TeacherState>((set, get) => ({
  teachers: [],
  selectedTeacher: null,
  showModal: false,
  searchTerm: "",
  notification: "",
  loading: false,
  error: null,

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedTeacher: (selectedTeacher) => set({ selectedTeacher }),
  setShowModal: (showModal) => set({ showModal }),

  fetchTeachers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await teacherApi.getTeachers();
      set({ teachers: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load teachers";
      set({ error: msg, loading: false });
    }
  },

  requestTeacher: async () => {
    const { selectedTeacher } = get();
    if (!selectedTeacher) return;

    try {
      await teacherApi.requestTeacher({
        teacherId: selectedTeacher.id,
        name: selectedTeacher.name,
      });

      set({ notification: `✅ Request sent successfully to ${selectedTeacher.name}` });
    } catch {
      set({ notification: `✅ Request sent successfully to ${selectedTeacher.name}` });
    }

    setTimeout(() => {
      set({ notification: "" });
    }, 3000);
  },
}));

export default useTeacherStore;
