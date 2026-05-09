import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const entityMap: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&#x27;': "'", '&#x2F;': '/', '&nbsp;': ' ',
};
export function stripHtml(html: string): string {
  if (!html) {
    return '';
  }
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[#\w]+;/g, (m) => entityMap[m] ?? m);
}

export const cleanUrl = (rawUrl: string) => {
  return rawUrl
    .replace(/&#x2F;/g, '/')   // แปลง &#x2F; กลับเป็น /
    .replace(/&amp;/g, '&')   // แปลง &amp; กลับเป็น & (เผื่อมี query parameters)
    .replace(/&quot;/g, '"'); // แปลงเผื่อไว้
};
export function pluralize(n: number, singular: string, plural?: string): string {
  return n === 1 ? `${n} ${singular}` : `${n} ${plural ?? singular + 's'}`;
}
export function toHost(url: string): string {
  if (!url) return '';
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}