import React from "react";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormikTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  full?: boolean;
  rows?: number;
  className?: string;
}

export function FormikTextArea({
  name,
  label,
  placeholder,
  required,
  disabled,
  readOnly,
  helperText,
  full,
  rows = 3,
  className,
  ...props
}: FormikTextAreaProps) {
  const [field, meta] = useField(name);
  const isError = !!(meta.touched && meta.error);

  return (
    <div className={cn("space-y-2", full && "md:col-span-2")}>
      {label && (
        <Label htmlFor={name} className={cn("text-sm font-medium", isError && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={cn(isError && "border-destructive focus-visible:ring-destructive", className)}
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
