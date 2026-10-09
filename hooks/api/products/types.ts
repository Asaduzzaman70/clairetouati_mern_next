export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  discountPercentage?: number | null;
  stock: number;
  isActive: boolean;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: Product;
}
