import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { TeacherItem } from "../types/features";

export const teacherEndpoints = {
  getTeachers: defineEndpoint<void, TeacherItem[]>({
    url: "/teachers",
    method: "get",
  }),
  requestTeacher: defineEndpoint<{ teacherId: number; name: string }, { success: boolean; message: string }>({
    url: "/teachers/request",
    method: "post",
    requestStyle: "json",
  }),
};

export const teacherApi = createApiClient(teacherEndpoints);
