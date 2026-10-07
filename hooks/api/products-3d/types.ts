export type ColorCategory = "Yellow" | "Orange" | "Rouge" | "Purple" | "Blue" | "Green";

export interface Product3D {
  id: string;
  letter: string;
  lowercase: string;
  colorCategory: ColorCategory;
  colorName: string;
  colorHex: string;
  badgeTextColor: string;
  exampleWord: string;
  exampleWordDisplay: string;
  translation: string;
  lowercaseLabel?: string;
  phoneticLetter: string;
  phoneticWord: string;
  modelURL: string;
  order?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product3DFilterParams {
  letter?: string;
  colorCategory?: string;
}

export interface Products3DApiResponse {
  success: boolean;
  message: string;
  data: Product3D[];
}

export interface SingleProduct3DApiResponse {
  success: boolean;
  message: string;
  data: Product3D;
}
