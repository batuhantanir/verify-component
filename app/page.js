import EmailVerify from "@/components/EmailVerify";

export default function Home() {
  return (
    <main >
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-white from-[50%] to-deep-slate-blue to-[50%]">
        <EmailVerify />
      </div>
    </main>
  );
}
