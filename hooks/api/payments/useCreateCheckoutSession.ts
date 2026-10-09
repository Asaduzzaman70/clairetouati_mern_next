import { useMutation } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { CreateCheckoutSessionPayload, CheckoutSessionData, CheckoutSessionApiResponse } from "./types";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (payload: CreateCheckoutSessionPayload): Promise<CheckoutSessionData> => {
      const res = await apiPublic.post<CheckoutSessionApiResponse>(
        "/payments/create-checkout-session",
        payload
      );
      return res.data.data;
    },
  });
}
