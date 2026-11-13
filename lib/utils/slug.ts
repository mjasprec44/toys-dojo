// lib/utils/slug.ts
import slugify from "slugify";
import type { Model } from "mongoose";

export function baseSlug(name: string) {
  return slugify(name, { lower: true, strict: true, trim: true }).slice(0, 80);
}

export async function uniqueSlug(name: string, model: Model<unknown>) {
  const root = baseSlug(name) || "item";
  if (!(await model.exists({ slug: root }))) return root;
  for (let i = 2; i <= 10; i++) {
    const candidate = `${root}-${i}`;
    if (!(await model.exists({ slug: candidate }))) return candidate;
  }
  return `${root}-${crypto.randomUUID().slice(0, 8)}`;
}
