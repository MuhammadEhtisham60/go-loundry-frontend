import React from "react";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormikTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  full?: boolean;
  type?: string;
  className?: string;
  leftIcon?: React.ReactNode;
}

export function FormikText({
  name,
  label,
  placeholder,
  required,
  disabled,
  readOnly,
  helperText,
  full,
  type = "text",
  className,
  leftIcon,
  ...props
}: FormikTextProps) {
  const [field, meta] = useField(name);
  const isError = !!(meta.touched && meta.error);

  return (
    <div className={cn("space-y-2", full && "md:col-span-2")}>
      {label && (
        <Label htmlFor={name} className={cn("text-sm font-medium", isError && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            isError && "border-destructive focus-visible:ring-destructive",
            leftIcon && "pl-10",
            className,
          )}
          {...field}
          value={field.value ?? ""}
          {...props}
        />
      </div>
      {helperText && !isError && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
      {isError && <p className="text-[0.8rem] font-medium text-destructive">{meta.error}</p>}
    </div>
  );
}
