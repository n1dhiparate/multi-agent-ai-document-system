"use client";

import { X } from "lucide-react";

type WelcomeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WelcomeModal({
  open,
  onClose,
}: WelcomeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#18181B] p-10 shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-zinc-500 transition hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Badge */}
        <span className="inline-flex rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-4 py-2 text-sm font-medium text-[#14B8A6]">
          AI Portfolio Project
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
          Welcome 
        </h1>

        <p className="mt-3 text-lg text-zinc-400">
          Thank you for checking out my{" "}
          <span className="font-semibold text-white">
            Multi-Agent AI Document System.
          </span>
        </p>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Stack */}
        <h2 className="text-xl font-semibold text-white">
          Tech Stack
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">

          {[
            "Next.js",
            "FastAPI",
            "LangChain",
            "ChromaDB",
            "Sentence Transformers",
            "Groq",
            "Railway",
            "Vercel",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
            >
              {item}
            </span>
          ))}

        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Notes */}
        <h2 className="text-xl font-semibold text-white">
          Demo Notes
        </h2>

        <div className="mt-5 space-y-5">

          <div className="flex gap-3">
            <span className="text-[#14B8A6]">✓</span>
            <p className="text-zinc-300">
              This demo uses the{" "}
              <strong className="text-white">
                Groq Free Tier
              </strong>
              . Occasional{" "}
              <strong className="text-white">
                HTTP 429
              </strong>{" "}
              rate-limit responses are expected after multiple requests.
              Simply wait a few seconds and retry.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-[#14B8A6]">✓</span>
            <p className="text-zinc-300">
              The backend is deployed on{" "}
              <strong className="text-white">
                Railway
              </strong>
              . The first request may take a few seconds while the service
              wakes up.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-[#14B8A6]">✓</span>
            <p className="text-zinc-300">
              This project is currently optimized for desktop viewing.
              Responsive UI refinements are planned in a future update. Best at 50%.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-[#14B8A6]">✓</span>
            <p className="text-zinc-300">
              The hero visualization is currently a placeholder.
              An interactive AI workflow animation will be added in a future
              release.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">

          <div>
            <p className="text-sm text-zinc-500">
              Built by
            </p>

            <p className="font-medium text-white">
              Nidhi Parate
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#14B8A6] px-7 py-3 font-medium text-black transition hover:scale-105 hover:bg-[#2DD4BF]"
          >
            Explore Project →
          </button>

        </div>

      </div>
    </div>
  );
}