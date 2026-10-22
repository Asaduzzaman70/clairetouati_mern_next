export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data: ContactInquiry;
}
