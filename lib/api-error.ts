import axios from "axios";

export interface BackendErrorResponse {
  success: boolean;
  message: string;
  errors?: Array<{ field?: string; message: string }>;
}

/**
 * Extracts a readable, user-friendly error string from an unknown error,
 * prioritizing backend validation messages and Axios error payloads.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorResponse | undefined;
    if (data?.errors && data.errors.length > 0) {
      return data.errors.map((e) => e.message).join(", ");
    }
    if (data?.message) {
      return data.message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Extracts a map of field names to error messages from a validation error response.
 */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorResponse | undefined;
    if (data?.errors && Array.isArray(data.errors)) {
      const fieldErrors: Record<string, string> = {};
      data.errors.forEach((err) => {
        if (err.field) {
          fieldErrors[err.field] = err.message;
        }
      });
      return fieldErrors;
    }
  }
  return {};
}
