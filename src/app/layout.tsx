import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "@/style/globals.css";

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
  authors: [{ name: "TT", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Super Ego",
    description: "Next.js 学习项目",
    url: "https://yourwebsite.com",
    siteName: "Super Ego",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Super Ego Logo",
      },
    ],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
