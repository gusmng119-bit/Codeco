import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type FeedbackStudent = {
  id: number;
  name: string;
  avatar: string;
  status: "Belum diisi" | "Selesai";
  statusType: "pending" | "success";
  feedback: string;
  filledTime?: string;
};

type TeacherFeedbackState = {
  students: FeedbackStudent[];
  loading: boolean;
  error: string | null;

  fetchStudents: () => Promise<void>;
  saveFeedback: (studentId: number, feedbackText: string) => void;
};
/* eslint-enable no-unused-vars */

const useTeacherFeedbackStore = create<TeacherFeedbackState>((set, get) => ({
  students: [],
  loading: false,
  error: null,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<FeedbackStudent[]>("/teacher/feedback-students");
      set({ students: res.data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load students";
      set({ error: msg, loading: false });
    }
  },

  saveFeedback: (studentId, feedbackText) => {
    const now = new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
    set({
      students: get().students.map((s) =>
        s.id === studentId
          ? { ...s, status: "Selesai", statusType: "success", feedback: feedbackText, filledTime: `Diisi: ${now}` }
          : s
      ),
    });
  },
}));

export default useTeacherFeedbackStore;
