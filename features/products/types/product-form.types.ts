import { FormValues } from "../../../types/form.types";
import type { PRODUCT_FORM_FIELDS } from "@/features/products/utils/product-form-fields";

export type ProductFormFieldName = (typeof PRODUCT_FORM_FIELDS)[number]["name"];

export type ProductFormValues = FormValues<typeof PRODUCT_FORM_FIELDS>;

export type CreateProductPropTypes = Omit<ProductFormValues, "images"> & {
  boardId: string;
  columnId: string;
  imageUrls: string[];
};
