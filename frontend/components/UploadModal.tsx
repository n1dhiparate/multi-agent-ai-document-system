"use client";
import { FileUpload } from "@/components/ui/file-upload";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UploadModal({
  isOpen,
  onClose,
}: UploadModalProps)  {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#18181B] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-white/70 hover:text-white"
        >
          ✕
        </button>

        <h2 className="mb-6 text-3xl font-bold text-white">
          Upload your PDF
        </h2>

        <p className="mb-8 text-zinc-400">
          Upload a PDF to begin the AI document workflow.
        </p>

        <FileUpload onContinue={onClose} />
      </div>
    </div>
  );
}