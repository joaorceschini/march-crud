import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { jetBrainsMono } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: "crud app",
  description: "crud app for march",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetBrainsMono.className} antialiased`}>
        <div className="w-full max-w-[60rem] mx-auto p-4 flex flex-col gap-10 text-sm">
          <header className="flex justify-between">
            <Link href="/">crud app</Link>
            <Link href="/create">create</Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
