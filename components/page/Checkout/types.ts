export interface CheckoutFormData {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    postalCode: string;
    city: string;
    country: string;
    cardNumber?: string;
    cardExp?: string;
    cardCvc?: string;
    cardName?: string;
    saveInfo?: boolean;
}

export type PaymentMethod = "card" | "paypal" | "apple";
