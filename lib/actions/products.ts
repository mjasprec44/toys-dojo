"use server";

import { CreateProductPropTypes } from "@/types";
import { getSession } from "../auth/auth";
import dbConnect from "../dbConnect";
import { Board, Column, Product } from "../models";
import { uniqueSlug } from "../utils/slug";

export async function createProduct(data: CreateProductPropTypes) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await dbConnect();

  const {
    name,
    description,
    price,
    brand,
    boardId,
    columnId,
    condition,
    issues,
    tags,
    openForTrade,
    status,
    imageUrls,
    quantity,
  } = data;

  if (
    !name ||
    !description ||
    !price ||
    !boardId ||
    !columnId ||
    !condition ||
    !status ||
    !imageUrls
  ) {
    return { error: "Missing required fields" };
  }

  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  const column = await Column.findOne({
    _id: columnId,
    boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  // Sort the products order and get the last order where new product will be placed
  const maxOrder = (await Product.findOne({ columnId })
    .sort({ order: -1 })
    .select("order -_id")
    .lean()) as { order: number } | null;

  const itemSlug = await uniqueSlug(name, Product);
  const cleanImages = (imageUrls ?? []).filter(Boolean);

  if (cleanImages.length === 0)
    return { error: "At least one image is required" };

  const newProduct = await Product.create({
    name,
    description,
    price,
    brand,
    boardId,
    columnId,
    userId: session.user.id,
    condition,
    issues,
    tags: tags || [],
    openForTrade,
    order: (maxOrder?.order ?? -1) + 1,
    status,
    images: cleanImages,
    quantity,
    slug: itemSlug,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { products: newProduct._id },
  });

  return { data: { id: newProduct._id.toString() } };
}
