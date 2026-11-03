"use client";
import { useState, type FormEvent, useImperativeHandle } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import type { FormProps, FieldConfig, FormValues } from "@/types";
import { Spinner } from "../ui/spinner";

/* --------------------------------- Helpers ---------------------------------- */

function getInitialValues(
  fields: readonly FieldConfig[],
): Record<string, string | boolean> {
  const values: Record<string, string | boolean> = {};
  for (const field of fields) {
    if (field.type === "checkbox") {
      values[field.name] = field.defaultValue ?? false;
    } else {
      values[field.name] = field.defaultValue ?? "";
    }
  }
  return values;
}

/* -------------------------------- Component -------------------------------- */

export function Form<const F extends readonly FieldConfig[]>({
  title,
  description,
  fields,
  onSubmit,
  submitLabel = "Submit",
  schema,
  validate: customValidate,
  isSubmitting = false,
  serverError,
  fieldErrors,
  info,
  ref,
}: FormProps<F>) {
  const [values, setValues] = useState(() => getInitialValues(fields));
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Expose reset() to the parent
  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setValues(getInitialValues(fields));
        setErrors({});
      },
    }),
    [fields],
  );

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as soon as the user edits it
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (schema) {
      // Zod path — full validation
      const result = schema.safeParse(values);
      if (!result.success) {
        for (const issue of result.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !next[key]) {
            next[key] = issue.message;
          }
        }
      }
    } else {
      // fallback — built-in required checks
      for (const field of fields) {
        if (!field.required) continue;
        const value = values[field.name];
        const isEmpty =
          field.type === "checkbox"
            ? value !== true
            : !String(value ?? "").trim();
        if (isEmpty) {
          next[field.name] =
            field.type === "checkbox"
              ? `${field.label} must be checked.`
              : `${field.label} is required.`;
        }
      }
    }

    // Optional extra rules — merge on top
    if (customValidate) {
      Object.assign(next, customValidate(values as FormValues<F>));
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values as FormValues<F>);
  };

  return (
    <Card className="w-full max-w-md border-gray-200 shadow-lg animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <CardContent className="space-y-4">
          {fields.map((field) => {
            const error =
              errors[field.name] ||
              fieldErrors?.[field.name as keyof FormValues<F> & string];
            return (
              <div key={field.name} className="space-y-2">
                {field.type !== "checkbox" && (
                  <Label htmlFor={field.name} className="text-gray-700">
                    {field.label}
                  </Label>
                )}

                {renderField(field, values[field.name], (v) =>
                  setValue(field.name, v),
                )}

                {error ? (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : (
                  field.description && (
                    <p className="text-sm text-muted-foreground">
                      {field.description}
                    </p>
                  )
                )}
              </div>
            );
          })}

          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <CardFooter className="flex flex-col space-y-4 border-t-0">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white hover:bg-primary/90 hover:cursor-pointer hover:shadow-sm"
            >
              {isSubmitting ? (
                <>
                  Submitting <Spinner />
                </>
              ) : (
                submitLabel
              )}
            </Button>
            {info && info}
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}

/* --------------------------- Field renderer --------------------------------- */

function renderField(
  field: FieldConfig,
  value: string | boolean | undefined,
  onChange: (value: string | boolean) => void,
) {
  const numericOnly = "numericOnly" in field && field.numericOnly;
  const maxLength = "maxLength" in field && field.maxLength;
  const minLength = "minLength" in field && field.minLength;

  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          id={field.name}
          name={field.name}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={field.required}
          rows={field.rows}
        />
      );

    case "select":
      return (
        <select
          id={field.name}
          name={field.name}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          disabled={field.disabled}
          required={field.required}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus:ring-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">{field.placeholder ?? "Select..."}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            disabled={field.disabled}
            className="h-4 w-4 rounded border-input"
          />
          <Label htmlFor={field.name} className="cursor-pointer">
            {field.label}
          </Label>
        </div>
      );

    default:
      return (
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          inputMode={numericOnly ? "numeric" : undefined}
          maxLength={maxLength ? Number(maxLength) : undefined}
          minLength={minLength ? Number(minLength) : undefined}
          value={String(value ?? "")}
          onChange={(e) => {
            if (numericOnly) {
              e.target.value = e.target.value.replace(/\D/g, "");
            }
            onChange(e.target.value);
          }}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={field.required}
          className="border-gray-300 focus:border-primary focus:ring-primary"
        />
      );
  }
}
