"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { PRODUCT_FORM_FIELDS } from "@/constants/product-form-fields";
import { useRouter } from "next/navigation";

import { ProductFormValues } from "@/types";
import { createProduct } from "@/lib/actions/products";
import { upload } from "@vercel/blob/client";
import { FormDialog } from "./form/form-dialog";

interface CreateProductDialogProps {
  columnId: string;
  boardId: string;
}

function CreateProductDialog({ columnId, boardId }: CreateProductDialogProps) {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      // Extract images so File objects aren't sent to the Server Action
      const { images, ...productData } = values;

      const files = images as File[];

      const imageUrls = await Promise.all(
        files.map((file) =>
          upload(`products/${crypto.randomUUID()}-${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/upload",
          }).then((blob) => blob.url),
        ),
      );

      const res = await createProduct({
        ...productData,
        imageUrls,
        columnId,
        boardId,
      });

      if (res.error) {
        setServerError(res.error);
        toast.error(res.error || "Could not create product");
        return;
      } else {
        toast.success("Product added");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormDialog
      title="Add Item"
      description="Track a new item"
      submitLabel="Add"
      isSubmitting={isSubmitting}
      serverError={serverError}
      fields={PRODUCT_FORM_FIELDS}
      validate={() => {
        const errors: Record<string, string> = {};
        return errors;
      }}
      onSubmit={handleSubmit}
      trigger={
        <Button variant="outline">
          <Plus /> Add Item
        </Button>
      }
    />
  );
}

export default CreateProductDialog;
