"use client";

import { useCallback, useState, type FormEvent } from "react";
import type { FieldConfig, FormProps, FormValues } from "@/types";
import { getInitialValues } from "@/lib/form-helpers";

type UseFormStateOptions<F extends readonly FieldConfig[]> = Pick<
  FormProps<F>,
  "fields" | "schema" | "validate" | "onSubmit"
>;

export function useFormState<F extends readonly FieldConfig[]>({
  fields,
  schema,
  validate: customValidate,
  onSubmit,
}: UseFormStateOptions<F>) {
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    getInitialValues(fields),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = useCallback(() => {
    setValues(getInitialValues(fields));
    setErrors({});
  }, [fields]);

  const setValue = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const next: Record<string, string> = {};

    if (schema) {
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

    if (customValidate) {
      Object.assign(next, customValidate(values as FormValues<F>));
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [schema, fields, customValidate, values]);

  /**
   * Runs validation then `onSubmit`.
   * - Returns `true` on success, `false` if validation failed.
   * - Throws if `onSubmit` throws — callers decide how to handle that.
   */
  const submit = useCallback(
    async (e?: FormEvent<HTMLFormElement>): Promise<boolean> => {
      e?.preventDefault();
      if (!validate()) return false;
      await onSubmit(values as FormValues<F>);
      return true;
    },
    [validate, onSubmit, values],
  );

  return { values, errors, setValue, reset, validate, submit };
}
