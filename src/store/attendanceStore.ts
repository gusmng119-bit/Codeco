import { create } from "zustand";
import { attendanceApi } from "../api/endpoints/attendanceApi";
import type { AttendanceData, MarkAttendancePayload } from "../api/types/attendance";

/* eslint-disable no-unused-vars */
type AttendanceState = {
  attendanceRecords: AttendanceData[];
  loading: boolean;
  error: string | null;
  message: string | null;

  markAttendance: (payload: MarkAttendancePayload) => Promise<boolean>;
};
/* eslint-enable no-unused-vars */

const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendanceRecords: [],
  loading: false,
  error: null,
  message: null,

  markAttendance: async (payload) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await attendanceApi.markAttendance(payload);
      set({
        attendanceRecords: [...get().attendanceRecords, res.data],
        message: res.message,
        loading: false,
      });
      return true;
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to record attendance";
      set({ error: msg, loading: false });
      return false;
    }
  },
}));

export default useAttendanceStore;
