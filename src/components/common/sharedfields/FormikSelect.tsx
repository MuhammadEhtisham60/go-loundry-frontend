import React from "react";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FormikSelectOption {
  value: string;
  label: string;
}

interface FormikSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  full?: boolean;
  options?: (FormikSelectOption | string)[];
  children?: React.ReactNode;
}

export function FormikSelect({
  name,
  label,
  placeholder,
  required,
  disabled,
  helperText,
  full,
  options = [],
  children,
  ...props
}: FormikSelectProps) {
  const [field, meta, helpers] = useField(name);
  const isError = !!(meta.touched && meta.error);

  return (
    <div className={cn("space-y-2", full && "md:col-span-2")}>
      {label && (
        <Label htmlFor={name} className={cn("text-sm font-medium", isError && "text-destructive")}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Select
        value={(field.value as string) ?? ""}
        onValueChange={(val) => helpers.setValue(val)}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger
          id={name}
          className={cn(isError && "border-destructive focus:ring-destructive")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children
            ? children
            : options.map((opt) => {
                const val = typeof opt === "object" ? opt.value : opt;
                const lbl = typeof opt === "object" ? opt.label : opt;
                return (
                  <SelectItem key={val} value={val}>
                    {lbl}
                  </SelectItem>
                );
              })}
        </SelectContent>
      </Select>
      {helperText && !isError && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
      {isError && <p className="text-[0.8rem] font-medium text-destructive">{meta.error}</p>}
    </div>
  );
}
