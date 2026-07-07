import { publicAPI } from "./index";

export const authAPI = publicAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/tenant/login/",
        method: "POST",
        body,
      }),
    }),
    verify2fa: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/verify-2fa/",
        method: "POST",
        body,
      }),
    }),
    resend2faOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/resend-2fa-otp/",
        method: "POST",
        body,
      }),
    }),
    signup: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/tenant/signup/",
        method: "POST",
        body,
      }),
    }),
    unifiedSignup: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/tenant/signup/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    resendOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/resend-signup-otp/",
        method: "POST",
        body,
      }),
    }),
    verifySignupOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/verify-signup-otp/",
        method: "POST",
        body,
      }),
    }),
    requestPasswordReset: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/password-reset/request/",
        method: "POST",
        body,
      }),
    }),
    resendPasswordResetOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/password-reset/resend-otp/",
        method: "POST",
        body,
      }),
    }),
    verifyResetOtp: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/password-reset/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    setNewPassword: build.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/public/password-reset/complete/",
        method: "POST",
        body,
      }),
    }),
    googleLogin: build.mutation<unknown, unknown>({
      query: (token) => ({
        url: "/api/public/auth/google/",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useUnifiedSignupMutation,
  useLoginMutation,
  useVerify2faMutation,
  useResend2faOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useVerifySignupOtpMutation,
  useRequestPasswordResetMutation,
  useResendPasswordResetOtpMutation,
  useVerifyResetOtpMutation,
  useSetNewPasswordMutation,
  useGoogleLoginMutation,
} = authAPI;
