import { useMutation } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { ContactApiResponse, ContactInquiry, CreateContactPayload } from "./types";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (payload: CreateContactPayload): Promise<ContactApiResponse> => {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await apiPublic.post<ContactApiResponse>("/contacts", payload, { headers });
      return res.data;
    },
  });
}
