export type MarkAttendancePayload = {
  class_session_id: number;
  student_id: number;
  status: string;
};

export type AttendanceData = {
  id: number;
  class_session_id: number;
  student_id: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MarkAttendanceResponse = {
  message: string;
  data: AttendanceData;
};

export type MarkAttendanceFailureResponse = {
  message: string;
};
