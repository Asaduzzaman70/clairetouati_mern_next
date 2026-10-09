export interface CreateOrderCustomerAddress {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface CreateOrderPayload {
  productId?: string;
  quantity?: number;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  apartment?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber?: string;
  userId?: string | null;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: string;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: CreateOrderCustomerAddress;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderApiResponse {
  success: boolean;
  message: string;
  data: Order;
}
