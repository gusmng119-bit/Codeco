import { createApiClient, defineEndpoint } from "../core/apiClient";
import type {
  CreateClassesPayload,
  ClassesResponse,
  GetClassesResponse,
  UpdateClassesPayload,
  DeleteClassesResponse,
} from "../types/classes";
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
  getApiClasses: defineEndpoint<void, GetClassesResponse>({
    url: "/api/classes",
    method: "get",
  }),
  createClass: defineEndpoint<CreateClassesPayload, ClassesResponse>({
    url: "/api/classes",
    method: "post",
    requestStyle: "json",
  }),
  updateClass: defineEndpoint<{ id: number; data: UpdateClassesPayload }, ClassesResponse>({
    url: "/api/classes",
    method: "put",
    requestStyle: "json",
  }),
  deleteClass: defineEndpoint<{ id: number }, DeleteClassesResponse>({
    url: "/api/classes",
    method: "delete",
  }),
};

export const classesApi = createApiClient(classesEndpoints);
