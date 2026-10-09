import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { Product, ProductApiResponse } from "./types";

export const PRODUCT_QUERY_KEY = ["GET_SINGLE_PRODUCT"] as const;

export function useGetProduct() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: async (): Promise<Product> => {
      const res = await apiPublic.get<ProductApiResponse>("/products");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
