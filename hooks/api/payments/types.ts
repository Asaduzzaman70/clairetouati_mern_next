export interface CreateCheckoutSessionPayload {
  orderId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionData {
  checkoutUrl: string;
  sessionId: string;
  paymentId: string;
}

export interface CheckoutSessionApiResponse {
  success: boolean;
  message: string;
  data: CheckoutSessionData;
}
