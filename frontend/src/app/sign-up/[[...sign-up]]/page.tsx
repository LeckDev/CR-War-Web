import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-950 px-4">
      <SignUp
        appearance={{
          elements: {
            card: "bg-slate-900 border border-slate-800",
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
  );
}
