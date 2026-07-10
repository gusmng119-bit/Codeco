import { createApiClient, defineEndpoint } from "../core/apiClient";
import type {
  CreateUserPayload,
  UserResponse,
  GetUserResponse,
  UpdateUserPayload,
  DeleteUserResponse,
} from "../types/user";

export const userEndpoints = {
  createUser: defineEndpoint<CreateUserPayload, UserResponse>({
    url: "/api/users",
    method: "post",
    requestStyle: "json",
  }),
  getUsers: defineEndpoint<void, GetUserResponse>({
    url: "/api/users",
    method: "get",
  }),
  updateUser: defineEndpoint<{ id: number; data: UpdateUserPayload }, UserResponse>({
    url: "/api/users",
    method: "put",
    requestStyle: "json",
  }),
  deleteUser: defineEndpoint<{ id: number }, DeleteUserResponse>({
    url: "/api/users",
    method: "delete",
  }),
};

export const userApi = createApiClient(userEndpoints);
