import React from "react";

export function KirbyIcon() {
  return (
    <div className="Kirby">
      <Kirby />
      <p className="Kirby-text"> Hello, I&apos;m Kirby! ⭐</p>
    </div>
  );
}
const Kirby = () => {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 左脚（红色椭圆） */}
      <ellipse cx="70" cy="160" rx="30" ry="15" fill="#cc3333" />

      {/* 右脚（红色椭圆） */}
      <ellipse cx="130" cy="160" rx="30" ry="15" fill="#cc3333" />

      {/* 左手（粉色椭圆） */}
      <ellipse cx="50" cy="120" rx="20" ry="20" className="Kirby-body" />
      {/* 右手（粉色椭圆）） */}
      <ellipse cx="150" cy="120" rx="20" ry="20" className="Kirby-body" />
      {/* 身体（粉色圆形） */}
      <circle cx="100" cy="110" r="60" className="Kirby-body" />

      {/* 左眼（眼蓝色椭圆） */}
      <ellipse cx="80" cy="90" rx="10" ry="22" fill="blue" />
      {/* 左眼（黑色椭圆） */}
      <ellipse cx="80" cy="88" rx="10" ry="15" fill="black" />
      {/* 左眼高光（白色椭圆） */}
      <ellipse cx="80" cy="82" rx="8" ry="12" fill="#ffffff" />
      <ellipse
        cx="80"
        cy="90"
        rx="10"
        ry="22"
        fill="#00000000"
        stroke="#000000"
        strokeWidth="4"
      />

      {/* 左眼（眼蓝色椭圆） */}
      <ellipse cx="120" cy="90" rx="10" ry="22" fill="blue" />
      {/* 左眼（黑色椭圆） */}
      <ellipse cx="120" cy="88" rx="10" ry="15" fill="black" />
      {/* 左眼高光（白色椭圆） */}
      <ellipse cx="120" cy="82" rx="8" ry="12" fill="#ffffff" />
      <ellipse
        cx="120"
        cy="90"
        rx="10"
        ry="22"
        fill="#00000000"
        stroke="#000000"
        strokeWidth="4"
      />

      {/* 腮红（淡粉色椭圆） */}
      <ellipse cx="60" cy="110" rx="8" ry="5" fill="#ff4466" />
      <ellipse cx="140" cy="110" rx="8" ry="5" fill="#ff4466" />

      {/* 嘴巴（黑色弧线） */}
      <path
        d="M 90 118 Q 100 125, 110 118"
        stroke="black"
        strokeWidth="3"
        fill="transparent"
      />
    </svg>
  );
};

export default Kirby;
