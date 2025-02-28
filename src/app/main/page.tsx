"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { KirbyIcon } from "@/components/Kirby"; 


export default function Main() {
    const isVerified = useAuthGuard();

  if (isVerified === null) {
    return <KirbyIcon/>; // 避免闪屏
  }
  return (
    <div className="">
      <main className="">111</main>
      <footer className=""></footer>
    </div>
  );
}
