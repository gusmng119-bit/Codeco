export type UserRole = "siswa" | "guru" | "admin";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    email: string;
    role: UserRole;
    name: string;
  };
};
