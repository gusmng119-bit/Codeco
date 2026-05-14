import { createApiClient } from "../core/apiClient";
import { authEndpoints } from "./auth";

export type { LoginPayload, AuthResponse } from "../types/auth";

export const authApi = createApiClient(authEndpoints);
