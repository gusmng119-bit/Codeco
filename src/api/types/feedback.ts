export type SubmitFeedbackPayload = {
  class_session_id: number;
  student_id: number;
  teacher_id: number;
  rating: number;
  comment: string;
};

export type FeedbackData = {
  id: number;
  class_session_id: number;
  student_id: number;
  teacher_id: number;
  rating: number;
  comment: string;
  submitted_at: string;
};

export type SubmitFeedbackResponse = {
  message: string;
  data: FeedbackData;
};

export type SubmitFeedbackFailureResponse = {
  message: string;
};

export type RetrieveFeedbackResponse = FeedbackData[];
