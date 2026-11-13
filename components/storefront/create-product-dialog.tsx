"use client";

import { useState } from "react";
import { FormDialog } from "./form-dialog";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { PRODUCT_FORM_FIELDS } from "@/constants/product-form-fields";
import { useRouter } from "next/navigation";

import { ProductFormValues } from "@/types";
import { createProduct } from "@/lib/actions/products";

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
      const res = await createProduct({
        ...values,
        columnId,
        boardId,
      });

      if (res.error) {
        toast.error(res.error || "Could not send reset email");
      } else {
        toast.success("Reset link has been sent to your email");
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
