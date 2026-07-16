import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikText } from "@/components/common/sharedfields";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";
import { useLoginMutation } from "@/services";
import { useDispatch } from "react-redux";
import { onLoggedIn } from "@/store/slices/authSlice";

interface LoginProps {
  setTab: (tab: string) => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login({ setTab }: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const result = await login({
        email: values.email.trim(),
        password: values.password,
      }).unwrap();

      if (result?.data) {
        const { tokens, user } = result.data;
        dispatch(
          onLoggedIn({
            access: tokens.access,
            refresh: tokens.refresh,
            user,
          }),
        );
        toast.success(result.message || "Welcome back!");
        if (user.user_type === "admin" || user.user_type === "super_admin") {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/" });
        }
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as {
        data?: { message?: string; errors?: Record<string, string[]> | string[] };
        status?: number;
      };
      const serverMsg = error?.data?.message;
      const fieldErrors = error?.data?.errors;

      if (fieldErrors && typeof fieldErrors === "object" && !Array.isArray(fieldErrors)) {
        Object.entries(fieldErrors).forEach(([, messages]) => {
          messages.forEach((msg) => toast.error(msg));
        });
      } else if (Array.isArray(fieldErrors)) {
        fieldErrors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(serverMsg || "Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form className="space-y-4">
          <FormikText
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <FormikText
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                className="accent-[color:var(--gold)]"
              />{" "}
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setTab("forgot")}
              className="gold-text hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <GoldButton className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </GoldButton>
        </Form>
      )}
    </Formik>
  );
}
