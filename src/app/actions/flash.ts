"use server";

import { clearFlash } from "@/lib/flash/mutate";

export async function clearFlashAction() {
  await clearFlash();
}
