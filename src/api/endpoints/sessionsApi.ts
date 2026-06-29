import { createApiClient, defineEndpoint } from "../core/apiClient";
import type {
  RetrieveSessionResponse,
  UpdateSessionPayload,
  DeleteSessionResponse,
  GenerateSessionResponse,
  markSessionCompletedResponse,
} from "../types/sessions";

export const sessionsEndpoints = {
  getSessions: defineEndpoint<void, RetrieveSessionResponse>({
    url: "/api/sessions",
    method: "get",
  }),
  updateSession: defineEndpoint<{ id: number; data: UpdateSessionPayload }, RetrieveSessionResponse[number]>({
    url: "/api/sessions",
    method: "put",
    requestStyle: "json",
  }),
  deleteSession: defineEndpoint<{ id: number }, DeleteSessionResponse>({
    url: "/api/sessions",
    method: "delete",
  }),
  generateSessions: defineEndpoint<{ class_id: number }, GenerateSessionResponse>({
    url: "/api/generate-sessions",
    method: "post",
    requestStyle: "json",
  }),
  completeSession: defineEndpoint<{ id: number }, markSessionCompletedResponse>({
    url: "/api/sessions/complete",
    method: "post",
    requestStyle: "json",
  }),
};

export const sessionsApi = createApiClient(sessionsEndpoints);
