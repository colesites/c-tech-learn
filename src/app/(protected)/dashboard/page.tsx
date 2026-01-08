import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");
  if (session.user.role !== "PRO") redirect("/#pricing");

  return (
    <MaxWidthWrapper>
      <div>
        <h1>Dashboard</h1>
        <p>Manage your subscriptions and access your courses here.</p>
      </div>
    </MaxWidthWrapper>
  );
}
