"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconLoader2, IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  onContinue,
  onGenerate,
}: {
  onChange?: (files: File[]) => void;
  onContinue?: () => void;
  onGenerate?: (
  topic: string,
  fileName: string
) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [topic, setTopic] = useState("");
  const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

  const handleFileChange = (newFiles: File[]) => {
  if (newFiles.length === 0) return;

  setFile(newFiles[0]);

  onChange?.([newFiles[0]]);
};
const resetUpload = () => {
  setFile(null);
  setUploadResult(null);
  setIsUploading(false);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};
  const handleClick = () => {
    fileInputRef.current?.click();
  };
const uploadFile = async () => {
  if (!file) return;

  setUploadError(null);
  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

   const response = await fetch(`${API}/upload-pdf`, {
  method: "POST",
  body: formData,
});;

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

    setUploadResult(data);
  } catch (error) {
    console.error(error);
    setUploadError("Failed to upload PDF. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,

    accept: {
      "application/pdf": [".pdf"],
    },

    onDrop: handleFileChange,

    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={!uploadResult ? handleClick : undefined}
        whileHover="animate"
        className="group/file relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0F1117] p-10 backdrop-blur-xl"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
          {!uploadResult && (
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 text-xl font-semibold text-white">
            Upload PDF
          </p>

          <p className="relative z-20 mt-2 text-center text-zinc-400">
            Drag & drop your PDF here or click anywhere to browse
          </p>

          <div className="relative mx-auto mt-10 w-full max-w-xl">
            {file && (
                <motion.div
               key="file"
layoutId="file-upload"
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-xl border border-white/10 bg-[#18181B] p-5",
                    "shadow-lg",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="max-w-xs truncate text-base text-white"
                    >
                      {file.name}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg bg-[#0F1117] px-3 py-1 text-sm text-zinc-300"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="mt-3 flex w-full flex-col items-start justify-between text-sm text-zinc-400 md:flex-row md:items-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-md bg-[#0F1117] px-2 py-1"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                  <div className="mt-5 flex justify-end">
  <button
  onClick={(e) => {
    e.stopPropagation();
    uploadFile();
  }}
  disabled={isUploading}
  className="rounded-xl bg-[#14B8A6] px-6 py-3 font-semibold text-[#09090B] transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
>
  {isUploading ? (
  <span className="flex items-center gap-2">
    <IconLoader2 className="h-5 w-5 animate-spin" />
    Uploading...
  </span>
) : (
  "Upload PDF"
)}
</button>
</div>
                </motion.div>
              )}

            {!file && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 mx-auto mt-4 flex h-40 w-full max-w-[12rem] items-center justify-center rounded-2xl border border-dashed border-teal-500/40 bg-[#18181B] group-hover/file:shadow-[0_0_40px_rgba(20,184,166,0.2)]",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-teal-400"
                  >
                    Drop PDF
                    <IconUpload className="mt-2 h-8 w-8" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-10 w-10 text-teal-400" />
                )}
              </motion.div>
            )}

           {!file && (
              <motion.div
                variants={secondaryVariant}
                className="absolute inset-0 z-30 mx-auto mt-4 flex h-40 w-full max-w-[12rem] items-center justify-center rounded-2xl border border-dashed border-teal-500/40 bg-transparent opacity-0"
              ></motion.div>
            )}
          </div>
        </div>
        )}
        {uploadError && (
  <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
    <h3 className="text-xl font-semibold text-red-400">
      ✕ Upload Failed
    </h3>

    <p className="mt-3 text-sm text-zinc-300">
      {uploadError}
    </p>

    <button
      onClick={(e) => {
        e.stopPropagation();
        uploadFile();
      }}
      className="mt-5 rounded-xl bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-400"
    >
      Retry
    </button>
  </div>
)}
       {uploadResult && (
  <div className="mt-8 rounded-3xl border border-[#14B8A6]/20 bg-[#18181B] p-7 shadow-[0_0_40px_rgba(20,184,166,0.12)]">

    <div className="flex items-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#14B8A6]/20 bg-[#14B8A6]/10 text-3xl text-[#14B8A6]">
        ✓
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">
          Knowledge Base Updated
        </h3>

        <p className="text-sm text-zinc-400">
          Your PDF has been successfully indexed and is ready for AI processing.
        </p>
      </div>
    </div>

    <div className="mt-8 rounded-2xl border border-white/10 bg-[#09090B]/60 p-5">

     

      <p className="mt-2 text-lg font-semibold text-white">
        📄 {uploadResult.filename}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <div>
          <p className="text-zinc-400">
  <span className="font-semibold text-white">
    {uploadResult.total_chunks}
  </span>{" "}
  semantic chunks indexed successfully.
</p>
        </div>

        <div className="rounded-xl border border-[#14B8A6]/20 bg-[#14B8A6]/10 px-4 py-2 text-sm text-[#14B8A6]">
          Ready for AI Processing
        </div>

      </div>

    </div>
   <div
  className="mt-6"
  onClick={(e) => e.stopPropagation()}
>
  <label className="mb-2 block text-sm font-medium text-white">
    Research Topic
  </label>

  <input
    type="text"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    placeholder="e.g. Explain Neural Networks"
    className="w-full rounded-xl border border-white/10 bg-[#0F1117] px-4 py-3 text-white outline-none transition focus:border-[#14B8A6]"
  />
</div>

    <div className="mt-8 flex items-center justify-between">
  <button
    onClick={(e) => {
      e.stopPropagation();
      resetUpload();
      handleClick();
    }}
    className="text-sm font-medium text-[#14B8A6] transition hover:text-teal-300"
  >
    ← Replace PDF
  </button>

  <button
    onClick={(e) => {
  e.stopPropagation();

  onGenerate?.(
  topic,
  uploadResult.filename
);

onContinue?.();
}}
    disabled={!topic.trim()}
    className="rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
  >
    Continue →
  </button>
</div>
  </div>
)}

      </motion.div>
    </div>
  );
};