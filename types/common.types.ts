import { IProduct } from "@/features/products/types/product.types";

export interface IColumn {
  _id: string;
  name: string;
  order: number;
  products: IProduct[];
}

export interface IBoard {
  _id: string;
  name: string;
  userId: string;
  columns: IColumn[];
}
