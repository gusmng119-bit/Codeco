import { createApiClient, defineEndpoint } from "../core/apiClient";
import type {
  MarkAttendancePayload,
  MarkAttendanceResponse,
} from "../types/attendance";

export const attendanceEndpoints = {
  markAttendance: defineEndpoint<MarkAttendancePayload, MarkAttendanceResponse>({
    url: "/api/attendance",
    method: "post",
    requestStyle: "json",
  }),
};

export const attendanceApi = createApiClient(attendanceEndpoints);
