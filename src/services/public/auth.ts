import { publicAPI } from "./index";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  email?: string;
  phone?: string;
  password: string;
  password_confirm: string;
  full_name: string;
  user_type?: "user" | "admin" | "super_admin";
}

export interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

export interface OtpRequestPayload {
  phone: string;
}

export interface OtpVerifyPayload {
  phone: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email?: string;
  phone?: string;
}

export interface ResetPasswordPayload {
  email?: string;
  phone?: string;
  otp_code: string;
  new_password: string;
  confirm_password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserData {
  id: string;
  email?: string;
  phone?: string;
  full_name: string;
  role: "CUSTOMER" | "SUPPORT_AGENT" | "ADMIN" | "SUPER_ADMIN";
  user_type: "user" | "admin" | "super_admin";
  is_blocked?: boolean;
  profile_photo?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]> | string[] | null;
}

export interface LoginResponse {
  tokens: AuthTokens;
  user: UserData;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const authAPI = publicAPI.injectEndpoints({
  endpoints: (build) => ({
    /** POST /api/auth/register/ — Register a new Customer account */
    register: build.mutation<ApiResponse<UserData>, RegisterPayload>({
      query: (body) => ({
        url: "/api/auth/register/",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/auth/login/ — Authenticate via email or phone + password */
    login: build.mutation<ApiResponse<LoginResponse>, LoginPayload>({
      query: (body) => ({
        url: "/api/auth/login/",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/auth/login/otp/ — Request an OTP code */
    requestOtp: build.mutation<ApiResponse, OtpRequestPayload>({
      query: (body) => ({
        url: "/api/auth/login/otp/",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/auth/login/otp/verify/ — Validate OTP and receive JWT tokens */
    verifyOtp: build.mutation<ApiResponse<LoginResponse>, OtpVerifyPayload>({
      query: (body) => ({
        url: "/api/auth/login/otp/verify/",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/auth/forgot-password/ — Send password reset OTP to email/phone */
    forgotPassword: build.mutation<ApiResponse, ForgotPasswordPayload>({
      query: (body) => ({
        url: "/api/auth/forgot-password/",
        method: "POST",
        body,
      }),
    }),

    /** POST /api/auth/reset-password/ — Submit OTP + new password to reset */
    resetPassword: build.mutation<ApiResponse, ResetPasswordPayload>({
      query: (body) => ({
        url: "/api/auth/reset-password/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authAPI;
