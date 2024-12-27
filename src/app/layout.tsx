import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Manager",
  description:
    "A project management tool for creating workspaces, projects, tasks and handling them efficiently with your co-workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Project Manager" />
      </head>
      <body
        className={cn(inter.className, "antialiased min-h-screen bg-black")}
      >
        <QueryProvider>
          <Toaster />
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
