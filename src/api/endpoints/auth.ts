import { defineEndpoint } from "../core/apiClient";
import type { AuthResponse, LoginPayload } from "../types/auth";

export const authEndpoints = {
  login: defineEndpoint<LoginPayload, AuthResponse>({
    url: "/auth/login",
    method: "post",
    requestStyle: "json",
  }),
};
