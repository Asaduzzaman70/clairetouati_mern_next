import { useMutation } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { ContactApiResponse, ContactInquiry, CreateContactPayload } from "./types";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (payload: CreateContactPayload): Promise<ContactInquiry> => {
      const res = await apiPublic.post<ContactApiResponse>("/contacts", payload);
      return res.data.data;
    },
  });
}
