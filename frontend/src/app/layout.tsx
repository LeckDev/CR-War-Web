import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. On importe le Provider de Clerk
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClashManager SaaS",
  description: "Gérez votre clan Clash Royale comme un pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. On englobe toute l'application HTML avec le Provider
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
