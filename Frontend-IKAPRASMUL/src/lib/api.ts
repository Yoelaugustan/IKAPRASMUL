// Shared browser-side axios instance for same-origin BFF calls (/api/*).
// Normalises error messages from the backend shape ({ error?, title? }) so
// callers always catch plain Error instances.
// 401 on any non-login route means the refresh token has expired — auto-redirect
// to sign-in so the user never sees a raw auth error.

import axios, { type AxiosError } from "axios";

export const client = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ error?: string; title?: string }>) => {
    const url = err.config?.url ?? "";
    if (
      err.response?.status === 401 &&
      typeof window !== "undefined" &&
      !url.includes("/auth/login")
    ) {
      window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
    }
    const message =
      err.response?.data?.error ??
      err.response?.data?.title ??
      err.message;
    return Promise.reject(new Error(message));
  },
);
