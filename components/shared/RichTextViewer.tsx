import React from "react";
import { cn } from "@/lib/utils";

export interface RichTextViewerProps {
  /** HTML content string (e.g. from rich text editor / CMS) */
  content?: string;
  /** Fallback HTML string if content is empty or undefined */
  fallback?: string;
  /** Custom class overrides */
  className?: string;
  /** HTML element wrapper, defaults to 'div' */
  as?: React.ElementType;
}

/**
 * Ensures empty paragraphs (<p></p> or <p><br></p>) created by pressing Enter in rich text editor
 * maintain full line height instead of collapsing to 0px height in browser DOM.
 */
export function preserveEmptyParagraphs(html?: string): string {
  if (!html) return "";
  return html.replace(/<p([^>]*)>(\s*|<br\s*\/?>)?<\/p>/gi, "<p$1>&nbsp;</p>");
}

/**
 * Reusable Rich Text HTML Renderer with responsive typography styling
 * for Headings (h1-h4), Paragraphs, Lists, Quotes, Code blocks, and Links.
 */
export function RichTextViewer({
  content,
  fallback = "",
  className,
  as: Component = "div",
}: RichTextViewerProps) {
  const rawHtml = content && content.trim() ? content : fallback;
  const processedHtml = preserveEmptyParagraphs(rawHtml);

  if (!processedHtml) return null;

  return (
    <Component
      className={cn(
        // Base Typography & Spacing
        "text-gray-700 leading-relaxed",
        // Headings
        "[&_h1]:text-2xl sm:[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-[#1A1A2E] [&_h1]:tracking-tight [&_h1]:mt-6 [&_h1]:mb-3 [&_h1:first-child]:mt-0",
        "[&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#1A1A2E] [&_h2]:tracking-tight [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h2:first-child]:mt-0",
        "[&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[#1A1A2E] [&_h3]:mt-4 [&_h3]:mb-2 [&_h3:first-child]:mt-0",
        "[&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#1A1A2E] [&_h4]:mt-3 [&_h4]:mb-1.5 [&_h4:first-child]:mt-0",
        // Paragraphs & Enter-gap Preservation
        "[&_p]:min-h-[1.5em] [&_p]:mb-4 last:[&_p]:mb-0",
        // Text styling & emphasis
        "[&_strong]:font-semibold [&_strong]:text-[#1A1A2E] [&_b]:font-semibold [&_b]:text-[#1A1A2E]",
        "[&_em]:italic [&_i]:italic",
        "[&_u]:underline [&_u]:underline-offset-2",
        "[&_s]:line-through [&_s]:opacity-75 [&_del]:line-through [&_del]:opacity-75",
        // Lists
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1.5",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1.5",
        "[&_li]:text-gray-700 [&_li]:leading-relaxed",
        // Quotes & Dividers
        "[&_blockquote]:border-l-4 [&_blockquote]:border-[#0056D2] [&_blockquote]:pl-4 [&_blockquote]:py-1.5 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-800 [&_blockquote]:bg-gray-50/70 [&_blockquote]:rounded-r-lg",
        "[&_hr]:my-6 [&_hr]:border-gray-200",
        // Code
        "[&_code]:bg-gray-100 [&_code]:text-pink-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono",
        "[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0",
        // Links
        "[&_a]:text-[#0056D2] [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium hover:[&_a]:text-[#003d99] [&_a]:transition-colors",
        className
      )}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}

export default RichTextViewer;
