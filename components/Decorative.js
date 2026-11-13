"use client";

export function Blob({ className = "", color = "#F9DFE8", delay = "0s" }) {
  return (
    <div
      aria-hidden
      className={`blob pointer-events-none absolute ${className}`}
      style={{ background: color, animationDelay: delay }}
    />
  );
}

export function Sparkle({ className = "", color = "#E8DFFA" }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute animate-float ${className}`}
      width="34" height="34" viewBox="0 0 34 34"
    >
      <path
        d="M17 0c1 9 8 16 17 17-9 1-16 8-17 17-1-9-8-16-17-17 9-1 16-8 17-17Z"
        fill={color}
      />
    </svg>
  );
}

export function Ring({ className = "", color = "#D9EDFA" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full border animate-float-slow ${className}`}
      style={{ borderColor: color, borderWidth: 2 }}
    />
  );
        }
