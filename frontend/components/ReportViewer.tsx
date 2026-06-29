"use client";

import { generatePDF } from "@/utils/pdfGenerator";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ReportViewerProps = {
  report: string;
  fileName: string;
  onGenerateAnother: () => void;
};
export function ReportViewer({
  report,
  fileName,
  onGenerateAnother,
}: ReportViewerProps) {
    const [copied, setCopied] = useState(false);
  if (!report) return null;


  return (
    <section
      id="report-viewer"
      className="min-h-screen bg-[#09090B] px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-4 py-2 text-sm font-medium text-[#14B8A6]">
            Generated Report
          </span>

          <h1 className="mt-6 text-6xl font-bold tracking-tight">
            AI Generated Research Report
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
            Professional report generated using the Multi-Agent AI Document
            System.
          </p>
        </div>

        {/* Metadata */}
        <div className="mb-10 flex flex-wrap gap-10 rounded-2xl border border-white/10 bg-[#18181B]/70 px-8 py-6 backdrop-blur-xl">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Status
            </p>

            <p className="mt-2 font-medium text-[#14B8A6]">
              Completed
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Source
            </p>

            <p
  className="mt-2 max-w-[320px] truncate text-zinc-300"
  title={fileName}
>
  {fileName}
</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mb-10 flex flex-wrap gap-4">

          <button
  onClick={() => generatePDF(report, fileName)}
  className="rounded-xl border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-6 py-3 text-sm font-medium text-[#14B8A6] transition hover:bg-[#14B8A6]/20"
>
  Download PDF
</button>

          <button
  onClick={() => {
    navigator.clipboard.writeText(report);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }}
  className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
>
  {copied ? "Copied!" : "Copy Report"}
</button>
          <button
  onClick={onGenerateAnother}
  className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
>
  Generate Another
</button>

        </div>

        {/* Report */}
        <div className="rounded-[32px] border border-white/10 bg-[#18181B]/80 p-16 shadow-2xl backdrop-blur-xl">

          <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ children }) => (
      <h1 className="mb-8 mt-14 border-b border-white/10 pb-4 text-5xl font-bold tracking-tight text-white">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-6 mt-12 text-4xl font-semibold tracking-tight text-white">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl font-semibold text-white">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-6 text-lg leading-8 text-zinc-300">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),

    ul: ({ children }) => (
      <ul className="mb-8 ml-6 list-disc space-y-3 text-zinc-300">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-8 ml-6 list-decimal space-y-3 text-zinc-300">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="leading-8">
        {children}
      </li>
    ),

    hr: () => (
      <hr className="my-12 border-white/10" />
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#14B8A6] pl-6 italic text-zinc-400">
        {children}
      </blockquote>
    ),

    code: ({ children }) => (
      <code className="rounded bg-black/40 px-2 py-1 font-mono text-sm text-[#14B8A6]">
        {children}
      </code>
    ),

    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th className="border border-white/10 bg-white/5 px-4 py-3 text-left text-white">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border border-white/10 px-4 py-3 text-zinc-300">
        {children}
      </td>
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        className="text-[#14B8A6] underline underline-offset-4 hover:text-cyan-300"
      >
        {children}
      </a>
    ),
  }}
>
  {report}
</ReactMarkdown>

        </div>

      </div>
    </section>
  );
}