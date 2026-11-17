import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSafeExternalUrl(value: string | undefined): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !!url.hostname;
  } catch {
    return false;
  }
}

export function isUsableHref(value: string | undefined): value is string {
  if (!value || value === "#") return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  return isSafeExternalUrl(value);
}
