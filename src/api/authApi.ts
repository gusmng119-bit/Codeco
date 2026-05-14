import { createApiClient } from "./apiClient";
import { authEndpoints } from "./endpoints";

export type { LoginPayload, AuthResponse } from "./types";

export const authApi = createApiClient(authEndpoints);
