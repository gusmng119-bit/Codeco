import { createApiClient, defineEndpoint } from "../core/apiClient";
import type {
  SubmitFeedbackPayload,
  SubmitFeedbackResponse,
  RetrieveFeedbackResponse,
} from "../types/feedback";
import type { FeedbackItem } from "../types/features";

export const feedbackEndpoints = {
  getFeedback: defineEndpoint<void, FeedbackItem[]>({
    url: "/feedback",
    method: "get",
  }),
  getApiFeedback: defineEndpoint<void, RetrieveFeedbackResponse>({
    url: "/api/feedback",
    method: "get",
  }),
  submitFeedback: defineEndpoint<SubmitFeedbackPayload, SubmitFeedbackResponse>({
    url: "/api/feedback",
    method: "post",
    requestStyle: "json",
  }),
};

export const feedbackApi = createApiClient(feedbackEndpoints);
