export type MarkAttenndancePayload = {
    class_session_id: number;
    student_id: number;
    status: "present" | "absent" | "late";
};

export type MarkAttendanceResponse = {
    message: string;
    data: {
        id: number;
        class_session_id: number;
        student_id: number;
        status: "present" | "absent" | "late";
        created_at: string;
        updated_at: string;
    };
};

export type MarkAttendanceFailureResponse = {
    message: string;
};
