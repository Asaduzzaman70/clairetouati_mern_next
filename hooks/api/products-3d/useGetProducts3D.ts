import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { Product3D, Product3DFilterParams, Products3DApiResponse } from "./types";

export const PRODUCTS_3D_QUERY_KEY = ["GET_3D_PRODUCTS"] as const;

export function useGetProducts3D(params?: Product3DFilterParams) {
  return useQuery({
    queryKey: params ? [...PRODUCTS_3D_QUERY_KEY, params] : PRODUCTS_3D_QUERY_KEY,
    queryFn: async (): Promise<Product3D[]> => {
      const res = await apiPublic.get<Products3DApiResponse>("/products-3d", {
        params,
      });
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
