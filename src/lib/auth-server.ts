import "server-only";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function getSession() {
  const h = await headers();

  return auth.api.getSession({
    headers: Object.fromEntries(h.entries()),
  });
}
