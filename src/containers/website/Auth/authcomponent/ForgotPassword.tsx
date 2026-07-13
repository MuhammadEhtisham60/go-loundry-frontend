import React, { useState, useEffect } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikText } from "@/components/common/sharedfields";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/services";

interface ForgotPasswordProps {
  setTab: (tab: string) => void;
}

const emailSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
});

const resetSchema = Yup.object().shape({
  otp: Yup.string()
    .trim()
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d+$/, "Code must only contain numbers")
    .required("Verification code is required"),
  new_password: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("new_password")], "Passwords do not match"),
});

export default function ForgotPassword({ setTab }: ForgotPasswordProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [pendingEmail, setPendingEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const [forgotPassword, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  useEffect(() => {
    if (step !== "otp") return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // ── Step 1: send OTP to email ──────────────────────────────────────────────
  const handleEmailSubmit = async (values: { email: string }) => {
    try {
      const result = await forgotPassword({ email: values.email.trim() }).unwrap();
      setPendingEmail(values.email.trim());
      toast.success(result.message || "OTP sent to your email!");
      setTimeLeft(60);
      setStep("otp");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  // ── Resend OTP ─────────────────────────────────────────────────────────────
  const handleResendOtp = async () => {
    try {
      const result = await forgotPassword({ email: pendingEmail }).unwrap();
      toast.success(result.message || "OTP resent successfully!");
      setTimeLeft(60);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to resend OTP.");
    }
  };

  // ── Step 2: verify OTP + reset password ───────────────────────────────────
  const handleResetSubmit = async (values: {
    otp: string;
    new_password: string;
    confirm_password: string;
  }) => {
    try {
      const result = await resetPassword({
        email: pendingEmail,
        otp_code: values.otp,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }).unwrap();

      toast.success(result.message || "Password reset successfully! Please sign in.");
      setTab("login");
    } catch (err: unknown) {
      const error = err as {
        data?: { message?: string; errors?: Record<string, string[]> | string[] };
      };
      const serverMsg = error?.data?.message;
      const fieldErrors = error?.data?.errors;

      if (fieldErrors && typeof fieldErrors === "object" && !Array.isArray(fieldErrors)) {
        Object.entries(fieldErrors).forEach(([, messages]) => {
          messages.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(serverMsg || "Failed to reset password. Please try again.");
      }
    }
  };

  // ── OTP + new password step ────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <Formik
        initialValues={{ otp: "", new_password: "", confirm_password: "" }}
        validationSchema={resetSchema}
        onSubmit={handleResetSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-5">
            {/* OTP input */}
            <div className="space-y-2">
              <Label
                className={cn(
                  "text-sm font-medium",
                  touched.otp && errors.otp && "text-destructive",
                )}
              >
                Verification Code
              </Label>
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={values.otp}
                  onChange={(val) => setFieldValue("otp", val)}
                >
                  <InputOTPGroup className="gap-2.5">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {touched.otp && errors.otp && (
                <p className="text-[0.8rem] font-medium text-destructive text-center">
                  {errors.otp}
                </p>
              )}
            </div>

            {/* New password */}
            <FormikText
              name="new_password"
              label="New Password"
              type="password"
              placeholder="••••••••"
              required
              leftIcon={<Lock className="w-4 h-4" />}
            />

            {/* Confirm password */}
            <FormikText
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              required
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <GoldButton className="w-full" disabled={isResetting}>
              {isResetting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting…
                </span>
              ) : (
                "Reset Password"
              )}
            </GoldButton>

            <div className="text-center text-xs mt-4">
              {timeLeft > 0 ? (
                <span className="text-muted-foreground">
                  Resend OTP in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSendingOtp}
                  className="gold-text hover:underline cursor-pointer font-medium disabled:opacity-50"
                >
                  {isSendingOtp ? "Sending…" : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="gold-text hover:underline text-xs block mx-auto mt-2"
            >
              Change Email
            </button>
          </Form>
        )}
      </Formik>
    );
  }

  // ── Email step ─────────────────────────────────────────────────────────────
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={emailSchema}
      onSubmit={handleEmailSubmit}
    >
      {() => (
        <Form className="space-y-4">
          <FormikText
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <GoldButton className="w-full" disabled={isSendingOtp}>
            {isSendingOtp ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending OTP…
              </span>
            ) : (
              "Send OTP"
            )}
          </GoldButton>

          <button
            type="button"
            onClick={() => setTab("login")}
            className="gold-text hover:underline text-xs block mx-auto mt-4"
          >
            Back to sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}
