import { Condition, Tag } from "./product";

export interface Product {
  name: string;
  description: string;
  price: number;
  brand: string;
  condition: Condition;
  issues: string[];
  tags: Tag[];
  openForTrade: boolean;
  order: number;
  boardId: string;
  columnId: string;
  userId: string;
  status: string;
  images: string[];
  quantity: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: Product[];
}

export interface Board {
  _id: string;
  name: string;
  userId: string;
  columns: Column[];
}
