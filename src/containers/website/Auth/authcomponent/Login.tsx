import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikText } from "@/components/common/sharedfields";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";

interface LoginProps {
  setTab: (tab: string) => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login({ setTab }: LoginProps) {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = () => {
    toast.success("Welcome back!");
    navigate({ to: "/" });
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

          <GoldButton className="w-full">Sign in</GoldButton>
        </Form>
      )}
    </Formik>
  );
}
