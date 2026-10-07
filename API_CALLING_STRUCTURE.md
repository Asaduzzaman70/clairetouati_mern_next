# API Calling Structure & Integration Guide for AI Agents

> **Project Target:** Clairetouati (Turrim) - Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Paired with Turrim MERN Backend (`turrim_backend_mern`).

Use this document as an authoritative, reusable reference guide for integrating RESTful APIs into the **Clairetouati / Turrim** front-end application. Any AI agent or developer adding new API interactions must follow these conventions strictly to maintain clean code, consistent cache synchronization, robust error handling, and type safety.

---

## 📋 Table of Contents

1. [Core Principles & Architectural Rules](#1-core-principles--architectural-rules)
2. [Prerequisites & Package Setup](#2-prerequisites--package-setup)
3. [Environment Variables](#3-environment-variables)
4. [Backend API Specifications & Envelope Format](#4-backend-api-specifications--envelope-format)
5. [Standard Folder Architecture](#5-standard-folder-architecture)
6. [Core Infrastructure Setup](#6-core-infrastructure-setup)
   - 6.1 [API Client (`lib/api-client.ts`)](#61-api-client-libapi-clientts)
   - 6.2 [API Error Handler (`lib/api-error.ts`)](#62-api-error-handler-libapi-errorts)
   - 6.3 [Query Client Provider (`components/providers/QueryProvider.tsx`)](#63-query-client-provider-componentsprovidersqueryprovidertsx)
7. [Feature-by-Feature API Integration Blueprints](#7-feature-by-feature-api-integration-blueprints)
   - 7.1 [Authentication Module (`hooks/api/auth/`)](#71-authentication-module-hooksapiauth)
   - 7.2 [User Profile & Settings Module (`hooks/api/user/`)](#72-user-profile--settings-module-hooksapiuser)
   - 7.3 [Course & Product Catalog Module (`hooks/api/products/`)](#73-course--product-catalog-module-hooksapiproducts)
   - 7.4 [3D Models & Playroom Phonics Module (`hooks/api/products-3d/`)](#74-3d-models--playroom-phonics-module-hooksapiproducts-3d)
   - 7.5 [Orders & Enrolled Courses Module (`hooks/api/orders/`)](#75-orders--enrolled-courses-module-hooksapiorders)
   - 7.6 [Stripe Payments Module (`hooks/api/payments/`)](#76-stripe-payments-module-hooksapipayments)
   - 7.7 [Notifications Module (`hooks/api/notifications/`)](#77-notifications-module-hooksapinotifications)
   - 7.8 [Media & Asset Upload Module (`hooks/api/upload/`)](#78-media--asset-upload-module-hooksapiupload)
8. [Connecting Hooks to Existing UI Components](#8-connecting-hooks-to-existing-ui-components)
9. [Cache Invalidation & Optimistic Updates Matrix](#9-cache-invalidation--optimistic-updates-matrix)
10. [AI Agent Implementation Checklist](#10-ai-agent-implementation-checklist)
11. [Prompt Template for Future AI Requests](#11-prompt-template-for-future-ai-requests)

---

## 1. Core Principles & Architectural Rules

### 🚫 Rule 1: No Direct API Calls in UI Components
- **NEVER** write `fetch()`, `axios.get()`, or `axios.post()` directly within `.tsx` page or UI components.
- **NEVER** handle token extraction or request header construction inside UI files.
- UI components should only consume custom TanStack Query hooks (e.g., `useGetProducts()`, `useLogin()`).

### 📦 Rule 2: Single Source of Truth for Data Fetching
- All GET requests must use **`useQuery`** with predictable, typed query keys.
- All POST, PUT, PATCH, and DELETE requests must use **`useMutation`** with cache invalidation and user feedback (via toast).

### 🏷️ Rule 3: Strict TypeScript Typing (No `any`)
- Define request payloads, query parameters, backend envelopes, and domain models.
- If the exact backend shape is uncertain, use `unknown` with a safe zod/type-guard instead of `any`.

### 🔄 Rule 4: Data Mapping at the Hook Level
- If the backend returns data in a structure different from what the UI expects, transform it inside the hook's `select` option or `queryFn`. Keep UI components clean and agnostic of backend data eccentricities.

---

## 2. Prerequisites & Package Setup

Install the required network and cache management packages if not already present:

```bash
npm install axios @tanstack/react-query sonner
```

---

## 3. Environment Variables

Define the API endpoint in your project root `.env.local`:

```env
# Local Backend Endpoint (Express.js runs on port 5000 by default)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Stripe Public Key for client-side payment confirmation
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

> [!IMPORTANT]
> The backend routes are versioned under `/api/v1`. Always ensure `NEXT_PUBLIC_API_URL` includes `/api/v1` or that endpoints are prefixed accordingly.

---

## 4. Backend API Specifications & Envelope Format

The paired backend (`turrim_backend_mern`) produces consistent JSON envelopes:

### Standard Success Response Envelope
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": { ... }
}
```

### Standard Paginated Response Envelope
```json
{
  "success": true,
  "message": "Items retrieved successfully",
  "data": {
    "items": [ ... ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 54,
      "totalPages": 6
    }
  }
}
```

### Standard Error Response Envelope
```json
{
  "success": false,
  "message": "Invalid email or password",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

---

## 5. Standard Folder Architecture

Organize all API integrations inside `lib/` and `hooks/api/`:

```plaintext
clairetouati_next_js_mern_front_end/
├── lib/
│   ├── api-client.ts             # Axios instances (apiPublic & apiPrivate) & interceptors
│   ├── api-error.ts              # Unified error extractor
│   └── utils.ts                  # Classname merging (cn)
├── components/
│   └── providers/
│       ├── QueryProvider.tsx     # TanStack Query Client wrapper
│       └── SmoothScrollProvider.tsx
├── hooks/
│   └── api/
│       ├── auth/                 # Login, Register, OTP, Reset Password
│       │   ├── useLogin.ts
│       │   ├── useRegister.ts
│       │   ├── useForgotPassword.ts
│       │   ├── useVerifyOtp.ts
│       │   ├── useResetPassword.ts
│       │   ├── useLogout.ts
│       │   ├── useCurrentUser.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       ├── user/                 # Profile & Password management
│       │   ├── useGetProfile.ts
│       │   ├── useUpdateProfile.ts
│       │   ├── useChangePassword.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       ├── products/             # Public courses & products catalog
│       │   ├── useGetProducts.ts
│       │   ├── useGetProductById.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       ├── products-3d/          # 3D interactive models & alphabet phonics
│       │   ├── useGetProducts3D.ts
│       │   ├── useGetProduct3DById.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       ├── orders/               # Course enrollments & purchase history
│       │   ├── useCreateOrder.ts
│       │   ├── useGetMyOrders.ts
│       │   ├── useGetOrderById.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       ├── payments/             # Stripe checkout integration
│       │   ├── useCreateCheckoutSession.ts
│       │   └── types.ts
│       ├── notifications/        # In-app notifications
│       │   ├── useGetNotifications.ts
│       │   ├── useMarkNotificationRead.ts
│       │   ├── useMarkAllNotificationsRead.ts
│       │   ├── queryKeys.ts
│       │   └── types.ts
│       └── upload/               # Cloudinary media uploads
│           ├── useUploadImage.ts
│           └── types.ts
```

---

## 6. Core Infrastructure Setup

### 6.1 API Client (`lib/api-client.ts`)

Create [lib/api-client.ts](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/lib/api-client.ts):

```ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Public API client: Used for registration, login, public course views, and OTP requests.
 */
export const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

/**
 * Authenticated API client: Injects JWT token and handles automatic authorization.
 */
export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach Access Token
apiPrivate.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Refresh Token or Expired Sessions
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt silent refresh
        const res = await apiPublic.post("/auth/refresh-token");
        const newAccessToken = res.data?.data?.accessToken;

        if (newAccessToken && typeof window !== "undefined") {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiPrivate(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear token and redirect to sign-in
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/sign-in";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### 6.2 API Error Handler (`lib/api-error.ts`)

Create [lib/api-error.ts](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/lib/api-error.ts):

```ts
import axios from "axios";

export interface BackendErrorResponse {
  success: boolean;
  message: string;
  errors?: Array<{ field?: string; message: string }>;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as BackendErrorResponse | undefined;
    if (data?.message) {
      return data.message;
    }
    if (data?.errors && data.errors.length > 0) {
      return data.errors.map((e) => e.message).join(", ");
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}
```

### 6.3 Query Client Provider (`components/providers/QueryProvider.tsx`)

Create [components/providers/QueryProvider.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/providers/QueryProvider.tsx):

```tsx
"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
            gcTime: 1000 * 60 * 30,    // 30 minutes garbage collection
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </QueryClientProvider>
  );
}
```

Mount `QueryProvider` inside `app/layout.tsx`:

```tsx
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

---

## 7. Feature-by-Feature API Integration Blueprints

### 7.1 Authentication Module (`hooks/api/auth/`)

#### Endpoints:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/verify-otp`
- `POST /auth/reset-password`
- `GET /auth/me`

#### Types (`hooks/api/auth/types.ts`):
```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar?: string;
  phoneNumber?: string;
  bio?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
```

#### Query Keys (`hooks/api/auth/queryKeys.ts`):
```ts
export const authQueryKeys = {
  all: ["AUTH"] as const,
  me: () => ["AUTH", "ME"] as const,
};
```

#### Hook: Login (`hooks/api/auth/useLogin.ts`):
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiPublic } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { LoginPayload, AuthResponse } from "./types";
import { authQueryKeys } from "./queryKeys";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await apiPublic.post<{ success: boolean; message: string; data: AuthResponse }>(
        "/auth/login",
        payload
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Logged in successfully!");
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      queryClient.setQueryData(authQueryKeys.me(), res.data.user);
      router.push("/dashboard/overview");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
```

#### Hook: Current User (`hooks/api/auth/useCurrentUser.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPrivate } from "@/lib/api-client";
import { User } from "./types";
import { authQueryKeys } from "./queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: async (): Promise<User> => {
      const res = await apiPrivate.get<{ success: boolean; data: User }>("/auth/me");
      return res.data.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}
```

---

### 7.2 User Profile & Settings Module (`hooks/api/user/`)

Used in `/dashboard/settings` ([ProfileSettingsForm.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/Settings/ProfileSettingsForm.tsx) and [PasswordSettingsForm.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/Settings/PasswordSettingsForm.tsx)).

#### Endpoints:
- `GET /users/profile`
- `PATCH /users/profile`
- `POST /users/change-password`

#### Types (`hooks/api/user/types.ts`):
```ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phoneNumber?: string;
  bio?: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
```

#### Query Keys (`hooks/api/user/queryKeys.ts`):
```ts
export const userQueryKeys = {
  profile: ["USER_PROFILE"] as const,
};
```

#### Hook: Update Profile (`hooks/api/user/useUpdateProfile.ts`):
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { UpdateProfilePayload, UserProfile } from "./types";
import { userQueryKeys } from "./queryKeys";
import { authQueryKeys } from "../auth/queryKeys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const res = await apiPrivate.patch<{ success: boolean; message: string; data: UserProfile }>(
        "/users/profile",
        payload
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: userQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
```

#### Hook: Change Password (`hooks/api/user/useChangePassword.ts`):
```ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { ChangePasswordPayload } from "./types";

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const res = await apiPrivate.post<{ success: boolean; message: string }>(
        "/users/change-password",
        payload
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Password updated successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
```

---

### 7.3 Course & Product Catalog Module (`hooks/api/products/`)

Used in `/course`, `/course/[courseId]`, and `/products`.

#### Endpoints:
- `GET /products` (Public listing or single landing product)
- `GET /products/:id` (Public product/course detail)

#### Types (`hooks/api/products/types.ts`):
```ts
export interface CourseProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  imageUrl?: string;
  curriculum?: Array<{
    title: string;
    duration: string;
    lessons: Array<{ title: string; duration: string; videoUrl?: string }>;
  }>;
  isActive: boolean;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface PaginatedProductsResponse {
  items: CourseProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### Hook: Get Products (`hooks/api/products/useGetProducts.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { ProductsQueryParams, CourseProduct, PaginatedProductsResponse } from "./types";

export function useGetProducts(params: ProductsQueryParams = {}) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const search = params.search ?? "";
  const category = params.category ?? "";

  return useQuery({
    queryKey: ["PRODUCTS_LIST", page, limit, search, category],
    queryFn: async (): Promise<PaginatedProductsResponse | CourseProduct[]> => {
      const res = await apiPublic.get("/products", {
        params: { page, limit, search, category },
      });
      return res.data.data;
    },
  });
}
```

#### Hook: Get Product By ID (`hooks/api/products/useGetProductById.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { CourseProduct } from "./types";

export function useGetProductById(id?: string) {
  return useQuery({
    queryKey: ["PRODUCT_BY_ID", id],
    queryFn: async (): Promise<CourseProduct> => {
      const res = await apiPublic.get<{ success: boolean; data: CourseProduct }>(`/products/${id}`);
      return res.data.data;
    },
    enabled: Boolean(id),
  });
}
```

---

### 7.4 3D Models & Playroom Phonics Module (`hooks/api/products-3d/`)

Used in interactive 3D alphabet viewer (`/playroom` or `Playroom3DViewer.tsx`).

#### Endpoints:
- `GET /products-3d`
- `GET /products-3d/:id`

#### Types (`hooks/api/products-3d/types.ts`):
```ts
export interface Product3D {
  id: string;
  letter: string;
  word: string;
  phonetic: string;
  color: string;
  modelUrl: string; // URL to .glb/.gltf asset
  soundUrl?: string; // Audio pronunciation
  description?: string;
}
```

#### Hook: Get 3D Products (`hooks/api/products-3d/useGetProducts3D.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPublic } from "@/lib/api-client";
import { Product3D } from "./types";

export function useGetProducts3D() {
  return useQuery({
    queryKey: ["GET_3D_PRODUCTS"],
    queryFn: async (): Promise<Product3D[]> => {
      const res = await apiPublic.get<{ success: boolean; data: Product3D[] }>("/products-3d");
      return res.data.data;
    },
  });
}
```

---

### 7.5 Orders & Enrolled Courses Module (`hooks/api/orders/`)

Used in `/dashboard/overview` and `/dashboard/my-courses` ([EnrolledCourses.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/MyCourses/EnrolledCourses.tsx), [ActiveCourses.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/MyCourses/ActiveCourses.tsx), [CompletedCourses.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/MyCourses/CompletedCourses.tsx)).

#### Endpoints:
- `POST /orders` (Create new course order)
- `GET /orders/my-orders` (Fetch authenticated user's enrolled courses and order history)
- `GET /orders/:id` (Fetch single order)

#### Types (`hooks/api/orders/types.ts`):
```ts
import { CourseProduct } from "../products/types";

export type OrderStatus = "PENDING" | "PAID" | "COMPLETED" | "CANCELLED";
export type CourseProgressStatus = "ENROLLED" | "ACTIVE" | "COMPLETED";

export interface OrderItem {
  productId: string;
  product?: CourseProduct;
  price: number;
  quantity: number;
  progressPercent?: number;
  progressStatus?: CourseProgressStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderPayload {
  items: Array<{ productId: string; quantity: number }>;
}
```

#### Hook: Get My Orders (`hooks/api/orders/useGetMyOrders.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPrivate } from "@/lib/api-client";
import { Order } from "./types";

export function useGetMyOrders() {
  return useQuery({
    queryKey: ["MY_ORDERS"],
    queryFn: async (): Promise<Order[]> => {
      const res = await apiPrivate.get<{ success: boolean; data: Order[] }>("/orders/my-orders");
      return res.data.data;
    },
  });
}
```

---

### 7.6 Stripe Payments Module (`hooks/api/payments/`)

Used in checkout flows ([ActionButtonSection.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/CourseDetails/ActionButtonSection.tsx)).

#### Endpoints:
- `POST /payments/create-checkout-session`
- `GET /payments/order/:orderId`

#### Hook: Create Checkout Session (`hooks/api/payments/useCreateCheckoutSession.ts`):
```ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";

interface CheckoutSessionPayload {
  orderId: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (payload: CheckoutSessionPayload) => {
      const res = await apiPrivate.post<{ success: boolean; data: CheckoutSessionResponse }>(
        "/payments/create-checkout-session",
        payload
      );
      return res.data.data;
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Redirect user to Stripe hosted checkout page
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
```

---

### 7.7 Notifications Module (`hooks/api/notifications/`)

Used in `/dashboard/notifications` ([Notifications.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/Notifications/Notifications.tsx)).

#### Endpoints:
- `GET /notifications`
- `PATCH /notifications/mark-all-read`
- `PATCH /notifications/:id/read`

#### Types (`hooks/api/notifications/types.ts`):
```ts
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "COURSE_UPDATE" | "SYSTEM" | "PAYMENT" | "REMINDER";
  isRead: boolean;
  createdAt: string;
}
```

#### Hook: Get Notifications (`hooks/api/notifications/useGetNotifications.ts`):
```ts
import { useQuery } from "@tanstack/react-query";
import { apiPrivate } from "@/lib/api-client";
import { NotificationItem } from "./types";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["NOTIFICATIONS"],
    queryFn: async (): Promise<NotificationItem[]> => {
      const res = await apiPrivate.get<{ success: boolean; data: NotificationItem[] }>("/notifications");
      return res.data.data;
    },
  });
}
```

#### Hook: Mark All Read (`hooks/api/notifications/useMarkAllNotificationsRead.ts`):
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPrivate } from "@/lib/api-client";

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiPrivate.patch("/notifications/mark-all-read");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["NOTIFICATIONS"] });
    },
  });
}
```

---

### 7.8 Media & Asset Upload Module (`hooks/api/upload/`)

Used in profile avatar edits ([ProfileSettingsForm.tsx](file:///c:/Users/asdud/Desktop/Softvence/Clairetouati%20II%20Nexuva%20II%20FO3DAC981041/clairetouati_next_js_mern_front_end/components/page/Settings/ProfileSettingsForm.tsx)) and administrative forms.

#### Endpoints:
- `POST /upload/single` (Multipart form-data)
- `POST /upload/multiple`

#### Hook: Upload Image (`hooks/api/upload/useUploadImage.ts`):
```ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPrivate } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";

interface UploadResponse {
  url: string;
  publicId: string;
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiPrivate.post<{ success: boolean; data: UploadResponse }>(
        "/upload/single",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.data;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
```

---

## 8. Connecting Hooks to Existing UI Components

### Example: Sign In Page (`app/(auth)/sign-in/page.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { useLogin } from "@/hooks/api/auth/useLogin";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isPending}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
```

### Example: Profile Settings Form with Avatar Upload (`components/page/Settings/ProfileSettingsForm.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { useGetProfile } from "@/hooks/api/user/useGetProfile";
import { useUpdateProfile } from "@/hooks/api/user/useUpdateProfile";
import { useUploadImage } from "@/hooks/api/upload/useUploadImage";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsForm() {
  const { data: profile, isLoading } = useGetProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const [name, setName] = useState(profile?.name || "");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploaded = await uploadImage(file);
      updateProfile({ avatar: uploaded.url });
    }
  };

  if (isLoading) return <div>Loading profile skeleton...</div>;

  return (
    <div>
      <input type="file" onChange={handleAvatarChange} disabled={isUploading} />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => updateProfile({ name })} disabled={isUpdating}>
        {isUpdating ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
```

---

## 9. Cache Invalidation & Optimistic Updates Matrix

| Action / Mutation | Primary Mutation Hook | Queries to Invalidate |
| :--- | :--- | :--- |
| **Login / Register** | `useLogin`, `useRegister` | `authQueryKeys.me()` |
| **Logout** | `useLogout` | Clear entire queryClient cache |
| **Update Profile** | `useUpdateProfile` | `["USER_PROFILE"]`, `["AUTH", "ME"]` |
| **Change Password** | `useChangePassword` | None |
| **Create Course Order** | `useCreateOrder` | `["MY_ORDERS"]`, `["ORDER_BY_ID", orderId]` |
| **Mark Notification Read** | `useMarkNotificationRead` | `["NOTIFICATIONS"]` |
| **Mark All Notifications Read** | `useMarkAllNotificationsRead` | `["NOTIFICATIONS"]` |
| **Upload Image / Media** | `useUploadImage` | Specific target query (e.g. `["USER_PROFILE"]`) |

---

## 10. AI Agent Implementation Checklist

When tasked with integrating or updating an API call, verify each step:

- [ ] Check if the endpoint requires **Public** (`apiPublic`) or **Authenticated** (`apiPrivate`) client.
- [ ] Create dedicated files under `hooks/api/<feature>/` (`use<Action>.ts`, `types.ts`, `queryKeys.ts`).
- [ ] Define TypeScript types for Request Body, Query Params, and Expected Response.
- [ ] Ensure `useQuery` is used for GET and `useMutation` is used for POST/PATCH/DELETE.
- [ ] Include user feedback toasts via `toast.success` and `toast.error(getApiErrorMessage(error))`.
- [ ] Invalidate relevant cache keys upon mutation success.
- [ ] Implement loading (`isPending` / `isLoading`) and disabled states on UI action buttons.
- [ ] Avoid `any` - utilize strict typing or `unknown`.
- [ ] Never place direct `fetch` or `axios` instances inside JSX UI components.

---

## 11. Prompt Template for Future AI Requests

Copy and paste this template when prompting an AI agent to implement a new API integration:

```text
Follow the guidelines in API_CALLING_STRUCTURE.md.

Add this API integration:
- Feature Module: [e.g., auth | user | products | orders | payments | notifications | upload]
- HTTP Method: [GET | POST | PATCH | DELETE]
- Endpoint Path: [e.g., /api/v1/...]
- Authentication: [Public | Authenticated (apiPrivate)]
- Query Parameters: [e.g., page, limit, search]
- Request Payload: [e.g., { email, password }]
- Response Shape: [e.g., { success: true, data: { ... } }]
- Target UI Component: [e.g., components/page/.../Component.tsx]
- Success Behavior: [e.g., toast notification, router push, query invalidation]
- Invalidate Query Keys: [e.g., ["MY_ORDERS"], ["NOTIFICATIONS"]]

Strict Rules:
1. Do not make direct axios/fetch calls inside UI components.
2. Use useQuery for GET and useMutation for POST/PATCH/DELETE.
3. Use getApiErrorMessage() for error toasts.
4. Add full TypeScript types and avoid any.
```
