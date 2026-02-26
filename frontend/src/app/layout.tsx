import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/ui/Navbar";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClashRoyale War",
  description: "Gérez vos guerres de clan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
        // 1. On utilise la base "dark" de Clerk pour gagner du temps
        theme: dark,
        variables: {
          // 2. On mappe la couleur principale (ton violet shadcn)
          colorPrimary: "hsl(263.4, 70%, 50.4%)", // Remplace par ta valeur exacte de globals.css
          colorBackground: "#020617", // Ton --background shadcn
          colorInputBackground: "#0f172a",
          colorInputText: "white",
          borderRadius: "0.5rem", // Pour matcher les coins de tes boutons shadcn
        },
        elements: {
          // 3. On utilise Tailwind pour le "fine-tuning" des composants
          card: "bg-slate-950 border border-slate-800 shadow-xl border-primary/20",
          navbar: "hidden", // Si tu veux cacher leur header interne
          formButtonPrimary: 
            "bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
        },
      }}>
      <html lang="fr">
        <body className={`${inter.className} dark bg-background text-foreground flex flex-col h-dvh`}>
          <Navbar/>
          <main className="flex flex-1">{children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
