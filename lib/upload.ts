// lib/upload.ts
import { put } from "@vercel/blob";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — safely under Vercel's 4.5 MB limit
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export function validateImage(file: File) {
  if (file.size === 0) throw new Error("File is empty");
  if (file.size > MAX_BYTES) throw new Error(`${file.name} exceeds 4 MB`);
  if (!ALLOWED_TYPES.has(file.type))
    throw new Error(`${file.name}: unsupported type`);
}

export async function storeImage(file: File, prefix: string) {
  validateImage(file);
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const key = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
}
