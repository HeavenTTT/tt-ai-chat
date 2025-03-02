// Code Generated with SimpleCodeGenerator: https://www.npmjs.com/package/simple-code-generator
"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard"; // 验证
import { useEffect, useState } from "react";
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
  /// 重定向
  useEffect(() => {
    if (!isChecking) {
      if (isVerified) {
        router.replace("/");
      } else {
        router.replace("/password");
      }
    }
  }, [isVerified, isChecking, router]);
  let touchStartX = 0;
  let touchEndX = 0;
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;

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



  ///页面控制----
  /// 加载中
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
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {!isSidebarOpen ? <AlignLeft /> : <X />}
      </button>
        <nav>
          <ul>
            <li>
              <a href="#">首页</a>
            </li>
            <li>
              <a href="#">设置</a>
            </li>
            <li>
              <a href="#">关于</a>
            </li>
          </ul>
        </nav>
      </aside>

      <section className="content">
        <h1>欢迎来到 Main 页面</h1>
        <button onClick={toggleTheme}>
          切换到 {theme === "light" ? "暗色" : "亮色"}
        </button>
      </section>
      <footer className="hidden">What are you looking for?</footer>
    </main>
  );
}
