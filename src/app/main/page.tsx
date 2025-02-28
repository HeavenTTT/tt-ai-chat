"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { KirbyIcon } from "@/components/Kirby";

export default function Main() {
  const { isVerified, isChecking } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (!isChecking) {
      if (isVerified) {
        router.replace("/main");
      } else {
        router.replace("/password");
      }
    }
  }, [isVerified, isChecking, router]);
  if (isChecking || !isVerified) {
    return <KirbyIcon />;
  }
  return (
    <div className="">
      <main className="">114514</main>
      <footer className=""></footer>
    </div>
  );
}
