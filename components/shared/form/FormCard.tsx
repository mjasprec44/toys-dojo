"use client";
import { type FormEvent, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useFormState } from "@/hooks/use-form-state";
import { renderField } from "@/lib/form-helpers";
import { FieldConfig, FormProps, FormValues } from "@/types/form.types";

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
    <Card className="border-border animate-fade-in w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-foreground text-2xl font-bold">
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        <CardContent className="space-y-4">
          {fields.map((field) => {
            const error =
              form.errors[field.name] ||
              fieldErrors?.[field.name as keyof FormValues<F> & string];
            return (
              <div
                key={field.name}
                className="space-y-2"
              >
                {field.type !== "checkbox" && (
                  <Label
                    htmlFor={field.name}
                    className="text-foreground"
                  >
                    {field.label}
                  </Label>
                )}

                {renderField(field, form.values[field.name], (v) =>
                  form.setValue(field.name, v),
                )}

                {error ? (
                  <p
                    className="text-destructive text-sm"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : (
                  field.description && (
                    <p className="text-muted-foreground text-sm">
                      {field.description}
                    </p>
                  )
                )}
              </div>
            );
          })}

          {serverError && (
            <p
              className="text-destructive text-sm"
              role="alert"
            >
              {serverError}
            </p>
          )}
          <CardFooter className="flex flex-col space-y-4 border-t-0 bg-transparent px-0">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 w-full text-white hover:cursor-pointer hover:shadow-sm"
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
