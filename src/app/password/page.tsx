"use client";

import { useState, useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import { KirbyIcon } from "@/components/Kirby";
import "@/style/password.css";

export default function PasswordPage() {
  const { isVerified, isChecking, currentQuestion, verifyPassword } =
    useAuthGuard();
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!isChecking && isVerified) {
      router.replace("/"); // 只在验证完成后跳转
    }
  }, [isVerified, isChecking, router]);

  if (isChecking || isVerified) return <KirbyIcon />; // 避免中途渲染 UI

  const handleVerifyPassword = async () => {
    await verifyPassword(password);
  };

  return (
    <div className="password-page">
      <div className="password-container">
        <input
          className="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={currentQuestion || "请输入密码"}
        />
        <button className="verify-button" onClick={handleVerifyPassword}> 🥔
        </button>
      </div>
    </div>
  );
}
