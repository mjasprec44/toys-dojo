// types/product.types.ts — NO mongoose import, ever
export const TAGS = [
  "dragon-ball",
  "one-piece",
  "naruto",
  "demon-slayer",
  "jujutsu-kaisen",
  "my-hero-academia",
  "pokemon",
  "gundam",
  "sailor-moon",
  "evangelion",
  "other",
] as const;

export const CONDITIONS = [
  "new",
  "used",
  "loose",
  "mint-sealed",
  "mint-box",
  "back-in-box",
] as const;

export const STATUS = [
  "draft",
  "available",
  "reserved",
  "pending",
  "sold",
] as const;

export type Tag = (typeof TAGS)[number];
export type Condition = (typeof CONDITIONS)[number];
export type Status = (typeof STATUS)[number];

export interface IProduct {
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
  status: Status;
  images: string[];
  quantity: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
