import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <SignUp
        appearance={{
          elements: {
            card: "bg-slate-900 border border-slate-800",
            headerTitle: "text-white",
          },
        }}
      />
    </div>
  );
}
