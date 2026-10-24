export interface TurrimPillarItem {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  letters: string[];
  imageUrl?: string;
  rotations?: number[];
}

export interface TurrimInfoSectionData {
  sections: TurrimPillarItem[];
}

export interface CuriosityItem {
  letter: string;
  title: string;
  description: string;
  color: string;
  background?: string;
}

export interface CuriosityCarouselSectionData {
  title: string;
  subtitle: string;
  items: CuriosityItem[];
}

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface TestimonialsSectionData {
  title: string;
  items: TestimonialItem[];
}

export interface HomeCmsContent {
  turrimInfo?: TurrimInfoSectionData;
  curiosity?: CuriosityCarouselSectionData;
  testimonials?: TestimonialsSectionData;
  [key: string]: unknown;
}

export interface ICmsSeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  [key: string]: unknown;
}

export interface ICmsPageResponse<T = Record<string, any>> {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  content: T;
  status: "published" | "draft" | "archived";
  metadata?: ICmsSeoMetadata;
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsApiResponse<T = Record<string, any>> {
  success: boolean;
  message?: string;
  data: ICmsPageResponse<T>;
}
