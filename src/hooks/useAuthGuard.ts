"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const verified = localStorage.getItem("passwordVerified");

    if (!verified) {
      router.replace("/password"); // 未验证，跳转到密码页面
    } else {
      setIsVerified(true); // 已验证
    }
  }, [router]);

  return isVerified; // 返回验证状态
}
