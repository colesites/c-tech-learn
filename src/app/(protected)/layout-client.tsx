"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";

interface ProtectedLayoutClientProps {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | undefined;
}

export function ProtectedLayoutClient({ children, user }: ProtectedLayoutClientProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isCourseOverviewOrModule = pathname.startsWith("/course") && pathSegments.length < 4;

  if (isCourseOverviewOrModule) {
    return (
      <section className="w-full">
        {children}
      </section>
    );
  }

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
}
