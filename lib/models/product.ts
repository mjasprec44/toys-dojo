import mongoose, { Schema, Document } from "mongoose";

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

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  brand: string;
  condition: Condition;
  issues: string[];
  tags: Tag[];
  openForTrade: boolean;
  order: number;
  boardId: mongoose.Types.ObjectId;
  columnId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: Status;
  images: string[];
  quantity: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      //   required: true,
      trim: true, // e.g. "Bandai", "Banpresto", "Good Smile", "Funko"
    },
    condition: {
      type: String,
      enum: [...CONDITIONS],
      required: true,
    },
    issues: [{ type: String, trim: true }], // e.g. ["scuffed paint on left arm", "missing sword"]
    tags: {
      type: [{ type: String, enum: [...TAGS] }],
      //   required: true,
      validate: {
        validator: (v: Tag[]) => v.length > 0,
        message: "At least one franchise tag is required",
      },
    },
    // --- marketplace / kanban fields ---
    openForTrade: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },

    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [...STATUS],
      default: "available",
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one image is required",
      },
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0, // 0 = out of stock, keep listing visible
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Indexes for the queries a marketplace actually runs
ProductSchema.index({ tags: 1, condition: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ name: "text", description: "text" });

// Kanban / marketplace queries
ProductSchema.index({ columnId: 1, order: 1 });
ProductSchema.index({ boardId: 1, status: 1 });
ProductSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
