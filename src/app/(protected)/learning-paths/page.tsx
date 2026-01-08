import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function LearningPaths() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");
  if (session.user.role !== "PRO") redirect("/#pricing");

  return <div></div>;
}
