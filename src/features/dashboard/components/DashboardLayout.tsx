"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | undefined;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth entry animation for the main content
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 px-4 backdrop-blur-md">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest pl-2 border-l border-border/50 ml-2">
              Learning Space
            </h1>
          </div>
        </header>
        <main ref={contentRef} className="flex-1 overflow-auto p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
