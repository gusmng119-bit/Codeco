import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { ProfileData } from "../types/features";

export const profileEndpoints = {
  getProfile: defineEndpoint<void, ProfileData>({
    url: "/profile",
    method: "get",
  }),
  updateProfile: defineEndpoint<Partial<ProfileData>, ProfileData>({
    url: "/profile",
    method: "put",
    requestStyle: "json",
  }),
};

export const profileApi = createApiClient(profileEndpoints);
