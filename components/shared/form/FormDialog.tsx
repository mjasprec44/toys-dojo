"use client";

import { useState, useImperativeHandle, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useFormState } from "@/hooks/use-form-state";
import { renderField } from "@/lib/form-helpers";
import { FieldConfig, FormDialogProps, FormValues } from "@/types/form.types";

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
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent className="flex max-h-[90dvh] flex-col overflow-hidden sm:max-w-md">
        <DialogHeader className="shrink-0">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex min-h-0 flex-1 flex-col gap-4"
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-1">
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
                    <Label htmlFor={field.name}>{field.label}</Label>
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

            {info}
          </div>

          <DialogFooter className="shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
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
