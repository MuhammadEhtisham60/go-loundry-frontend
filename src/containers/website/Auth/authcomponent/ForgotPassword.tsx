import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikText } from "@/components/common/sharedfields";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ForgotPasswordProps {
  setTab: (tab: string) => void;
}

const emailSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .trim()
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d+$/, "Code must only contain numbers")
    .required("Verification code is required"),
});

export default function ForgotPassword({ setTab }: ForgotPasswordProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (step !== "otp") return;
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleEmailSubmit = () => {
    toast.success("OTP sent to your email!");
    setTimeLeft(60);
    setStep("otp");
  };

  const handleOtpSubmit = () => {
    toast.success("OTP verified successfully!");
    setTab("login");
  };

  const handleResendOtp = () => {
    toast.success("OTP resent successfully!");
    setTimeLeft(60);
  };

  if (step === "otp") {
    return (
      <Formik initialValues={{ otp: "" }} validationSchema={otpSchema} onSubmit={handleOtpSubmit}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
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
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-12 rounded-xl border border-border text-lg font-medium shadow-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/20 focus-visible:border-[color:var(--gold)]/60"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {touched.otp && errors.otp && (
                <p className="text-[0.8rem] font-medium text-destructive text-center">
                  {errors.otp}
                </p>
              )}
            </div>

            <GoldButton className="w-full">Verify Code</GoldButton>

            <div className="text-center text-xs mt-4">
              {timeLeft > 0 ? (
                <span className="text-muted-foreground">
                  Resend OTP in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="gold-text hover:underline cursor-pointer font-medium"
                >
                  Resend OTP
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

          <GoldButton className="w-full">Send OTP</GoldButton>

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
