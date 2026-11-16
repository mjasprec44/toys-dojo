"use client";

import { ImagePlus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ImageUploaderProps = {
  value: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
};

function matchesAccept(file: File, accept: string) {
  const parts = accept.split(",").map((s) => s.trim().toLowerCase());
  return parts.some((part) => {
    if (part === "*" || part === "*/*") return true;
    if (part.endsWith("/*")) return file.type.startsWith(part.slice(0, -1));
    if (part.startsWith(".")) return file.name.toLowerCase().endsWith(part);
    return file.type === part;
  });
}

export function ImageUploader({
  value,
  onChange,
  accept = "image/*",
  maxFiles = 5,
  multiple = true,
  disabled,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // Create one blob URL per file; revoke when files change or unmount.
  const previews = useMemo(
    () => value.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [value],
  );

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const isFull = value.length >= maxFiles;
  const canAddMore = !isFull && !disabled;

  function commit(incoming: File[]) {
    const remaining = maxFiles - value.length;
    if (remaining <= 0) return;

    const valid = incoming.filter((f) => matchesAccept(f, accept));
    const next = multiple
      ? [...value, ...valid.slice(0, remaining)]
      : valid.slice(0, 1);
    onChange(next);
  }

  function handleFiles(files: FileList | File[] | null) {
    if (!files || !canAddMore) return;
    commit(Array.from(files));
  }

  function handleRemove(index: number) {
    if (disabled) return;
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={canAddMore ? 0 : -1}
        aria-disabled={!canAddMore}
        aria-label="Upload images"
        onClick={() => canAddMore && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && canAddMore) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          if (!canAddMore) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={[
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          canAddMore
            ? "cursor-pointer hover:border-primary/60"
            : "cursor-not-allowed opacity-60",
          dragging ? "border-primary bg-primary/5" : "border-input",
        ].join(" ")}
      >
        <ImagePlus className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {canAddMore
            ? "Click to upload or drag & drop"
            : "Maximum number of images reached"}
        </p>
        <p className="text-xs text-muted-foreground">
          {value.length} / {maxFiles} selected
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={!canAddMore}
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            // Reset so selecting the same file again re-fires onChange
            e.target.value = "";
          }}
        />
      </div>

      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {previews.map(({ file, url }, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-md border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={file.name}
                className="h-full w-full object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-[10px] text-white">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
