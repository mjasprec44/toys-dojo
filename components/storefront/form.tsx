"use client";
import { type FormEvent, useImperativeHandle } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { FormProps, FieldConfig, FormValues } from "@/types";
import { Spinner } from "../ui/spinner";
import { renderField } from "@/lib/form-helpers";
import { useFormState } from "@/hooks/use-form-state";

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
  const form = useFormState({
    fields,
    schema,
    validate: customValidate,
    onSubmit,
  });

  useImperativeHandle(ref, () => ({ reset: form.reset }), [form.reset]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    void form.submit(e);
  };

  return (
    <Card className="w-full max-w-md border-border shadow-lg animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground">
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <CardContent className="space-y-4">
          {fields.map((field) => {
            const error =
              form.errors[field.name] ||
              fieldErrors?.[field.name as keyof FormValues<F> & string];
            return (
              <div key={field.name} className="space-y-2">
                {field.type !== "checkbox" && (
                  <Label htmlFor={field.name} className="text-gray-700">
                    {field.label}
                  </Label>
                )}

                {renderField(field, form.values[field.name], (v) =>
                  form.setValue(field.name, v),
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
          <CardFooter className="flex flex-col space-y-4 border-t-0 px-0">
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
