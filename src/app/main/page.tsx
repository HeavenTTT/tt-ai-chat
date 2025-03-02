// Code Generated with SimpleCodeGenerator: https://www.npmjs.com/package/simple-code-generator
"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard"; // 验证
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KirbyIcon } from "@/components/Kirby";
import { useTheme } from "@/context/ThemeContext";
import { AlignLeft, X } from "lucide-react";
import "@/style/main.css";
///
///
///
export default function Main() {
  const { isVerified, isChecking } = useAuthGuard(); /// 验证
  const router = useRouter(); /// 路由
  const { theme, toggleTheme } = useTheme(); /// 主题
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); /// 侧边栏
  /// 触屏侧边栏
  useEffect(() => {
    if (!isChecking) {
      if (isVerified) {
        router.replace("/");
      } else {
        router.replace("/password");
      }
    }
  }, [isVerified, isChecking, router]);

  ///触屏侧边栏
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  useEffect(() => {

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX.current - touchStartX.current;

      if (swipeDistance < -50) {
        // 左滑：关闭侧边栏
        setIsSidebarOpen(false);
      }
      /*else if (swipeDistance > 50) {
        // 右滑：打开侧边栏
        setIsSidebarOpen(true);
      } 
        */
    };
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  /// 路由
  /// 加载中
  ///
  if (isChecking || !isVerified) {
    return (
      <div className="home-container">
        <KirbyIcon />
      </div>
    );
  }
  /// 页面
  return (
    <main className="main-container">
      {/* 侧边栏 */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/*  侧边栏内容 */ }
        <button
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {!isSidebarOpen ? <AlignLeft /> : <X />}
        </button>


      </div>
      {/* 主内容 */}
      <div className="content">
        <h1>欢迎来到 Main 页面</h1>
        <button onClick={toggleTheme}>
          切换到 {theme === "light" ? "暗色" : "亮色"}
        </button>
      </div>
      <footer className="hidden">What are you looking for?</footer>
    </main>
  );
}
