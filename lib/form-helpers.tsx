import { PasswordInput } from "@/components/storefront/password-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FieldConfig, FormValuesRecord } from "@/types";

export function getInitialValues(
  fields: readonly FieldConfig[],
): FormValuesRecord {
  const values: FormValuesRecord = {};

  for (const field of fields) {
    switch (field.type) {
      case "checkbox":
        values[field.name] = field.defaultValue ?? false;
        break;
      case "multi-select":
      case "string-list":
      case "image-upload":
        values[field.name] = field.defaultValue ?? [];
        break;
      default:
        values[field.name] = field.defaultValue ?? "";
    }
  }

  return values;
}

export function renderField(
  field: FieldConfig,
  value: string | boolean | undefined,
  onChange: (value: string | boolean) => void,
) {
  const numericOnly = "numericOnly" in field && field.numericOnly;
  const maxLength = "maxLength" in field && field.maxLength;
  const minLength = "minLength" in field && field.minLength;

  switch (field.type) {
    case "password":
      return (
        <PasswordInput
          id={field.name}
          name={field.name}
          maxLength={maxLength ? Number(maxLength) : undefined}
          minLength={minLength ? Number(minLength) : undefined}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={field.required}
          className="border-gray-300 focus:border-primary focus:ring-primary"
        />
      );
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

// TODO
// case "multi-select":
//   return (
//     <div className="flex flex-wrap gap-2">
//       {field.options.map((opt) => {
//         const selected = Array.isArray(value) && value.includes(opt.value);
//         return (
//           <button
//             key={opt.value}
//             type="button"
//             onClick={() => {
//               const current = Array.isArray(value) ? value : [];
//               const next = selected
//                 ? current.filter((v) => v !== opt.value)
//                 : [...current, opt.value];
//               onChange(next);
//             }}
//             className={`rounded-full border px-3 py-1 text-sm ${
//               selected ? "bg-primary text-primary-foreground" : ""
//             }`}
//           >
//             {opt.label}
//           </button>
//         );
//       })}
//     </div>
//   );

// case "string-list":
//   return (
//     <StringListInput
//       value={Array.isArray(value) ? value : []}
//       onChange={onChange}
//       itemLabel={field.itemLabel}
//       maxItems={field.maxItems}
//       placeholder={field.placeholder}
//     />
//   );

// case "image-upload":
//   return (
//     <ImageUploader
//       value={Array.isArray(value) ? (value as File[]) : []}
//       onChange={onChange}
//       accept={field.accept}
//       maxFiles={field.maxFiles}
//     />
//   );
