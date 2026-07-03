import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { MaterialItem } from "../types/features";

export const materialEndpoints = {
  getMaterials: defineEndpoint<{ classId?: number }, MaterialItem[]>({
    url: "/materials",
    method: "get",
  }),
};

export const materialApi = createApiClient(materialEndpoints);
