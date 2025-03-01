"use client";

import { useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import Main from "./main/page";
import "@/style/globals.css";
import { KirbyIcon } from "@/components/Kirby";

export default function HomePage() {
  const { isVerified, isChecking } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (isChecking) return; // 仍在检查时不执行跳转逻辑

    if (!isVerified) {
      router.replace("/password");
    }
  }, [isChecking, isVerified, router]);
  if (isChecking) {
    return (
      <div className="home-container">
        <KirbyIcon />
      </div>
    );
  }
  if (!isVerified) {
    return (
      <div className="home-container">
        <KirbyIcon />
      </div>
    );
  } else {
    return <Main />;
  }
}
