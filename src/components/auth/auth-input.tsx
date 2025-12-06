"use client";

import * as React from "react";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <Field className={cn("w-full space-y-1.5", containerClassName)}>
        <FieldLabel className="text-sm font-medium text-muted-foreground/80 transition-colors group-focus-within:text-primary">
          {label}
        </FieldLabel>
        <FieldContent>
          <Input
            ref={ref}
            className={cn(
              "h-12 rounded-xl border-white/10 bg-white/5 px-4 text-base transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10",
              error && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
              className
            )}
            {...props}
          />
        </FieldContent>
        <FieldError errors={error ? [{ message: error }] : undefined} />
      </Field>
    );
  }
);

AuthInput.displayName = "AuthInput";
