"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface CreateProductDialogProps {
  columnId: string;
  boardId: string;
}

function CreateProductDialog({ columnId, boardId }: CreateProductDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Plus />
            Add Job
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>

        <form>
          <div>
            <div></div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProductDialog;
