import Logo from "@/components/Logo";
import { Spinner } from "@/components/ui/spinner";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect("/all-courses");
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Spinner className="size-10 text-primary " />
        </div>
      }
    >
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
        {/* Left Side - Decorative */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

          {/* Animated Background Elements */}
          <div className="absolute -left-[20%] top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] animate-pulse" />
          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse delay-1000" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo className="h-8 w-auto" />
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This platform has completely transformed how I learn. The
                community and resources are unmatched.&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                Sofia Davis, Senior Developer
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8 lg:p-8 bg-background relative overflow-hidden">
          {/* Mobile Background Elements */}
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px] lg:hidden" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-[80px] lg:hidden" />

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] relative z-10">
            <div className="lg:hidden mb-8">
              <Logo className="h-8 w-auto mx-auto" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
