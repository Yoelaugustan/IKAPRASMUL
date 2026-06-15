// Typed API client (axios). Base URL comes from env — never hardcoded.
// `api.get<T>()` resolves to the response body directly (not the AxiosResponse),
// keeping call sites terse. Used for direct calls to the .NET backend; the
// public forms go through same-origin BFF routes (see the form hooks).

import axios, { type AxiosRequestConfig } from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  headers: { "Content-Type": "application/json" },
  // Auth cookie is httpOnly and forwarded by the browser / BFF route handler.
  withCredentials: true,
});

export const api = {
  get: <T>(path: string, config?: AxiosRequestConfig) =>
    client.get<T>(path, config).then((r) => r.data),
  post: <T>(path: string, body?: unknown, config?: AxiosRequestConfig) =>
    client.post<T>(path, body, config).then((r) => r.data),
  put: <T>(path: string, body?: unknown, config?: AxiosRequestConfig) =>
    client.put<T>(path, body, config).then((r) => r.data),
  patch: <T>(path: string, body?: unknown, config?: AxiosRequestConfig) =>
    client.patch<T>(path, body, config).then((r) => r.data),
  delete: <T>(path: string, config?: AxiosRequestConfig) =>
    client.delete<T>(path, config).then((r) => r.data),
};
