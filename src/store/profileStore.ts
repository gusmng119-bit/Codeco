import { create } from "zustand";
import { profileApi } from "../api/endpoints/profileApi";
import type { ProfileData } from "../api/types/features";

/* eslint-disable no-unused-vars */
type ProfileState = {
  profile: ProfileData | null;
  editMode: boolean;
  loading: boolean;
  error: string | null;

  setEditMode: (editMode: boolean) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (updated: Partial<ProfileData>) => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  editMode: false,
  loading: false,
  error: null,

  setEditMode: (editMode) => set({ editMode }),

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const data = await profileApi.getProfile();
      set({ profile: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load profile";
      set({ error: msg, loading: false });
    }
  },

  updateProfile: async (updated) => {
    set({ loading: true, error: null });
    try {
      const data = await profileApi.updateProfile(updated);
      set({ profile: data, loading: false, editMode: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to update profile";
      set({ error: msg, loading: false });
    }
  },
}));

export default useProfileStore;
