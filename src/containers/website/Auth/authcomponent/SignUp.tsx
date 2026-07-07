import { useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Phone, User } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { GoldButton } from "@/components/ui-kit";
import { toast } from "sonner";
import { FormikText } from "@/components/common/sharedfields";

interface SignUpProps {
  setTab: (tab: string) => void;
}

interface SignUpValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const signupSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
  phone: Yup.string().trim().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SignUp({ setTab }: SignUpProps) {
  const navigate = useNavigate();

  const initialValues: SignUpValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleSubmit = (values: SignUpValues) => {
    toast.success(`Account created for ${values.fullName}`);
    navigate({ to: "/" });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <FormikText
            name="fullName"
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

          <GoldButton className="w-full mt-2">Create account</GoldButton>
        </Form>
      )}
    </Formik>
  );
}
