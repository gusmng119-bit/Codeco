import { create } from "zustand";
import { feedbackApi } from "../api/endpoints/feedbackApi";
import type { FeedbackItem } from "../api/types/features";
import type { SubmitFeedbackPayload, FeedbackData } from "../api/types/feedback";

/* eslint-disable no-unused-vars */
type FeedbackState = {
  feedbackList: FeedbackItem[];
  apiFeedbackList: FeedbackData[];
  selectedItem: FeedbackItem | null;
  loading: boolean;
  error: string | null;

  setSelectedItem: (item: FeedbackItem | null) => void;
  fetchFeedback: (materialId?: number) => Promise<void>;
  submitFeedback: (payload: SubmitFeedbackPayload) => Promise<FeedbackData | null>;
};
/* eslint-enable no-unused-vars */

const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbackList: [],
  apiFeedbackList: [],
  selectedItem: null,
  loading: false,
  error: null,

  setSelectedItem: (selectedItem) => set({ selectedItem }),

  fetchFeedback: async (materialId) => {
    set({ loading: true, error: null });
    try {
      const data = await feedbackApi.getFeedback({ materialId });
      const apiData = await feedbackApi.getApiFeedback().catch(() => []);
      set({ feedbackList: data, apiFeedbackList: apiData, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load feedback";
      set({ error: msg, loading: false });
    }
  },

  submitFeedback: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await feedbackApi.submitFeedback(payload);
      set({ apiFeedbackList: [...get().apiFeedbackList, res.data], loading: false });
      return res.data;
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to submit feedback";
      set({ error: msg, loading: false });
      return null;
    }
  },
}));

export default useFeedbackStore;
