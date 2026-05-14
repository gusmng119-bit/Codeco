import type { AxiosRequestConfig, Method } from "axios";
import axiosClient from "./axiosClient";

export type RequestStyle = "json" | "form-data" | "urlencoded";
export type ApiMethod = "get" | "post" | "put" | "patch" | "delete";

export interface ApiEndpoint<Req = unknown, Res = unknown> {
  url: string;
  method: ApiMethod;
  requestStyle?: RequestStyle;
  headers?: Record<string, string>;
  _requestType?: Req;
  _responseType?: Res;
}

export type ApiDefinitions = Record<string, ApiEndpoint<unknown, unknown>>;

export const defineEndpoint = <Req = unknown, Res = unknown>(endpoint: ApiEndpoint<Req, Res>) => endpoint;

 
type ApiFunction<E extends ApiEndpoint<unknown, unknown>> = (
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // _payload?: E extends ApiEndpoint<infer Req, unknown> ? Req : unknown,
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // _config?: AxiosRequestConfig,
) => Promise<E extends ApiEndpoint<unknown, infer Res> ? Res : unknown>;

export type ApiClient<T extends ApiDefinitions> = {
  [K in keyof T]: ApiFunction<T[K]>;
};

const buildRequestBody = <Req>(payload: Req | undefined, requestStyle?: RequestStyle) => {
  if (payload === undefined) {
    return undefined;
  }

  if (requestStyle === "form-data") {
    const formData = new FormData();
    Object.entries(payload as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    return formData;
  }

  if (requestStyle === "urlencoded") {
    const params = new URLSearchParams();
    Object.entries(payload as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    return params;
  }

  return payload;
};

const createRequest = async <Req, Res>(
  endpoint: ApiEndpoint<Req, Res>,
  payload?: Req,
  config?: AxiosRequestConfig,
): Promise<Res> => {
  const requestConfig: AxiosRequestConfig = {
    url: endpoint.url,
    method: endpoint.method as Method,
    headers: {
      Accept: "application/json",
      ...endpoint.headers,
      ...(config?.headers ?? {}),
    },
    ...config,
  };

  if (endpoint.method === "get" || endpoint.method === "delete") {
    requestConfig.params = payload;
  } else {
    requestConfig.data = buildRequestBody(payload, endpoint.requestStyle);
  }

  return axiosClient.request<Res>(requestConfig).then((response) => response.data);
};

export const createApiClient = <T extends ApiDefinitions>(endpoints: T): ApiClient<T> => {
  const client = {} as ApiClient<T>;

  Object.keys(endpoints).forEach((key) => {
    const endpoint = endpoints[key];
    client[key as keyof T] = ((_payload?: unknown, _config?: AxiosRequestConfig) =>
      createRequest(endpoint as ApiEndpoint<unknown, unknown>, _payload as unknown, _config)) as ApiFunction<T[keyof T]>;
  });

  return client;
};
