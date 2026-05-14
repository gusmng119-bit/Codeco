import { defineEndpoint } from "./apiClient";
import type { AuthResponse, LoginPayload } from "./types";

export const authEndpoints = {
  login: defineEndpoint<LoginPayload, AuthResponse>({
    url: "/auth/login",
    method: "post",
    requestStyle: "json",
  }),
};
