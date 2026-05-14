export type SubmitFeedbackPayload = {
    class_session_id: number;
    student_id: number;
    teacher_id: number;
    rating: number;
    comments: string;
};

export type SubmitFeedbackResponse = {
    message: string;
    data: {
        id: number;
        class_session_id: number;
        student_id: number;
        teacher_id: number;
        rating: number;
        comments: string;
        submitted_at: string;
    };
};

export type SubmitFeedbackFailureResponse = {
    message: string;
};

export type RetrieveFeedbackResponse = {
    id: number;
    class_session_id: number;
    student_id: number;
    teacher_id: number;
    rating: number;
    comments: string;
    submitted_at: string;
};
