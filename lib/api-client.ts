import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Public API client: Used for unauthenticated endpoints such as:
 * - Login & Registration
 * - OTP Verification & Password Reset
 * - Public Course & Product Catalog
 * - 3D Models & Phonics assets
 */
export const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

/**
 * Authenticated API client: Automatically injects JWT Bearer token
 * and handles token refresh or expired session redirects.
 */
export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach Access Token from localStorage if present
apiPrivate.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Refresh Token or Expired Sessions (401)
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt silent token refresh via refresh endpoint
        const res = await apiPublic.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.accessToken;

        if (newAccessToken && typeof window !== "undefined") {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiPrivate(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth state and redirect to sign-in
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/sign-in";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
