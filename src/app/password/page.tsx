"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/style/password.css"; // 引入样式

interface Question {
  question: string;
}

export default function Password() {
  const [question, setQuestion] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/questions"); // 获取所有问题
        if (!response.ok) throw new Error("Failed to fetch");

        const data: Question[] = await response.json();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length); // 前端随机选择
          setQuestion(data[randomIndex].question);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleVerifyPassword = async () => {
    if (!question || !password) return;

    setVerifying(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, password }),
      });

      const data = await response.json();
      setVerificationResult(data.success);

      if (data.success) {
        localStorage.setItem("passwordVerified", "true");
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setVerificationResult(false);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="password-container">
      <h1 className="password-title">请回答问题</h1>
      {loading ? (
        <p className="password-message">加载中...</p>
      ) : (
        <>
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={question || "加载问题失败"}
            disabled={!question} // 如果问题加载失败，禁用输入框
          />
          <button
            className="password-button"
            onClick={handleVerifyPassword}
            disabled={!question || !password || verifying}
          >
            {verifying ? "验证中..." : "提交答案"}
          </button>
          {verificationResult !== null && (
            <p className="password-message">
              {verificationResult ? "密码正确" : "密码错误"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
