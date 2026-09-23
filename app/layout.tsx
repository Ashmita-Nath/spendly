import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spendly — Business Spend Management",
  description: "AI-powered business spend management dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
