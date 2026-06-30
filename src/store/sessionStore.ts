import { create } from "zustand";
import { sessionsApi } from "../api/endpoints/sessionsApi";
import type { SessionItem } from "../api/types/sessions";

/* eslint-disable no-unused-vars */
type SessionState = {
  sessions: SessionItem[];
  loading: boolean;
  error: string | null;
  message: string | null;

  fetchSessions: () => Promise<void>;
  generateSessions: (classId: number) => Promise<void>;
  completeSession: (sessionId: number) => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  loading: false,
  error: null,
  message: null,

  fetchSessions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await sessionsApi.getSessions();
      set({ sessions: data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { error?: string; message?: string })?.error || (err as { message?: string })?.message || "Failed to fetch sessions";
      set({ error: msg, loading: false });
    }
  },

  generateSessions: async (class_id) => {
    set({ loading: true, error: null });
    try {
      const res = await sessionsApi.generateSessions({ class_id });
      set({ message: res.message, loading: false });
    } catch (err: unknown) {
      const msg = (err as { error?: string; message?: string })?.error || "Failed to generate sessions";
      set({ error: msg, loading: false });
    }
  },

  completeSession: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await sessionsApi.completeSession({ id });
      set({ message: res.message, loading: false });
    } catch (err: unknown) {
      const msg = (err as { error?: string; message?: string })?.error || "Failed to complete session";
      set({ error: msg, loading: false });
    }
  },
}));

export default useSessionStore;
