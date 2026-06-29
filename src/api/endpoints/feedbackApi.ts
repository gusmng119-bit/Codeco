import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { FeedbackItem } from "../types/features";

export const feedbackEndpoints = {
  getFeedback: defineEndpoint<void, FeedbackItem[]>({
    url: "/feedback",
    method: "get",
  }),
};

export const feedbackApi = createApiClient(feedbackEndpoints);
