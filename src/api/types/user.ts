export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
  updated_at: string;
  created_at: string;
};

export type UserResponse = {
  message: string;
  data: UserData;
};

export type UserFailureResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export type GetUserResponse = UserData[];

export type UpdateUserPayload = Partial<CreateUserPayload>;

export type DeleteUserResponse = {
  message: string;
};
