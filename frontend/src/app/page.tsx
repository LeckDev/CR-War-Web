import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { TvMinimalPlay, History , Users, ArrowRight } from "lucide-react";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center flex-1">
      <section className="py-20 px-4 flex flex-col items-center text-center space-y-8 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
          Dominez la <span className="text-primary">Guerre de Clans</span>
        </h1>
        <p className="max-w-[600px] text-slate-400 text-lg md:text-xl">
          Suivez les performances de votre clan et de ses membres
        </p>
      </section>

      <section className="max-w-7xl w-full px-4 flex gap-8 flex flex-col md:flex-row">
        <div className="flex-1">
          <FeatureCard
            icon={<History className="text-primary" />}
            title="Historique de Guerre"
            description="Visualisez vos dernières guerres de clan"
            href="/register-clan"
          />
        </div>
        <div className="flex-1">
          <FeatureCard
            icon={<TvMinimalPlay className="text-primary" />}
            title="Guerre de clan en live"
            description="Affichez les données de la guerre de clan en cours"
          />
        </div>
        <div className="flex-1">
          <FeatureCard
            icon={<Users className="text-primary" />}
            title="Résultat de la guerre de clan  "
            description="Visualisez les membres à avertir ou promouvoir"
          />
        </div>

      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, href = "#" }: { icon: React.ReactNode, title: string, description: string, href?: string }) {

  // Contenu interne de la carte
  const CardContent = () => (
    <>
      {/* COUCHE DE DÉCORATION (Le "Glow" interne au survol) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>

      {/* PARTIE HAUTE : Icône, Titre, Description */}
      <div className="relative z-10 flex flex-col items-start">
        {/* Conteneur d'icône qui s'agrandit et change de couleur au survol */}
        <div className="p-3 mb-4 w-fit rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
          {/* On clone l'icône pour lui donner une taille fixe si besoin */}
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: "w-6 h-6 text-primary"
          })}
        </div>

        {/* Le titre se colore en violet au survol */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* PARTIE BASSE (Footer) : Appel à l'action */}
      <div className="relative z-10 mt-6 flex items-center text-primary font-semibold text-sm">
        <span className="group-hover:underline">Explorer</span>
        {/* La flèche se déplace vers la droite au survol */}
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </>
  );

  // Classes communes pour le conteneur de la carte
  const containerClasses = "flex-1 group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex flex-col justify-between h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300";

  // Si c'est un lien, on utilise le composant Link de Next.js
  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        <CardContent />
      </Link>
    );
  }

  // Sinon, une simple div
  return (
    <div className={containerClasses}>
      <CardContent />
    </div>
  );
}