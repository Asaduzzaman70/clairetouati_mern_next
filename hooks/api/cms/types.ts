export type HeroShapeType = "circle" | "rectangle" | "triangle";

export interface HeroShapeItem {
  id?: string | number;
  type: HeroShapeType;
  color: string;
  baseSize: number;
  text?: string;
}

export interface HeroSectionData {
  shapes?: HeroShapeItem[];
}

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
  hero?: HeroSectionData;
  turrimInfo?: TurrimInfoSectionData;
  curiosity?: CuriosityCarouselSectionData;
  testimonials?: TestimonialsSectionData;
  [key: string]: unknown;
}

export interface AboutStorySectionData {
  title: string;
  image?: string;
  introText: string;
  bioText: string;
}

export interface FoundersLetterSectionData {
  title: string;
  quote: string;
  letterBody: string;
  signature: string;
  bgColor: string;
}

export interface ArchitectureABCItem {
  id: number;
  title: string;
  imageUrl?: string;
}

export interface ArchitectureABCSectionData {
  title: string;
  images: ArchitectureABCItem[];
}

export interface ScienceOfPlayCard {
  title: string;
  description: string;
}

export interface ScienceOfPlaySectionData {
  badge: string;
  title: string;
  description: string;
  bgColor: string;
  cards: ScienceOfPlayCard[];
}

export interface ValueCardItem {
  id?: number | string;
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
}

export interface OurValuesSectionData {
  title: string;
  values: ValueCardItem[];
}

export interface PrincipleItem {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface OurApproachSectionData {
  badge: string;
  title: string;
  subtitle: string;
  principles: PrincipleItem[];
}

export interface AboutCmsContent {
  story?: AboutStorySectionData;
  letter?: FoundersLetterSectionData;
  architecture?: ArchitectureABCSectionData;
  scienceOfPlay?: ScienceOfPlaySectionData;
  values?: OurValuesSectionData;
  approach?: OurApproachSectionData;
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
