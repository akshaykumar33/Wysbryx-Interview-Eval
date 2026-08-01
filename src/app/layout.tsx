import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "wysbryx — Intelligence-Driven Technical Interview Suite",
  description: "Enterprise technical interview scorecard and evaluation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
