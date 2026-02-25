import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="relative w-full max-w-100">
        {/* Un petit effet de halo derrière le formulaire pour le style gaming */}
        <div className="absolute -inset-1 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 opacity-20 blur"></div>

        <SignIn
          appearance={{
            elements: {
              card: "bg-slate-900 border border-slate-800 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton:
                "bg-slate-800 border-slate-700 text-white hover:bg-slate-700",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              footerActionLink: "text-blue-400 hover:text-blue-300",
              dividerLine: "bg-slate-700",
              dividerText: "text-slate-500",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-800 border-slate-700 text-white",
            },
          }}
        />
      </div>
    </div>
  );
}
