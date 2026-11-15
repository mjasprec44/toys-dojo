"use client";

import { useState, useImperativeHandle, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import type { FieldConfig, FormDialogProps, FormValues } from "@/types";
import { renderField } from "@/lib/form-helpers";
import { useFormState } from "@/hooks/use-form-state";

export function FormDialog<const F extends readonly FieldConfig[]>({
  trigger,
  title,
  description,
  fields,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  schema,
  validate: customValidate,
  isSubmitting = false,
  serverError,
  fieldErrors,
  info,
  ref,
  closeOnSuccess = true,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: FormDialogProps<F>) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen; // ← open defined here

  const form = useFormState({
    fields,
    schema,
    validate: customValidate,
    onSubmit,
  });

  // Runs during render, not in an effect. Conditional, so it can't loop.
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) form.reset(); // reset only on close → next open starts fresh
  }

  useImperativeHandle(ref, () => ({ reset: form.reset }), [form.reset]);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    controlledOnOpenChange?.(next);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const ok = await form.submit(e);
      if (ok && closeOnSuccess) setOpen(false);
    } catch {
      // Keep the dialog open; the parent surfaces errors via `serverError`.
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-4">
            {fields.map((field) => {
              const error =
                form.errors[field.name] ||
                fieldErrors?.[field.name as keyof FormValues<F> & string];
              return (
                <div key={field.name} className="space-y-2">
                  {field.type !== "checkbox" && (
                    <Label htmlFor={field.name}>{field.label}</Label>
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

            {info}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Submitting <Spinner />
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
