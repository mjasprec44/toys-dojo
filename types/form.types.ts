import { type ReactElement } from "react";
import { z } from "zod";
/* ----------------------------- Field config types ---------------------------- */
export interface FormHandle {
  /** Reset all fields to their default values and clear errors. */
  reset: () => void;
}
export interface SelectOption {
  label: string;
  value: string;
}

interface BaseField {
  /** Unique key used as the form value key */
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface InputField extends BaseField {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  defaultValue?: string;
  /** Strip everything except 0-9 on change and show a numeric keypad. */
  numericOnly?: boolean;
  /** Maximum number of characters. */
  maxLength?: number;
  /** Minimum number of characters. */
  minLength?: number;
  // 🆕 numeric-input constraints (only used when type === "number")
  min?: number;
  max?: number;
  step?: number;
}

export interface TextareaField extends BaseField {
  type: "textarea";
  defaultValue?: string;
  rows?: number;
  maxLength?: number; // 🆕
  minLength?: number; // 🆕
}

export interface SelectField extends BaseField {
  type: "select";
  defaultValue?: string;
  options: SelectOption[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue?: boolean;
}

// 🆕 Multi-select (e.g. product tags)
export interface MultiSelectField extends BaseField {
  type: "multi-select";
  defaultValue?: string[];
  options: SelectOption[];
}

// 🆕 Free-form list of strings (e.g. product issues)
export interface StringListField extends BaseField {
  type: "string-list";
  defaultValue?: string[];
  itemLabel?: string;
  maxItems?: number;
}

// 🆕 Image upload (e.g. product images)
export interface ImageUploadField extends BaseField {
  type: "image-upload";
  defaultValue?: File[];
  accept?: string;
  maxFiles?: number;
}

export type FieldConfig =
  | InputField
  | TextareaField
  | SelectField
  | CheckboxField
  | MultiSelectField // 🆕
  | StringListField // 🆕
  | ImageUploadField; // 🆕

// 🆕 add these two
export type FormValue = string | boolean | string[] | File[];
export type FormValuesRecord = Record<string, FormValue>;

/* ------------------------- Value inference helpers -------------------------- */

type FieldValue<F extends FieldConfig> = F extends { type: "checkbox" }
  ? boolean
  : F extends { type: "multi-select" } | { type: "string-list" }
    ? string[]
    : F extends { type: "image-upload" }
      ? File[]
      : string;

/** Maps the `fields` tuple into an object type of form values. */
export type FormValues<F extends readonly FieldConfig[]> = {
  [K in F[number] as K["name"]]: FieldValue<K>;
};

/* ------------------------------- Component props ---------------------------- */

export interface FormProps<F extends readonly FieldConfig[]> {
  title: string;
  description?: string;
  fields: F;
  onSubmit: (values: FormValues<F>) => void | Promise<void>;
  /** Zod schema — takes over validation when provided. */
  schema?: z.ZodType<FormValues<F>>;
  /**
   * Cross-field validation. Runs on submit, after the built-in
   * required checks. Return a map of field name → error message.
   */
  validate?: (
    values: FormValues<F>,
  ) => Partial<Record<keyof FormValues<F> & string, string>>;
  submitLabel?: string;
  isSubmitting?: boolean;
  /** Error returned from the server, shown above the submit button. */
  serverError?: string | null;
  /** Per-field errors, e.g. from a server response. */
  fieldErrors?: Partial<Record<keyof FormValues<F> & string, string>>;
  /** Additional info, shown below the submit button. */
  info?: React.ReactNode;
  /** Optional ref to call `reset()` imperatively. */
  ref?: React.Ref<FormHandle>;
}

export type FormDialogProps<F extends readonly FieldConfig[]> = FormProps<F> & {
  /** Element used to open the dialog. Omit if you control `open` yourself. */
  trigger?: ReactElement;
  /** Label for the cancel button. Default: "Cancel". */
  cancelLabel?: string;
  /**
   * Close the dialog after `onSubmit` resolves successfully.
   * `onSubmit` must **throw** on failure for this to behave correctly;
   * otherwise set this to `false` and control `open` from the parent.
   * @default true
   */
  closeOnSuccess?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called whenever the dialog wants to open/close. */
  onOpenChange?: (open: boolean) => void;
};
