export type CreateClassesPayload = {
  name: string;
  total_sessions: number;
  price: number;
};

export type ClassData = {
  id: number;
  name: string;
  total_sessions: number;
  price: number;
  updated_at?: string;
  created_at?: string;
};

export type ClassesResponse = {
  message: string;
  data: ClassData;
};

export type ClassesFailureResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export type GetClassesResponse = ClassData[];

export type UpdateClassesPayload = Partial<CreateClassesPayload>;

export type DeleteClassesResponse = {
  message: string;
};
