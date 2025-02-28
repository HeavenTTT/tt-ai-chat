"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard"; 
import { useEffect } from "react";
import {  useRouter } from "next/navigation";

export default function HomePage() {
  const { isVerified } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (!isVerified) {
      router.replace("/password");
    }
    else {
      router.replace("/main");
    }
  }, [isVerified, router]);

  return null; // 直接跳转，不需要渲染内容
}
