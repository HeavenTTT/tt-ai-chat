// This is the entry point of the application. It will redirect the user to the password page if the password is not verified, or to the main page if the password is verified.

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isVerified = localStorage.getItem("passwordVerified");
    
    if (!isVerified) {
      router.replace("/password"); // 未验证跳转到密码页
    } else {
      router.replace("/main"); // 已验证跳转到主页面
    }
  }, [router]);

  return null; // 该页面不会渲染 UI，因为会自动跳转
}
