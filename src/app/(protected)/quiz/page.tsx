import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function Quiz() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");
  if (session.user.role !== "PRO") redirect("/#pricing");

  return (
    <div>
      <h1>Quiz</h1>
      <p>Take our quizzes to test your knowledge.</p>
    </div>
  );
}
