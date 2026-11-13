import { FieldConfig, CONDITIONS, TAGS, STATUS } from "@/types";

/* ------------------------------ Helpers ----------------------------------- */

const humanize = (v: string) =>
  v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const optionsFrom = (values: readonly string[]) =>
  values.map((value) => ({ label: humanize(value), value }));

/* --------------------------- The field array ------------------------------ */

export const PRODUCT_FORM_FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    maxLength: 200,
    placeholder: "e.g. Son Goku Super Saiyan Figure",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    rows: 5,
    maxLength: 5000,
    placeholder: "Describe the figure, scale, series, any details…",
  },
  {
    name: "price",
    label: "Price (₱)",
    type: "number",
    required: true,
    numericOnly: true,
    min: 0,
    step: 0.01,
    placeholder: "0.00",
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    required: false,
    maxLength: 100,
    placeholder: "e.g. Bandai, Banpresto, Good Smile, Funko",
  },
  {
    name: "condition",
    label: "Condition",
    type: "select",
    required: true,
    placeholder: "Select a condition",
    options: optionsFrom(CONDITIONS),
  },
  {
    name: "tags",
    label: "Franchise tags",
    type: "multi-select",
    required: true,
    description: "Pick at least one franchise.",
    options: optionsFrom(TAGS),
  },
  {
    name: "issues",
    label: "Issues / defects",
    type: "string-list",
    required: false,
    itemLabel: "Issue",
    maxItems: 20,
    placeholder: "e.g. scuffed paint on left arm",
  },
  {
    name: "openForTrade",
    label: "Open for trade",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "available",
    options: optionsFrom(STATUS),
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    required: true,
    numericOnly: true,
    min: 0,
    step: 1,
    defaultValue: "1", // InputField.defaultValue is string
  },
  {
    name: "images",
    label: "Images",
    type: "image-upload",
    required: true,
    description: "At least one image is required.",
    accept: "image/*",
    maxFiles: 10,
  },
] as const satisfies readonly FieldConfig[];
