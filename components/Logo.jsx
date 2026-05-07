import React from "react";

export default function RecodeyLogo({ height = 42, showText = true }) {
  return (
    <a
      href="/"
      aria-label="Recodey home"
      className="inline-flex items-center"
      style={{ height }}
    >
      <svg
        width={showText ? 250 : 54}
        height={height}
        viewBox={showText ? "0 0 250 54" : "0 0 54 54"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height,
          width: "auto",
          display: "block",
        }}
      >
        <defs>
          <linearGradient id="recodeyOrange" x1="5" y1="5" x2="50" y2="50">
            <stop offset="0%" stopColor="#FF6A00" />
            <stop offset="45%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#E8401C" />
          </linearGradient>
        </defs>

        {/* Icon */}
        <g transform="translate(2 2)">
          <path
            d="M25 3.5L45 15V37.5L25 49L5 37.5V15L25 3.5Z"
            stroke="url(#recodeyOrange)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M17 17H31C36 17 39 20 39 24.5C39 29 36 32 31 32H20"
            stroke="url(#recodeyOrange)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M17 17V40"
            stroke="url(#recodeyOrange)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M19 31L38 50"
            stroke="url(#recodeyOrange)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M17 40L25.5 48"
            stroke="url(#recodeyOrange)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="29"
            cy="48"
            r="3.2"
            fill="#12101F"
            stroke="#FF4500"
            strokeWidth="3"
          />
        </g>

        {showText && (
          <>
            <line
              x1="72"
              y1="11"
              x2="72"
              y2="43"
              stroke="#FF4500"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <text
              x="92"
              y="37"
              fill="#F0EDE6"
              fontFamily="Inter, Satoshi, Manrope, Poppins, Arial, sans-serif"
              fontSize="30"
              fontWeight="500"
              letterSpacing="-0.8"
            >
              Recodey
            </text>
          </>
        )}
      </svg>
    </a>
  );
}
