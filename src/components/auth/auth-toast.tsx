"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { clearFlashAction } from "@/app/actions/flash";

type Flash = { type: "success" | "error"; message: string } | null;

export function AuthToast({ flash }: { flash: Flash }) {
  useEffect(() => {
    if (!flash) return;
    if (flash.type === "success") toast.success(flash.message);
    else toast.error(flash.message);
    void clearFlashAction();
  }, [flash]);

  return null;
}
