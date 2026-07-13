import { Mail, Lock, Phone, User, Loader2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";
import { FormikText } from "@/components/common/sharedfields";
import { useRegisterMutation } from "@/services";

interface SignUpProps {
  setTab: (tab: string) => void;
}

interface SignUpValues {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
}

const signupSchema = Yup.object().shape({
  full_name: Yup.string().trim().required("Full name is required"),
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
  phone: Yup.string().trim().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export default function SignUp({ setTab }: SignUpProps) {
  const [register, { isLoading }] = useRegisterMutation();

  const initialValues: SignUpValues = {
    full_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirm: "",
  };

  const handleSubmit = async (values: SignUpValues) => {
    try {
      const result = await register({
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        password_confirm: values.password_confirm,
      }).unwrap();

      toast.success(result.message || `Account created! Please sign in.`);
      setTab("login");
    } catch (err: unknown) {
      const error = err as {
        data?: { message?: string; errors?: Record<string, string[]> | string[] };
        status?: number;
      };
      const serverMsg = error?.data?.message;
      const fieldErrors = error?.data?.errors;

      if (fieldErrors && typeof fieldErrors === "object" && !Array.isArray(fieldErrors)) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          messages.forEach((msg) => toast.error(`${field}: ${msg}`));
        });
      } else if (Array.isArray(fieldErrors)) {
        fieldErrors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(serverMsg || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <FormikText
            name="full_name"
            label="Full name"
            placeholder="Enter Name"
            required
            leftIcon={<User className="w-4 h-4" />}
          />

          <FormikText
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <FormikText
            name="phone"
            label="Phone"
            placeholder="+92 3xx xxxxxxx"
            required
            leftIcon={<Phone className="w-4 h-4" />}
          />

          <FormikText
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <FormikText
            name="password_confirm"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <GoldButton className="w-full mt-2" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account…
              </span>
            ) : (
              "Create account"
            )}
          </GoldButton>
        </Form>
      )}
    </Formik>
  );
}
