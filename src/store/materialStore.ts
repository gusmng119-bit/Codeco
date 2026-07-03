import { create } from "zustand";
import { materialApi } from "../api/endpoints/materialApi";
import type { MaterialItem } from "../api/types/features";

/* eslint-disable no-unused-vars */
type MaterialState = {
  materials: MaterialItem[];
  selectedMaterial: MaterialItem | null;
  loading: boolean;
  error: string | null;

  setSelectedMaterial: (item: MaterialItem | null) => void;
  fetchMaterials: (classId?: number) => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useMaterialStore = create<MaterialState>((set) => ({
  materials: [],
  selectedMaterial: null,
  loading: false,
  error: null,

  setSelectedMaterial: (selectedMaterial) => set({ selectedMaterial }),

  fetchMaterials: async (classId) => {
    set({ loading: true, error: null });
    try {
      const data = await materialApi.getMaterials({ classId });
      set({ materials: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load materials";
      set({ error: msg, loading: false });
    }
  },
}));

export default useMaterialStore;
