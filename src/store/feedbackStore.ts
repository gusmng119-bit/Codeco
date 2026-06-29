import { create } from "zustand";
import { feedbackApi } from "../api/endpoints/feedbackApi";
import type { FeedbackItem } from "../api/types/features";

/* eslint-disable no-unused-vars */
type FeedbackState = {
  feedbackList: FeedbackItem[];
  selectedItem: FeedbackItem | null;
  loading: boolean;
  error: string | null;

  setSelectedItem: (item: FeedbackItem | null) => void;
  fetchFeedback: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbackList: [],
  selectedItem: null,
  loading: false,
  error: null,

  setSelectedItem: (selectedItem) => set({ selectedItem }),

  fetchFeedback: async () => {
    set({ loading: true, error: null });
    try {
      const data = await feedbackApi.getFeedback();
      set({ feedbackList: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load feedback";
      set({ error: msg, loading: false });
    }
  },
}));

export default useFeedbackStore;
