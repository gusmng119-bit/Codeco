export type RetrieveSessionResponse = {
    id: number;
    class_id: number;
    teacher_id: number;
    start_time: string;
    end_time: string;
    status: string;
    created_at: string;
    updated_at: string;
};

export type UpdateSessionPayload = {
    start_time?: string;
    end_time?: string;
    teacher_id?: number;
};

export type DeleteSessionResponse = {
    message: string;
};

export type GenerateSessionResponse = {
    message: string;
    class_id: number;
};

export type GenerateSessionFailureResponse = {
    message: string;
};

export type markSessionCompletedResponse = {
    message: string;
};

export type markSessionCompletedFailureResponse = {
    message: string;
};
