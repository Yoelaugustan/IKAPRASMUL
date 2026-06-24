"use client";

import { Input } from "@/components/ui/input";

// URL + live preview. There is no upload pipeline yet, so this takes a
// /media path or an external URL; the preview uses a plain <img> to tolerate
// any host without next/image remotePatterns.
export function ImageField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? "/media/… or https://…"}
      />
      {value ? (
        <div className="relative h-28 w-full overflow-hidden rounded-md border border-input bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
