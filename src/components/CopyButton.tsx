"use client";

import { useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs p-3 rounded border border-border hover:bg-muted transition"
    >
      {copied ? <LuCheck /> : <LuCopy />}
    </button>
  );
};

export default CopyButton;
