import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuraFit AI | Premium Gym Ecosystem",
  description: "Hyper-personalized AI fitness tracking, RAG coaching, and social circles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-neutral-950 text-neutral-50 antialiased">
      <body>{children}</body>
    </html>
  );
}