import { useMutation } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { CreateOrderPayload, Order, OrderApiResponse } from "./types";

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload): Promise<Order> => {
      const res = await apiPublic.post<OrderApiResponse>("/orders", payload);
      return res.data.data;
    },
  });
}
