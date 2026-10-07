export type ColorCategory = string;

export interface LetterItem {
  id?: string;
  letter: string;
  lowercase: string;
  colorCategory: string;
  colorName: string;
  colorHex: string;
  badgeTextColor: string;
  exampleWord: string;
  exampleWordDisplay: string;
  translation: string;
  lowercaseLabel?: string;
  phoneticLetter: string;
  phoneticWord: string;
  modelURL?: string;
  order?: number;
  isActive?: boolean;
}

export interface ColorFilterOption {
  id: string;
  label: string;
  colorHex?: string;
  textColor?: string;
}
