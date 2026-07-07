import React from "react";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormikDatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  full?: boolean;
}

export function FormikDatePicker({
  name,
  label,
  placeholder,
  required,
  disabled,
  readOnly,
  helperText,
  full,
  ...props
}: FormikDatePickerProps) {
  const [field, meta] = useField(name);
  const isError = !!(meta.touched && meta.error);

  return (
    <div className={cn("space-y-2", full && "md:col-span-2")}>
      {label && (
        <Label htmlFor={name} className={cn("text-sm font-medium", isError && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type="date"
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(isError && "border-destructive focus-visible:ring-destructive")}
        {...field}
        value={(field.value as string) ?? ""}
        {...props}
      />
      {helperText && !isError && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
      {isError && <p className="text-[0.8rem] font-medium text-destructive">{meta.error}</p>}
    </div>
  );
}
