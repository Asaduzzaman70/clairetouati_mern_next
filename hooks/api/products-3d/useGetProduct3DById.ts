import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { Product3D, SingleProduct3DApiResponse } from "./types";

export const PRODUCT_3D_BY_ID_QUERY_KEY = ["GET_3D_PRODUCT_BY_ID"] as const;

export function useGetProduct3DById(idOrLetter: string) {
  return useQuery({
    queryKey: [...PRODUCT_3D_BY_ID_QUERY_KEY, idOrLetter],
    queryFn: async (): Promise<Product3D> => {
      const res = await apiPublic.get<SingleProduct3DApiResponse>(`/products-3d/${idOrLetter}`);
      return res.data.data;
    },
    enabled: Boolean(idOrLetter),
    staleTime: 1000 * 60 * 5,
  });
}
