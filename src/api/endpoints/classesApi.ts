import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { ClassItem } from "../types/features";

export const classesEndpoints = {
  getClasses: defineEndpoint<void, ClassItem[]>({
    url: "/classes",
    method: "get",
  }),
  joinClass: defineEndpoint<{ classId: number }, { success: boolean; message: string }>({
    url: "/classes/join",
    method: "post",
    requestStyle: "json",
  }),
};

export const classesApi = createApiClient(classesEndpoints);
