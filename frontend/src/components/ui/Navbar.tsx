"use client";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="border-b border-slate-800 bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo / Titre */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-bold text-xl tracking-tighter hover:text-primary transition-colors">
                            CR<span className="text-primary text-sm"> WAR</span>
                        </Link>
                    </div>

                    {/* Section Utilisateur */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-primary transition-colors">
                                    Connexion
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                                <UserButton
                                    appearance={{
                                        layout: {
                                            logoPlacement: "none",
                                            shimmer: true
                                        },
                                        elements: {
                                            footer: "hidden",
                                            internal: "hidden",
                                            avatarBox: "border-2 border-primary/20 hover:border-primary transition-all"

                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>
                    </div>

                </div>
            </div>
        </nav>
    );
}