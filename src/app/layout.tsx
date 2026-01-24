import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ConsentManager } from "@/components/consent-manager";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "C Tech Learn",
    template: "%s | C Tech Learn",
  },
  description: "",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-background"
      suppressHydrationWarning
    >
      <body className={`${interSans.variable} antialiased`}>
        <ConsentManager>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster richColors />
          </ThemeProvider>
        </ConsentManager>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
