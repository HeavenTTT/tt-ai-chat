import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "@/style/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: "Super Ego",
  description: "Next.js 学习项目 - Super Ego",
  keywords: ["Next.js", "学习", "前端"],
  authors: [{ name: "TT", url: "https://github.com/HeavenTTT/tt-ai-chat" }],
  openGraph: {
    title: "Super Ego",
    description: "Next.js 学习项目",
    url: "https://github.com/HeavenTTT/tt-ai-chat",
    siteName: "Super Ego",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={notoSansSC.variable}>
      <ThemeProvider>
      <body className="antialiased">{children}</body>
      </ThemeProvider>
    </html>
  );
}
