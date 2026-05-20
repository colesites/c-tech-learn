import { Suspense } from "react";
import { getSession } from "@/lib/auth-server";
import { ProtectedLayoutClient } from "./layout-client";

async function ProtectedShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || null,
      }
    : undefined;

  return (
    <ProtectedLayoutClient user={user}>
      {children}
    </ProtectedLayoutClient>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <ProtectedLayoutClient user={undefined}>
          {children}
        </ProtectedLayoutClient>
      }
    >
      <ProtectedShell>{children}</ProtectedShell>
    </Suspense>
  );
}
