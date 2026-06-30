import { create } from "zustand";
import axiosClient from "../api/core/axiosClient";

/* eslint-disable no-unused-vars */
export type CalendarEvent = {
  id: number;
  dayIndex: number; // 0=Sun … 6=Sat
  time: string;
  displayTime: string;
  teacher: string;
  subject: string;
  type: string;
};

type TeacherCalendarState = {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;

  fetchEvents: () => Promise<void>;
};
/* eslint-enable no-unused-vars */

const useTeacherCalendarStore = create<TeacherCalendarState>((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get<CalendarEvent[]>("/teacher/calendar-events");
      set({ events: res.data, loading: false });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to load calendar";
      set({ error: msg, loading: false });
    }
  },
}));

export default useTeacherCalendarStore;
