import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { CmsApiResponse, ICmsPageResponse, HomeCmsContent, AboutCmsContent } from "./types";

export const CMS_QUERY_KEYS = {
  all: ["cms"] as const,
  bySlug: (slug: string) => ["cms", slug] as const,
};

export function useGetCmsPage<T = Record<string, any>>(slug: string) {
  return useQuery({
    queryKey: CMS_QUERY_KEYS.bySlug(slug),
    queryFn: async (): Promise<ICmsPageResponse<T>> => {
      const res = await apiPublic.get<CmsApiResponse<T>>(`/cms/${slug}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
}

export function useGetHomeCms() {
  return useGetCmsPage<HomeCmsContent>("home");
}

export function useGetAboutCms() {
  return useGetCmsPage<AboutCmsContent>("about");
}
