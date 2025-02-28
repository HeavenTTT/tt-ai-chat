import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const verified = localStorage.getItem("passwordVerified") === "true";
      if (verified) {
        setIsVerified(true);
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch("/api/questions");
        if (!response.ok) throw new Error("获取问题失败");
        const data = await response.json();
        const questionList = data.map((q: { question: string }) => q.question);

        if (questionList.length > 0) {
          const today = new Date().getDate();
          setCurrentQuestion(questionList[today % questionList.length]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, []);

  const verifyPassword = async (password: string) => {
    if (!currentQuestion) return false;

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("passwordVerified", "true");
        setIsVerified(true);
        router.replace("/main");
      }

      return data.success;
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  };

  return { isVerified, isChecking, currentQuestion, verifyPassword };
}
