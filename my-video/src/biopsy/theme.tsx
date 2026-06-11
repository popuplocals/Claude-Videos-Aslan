import React from "react";
import { Easing, interpolate, spring } from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadDevanagari } from "@remotion/google-fonts/NotoSansDevanagari";

const { fontFamily: MONT } = loadMontserrat();
const { fontFamily: DEV } = loadDevanagari();

// Latin/numbers prefer Montserrat, Devanagari falls back to Noto.
export const FONT = `${MONT}, ${DEV}, sans-serif`;
// Hindi-first elements (Latin words inside Hindi also render in Noto, matching the design).
export const HINDI = `${DEV}, ${MONT}, sans-serif`;

export const C = {
  p: "#7B2D8B",
  pd: "#4A1660",
  pl: "#B06EC4",
  amber: "#F5A623",
  red: "#E53935",
  green: "#2ECC71",
  w: "#FFFFFF",
};

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const prog = (frame: number, delay: number, dur: number) =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

export const fadeUp = (
  frame: number,
  delay: number,
  dist = 28,
  dur = 16,
): React.CSSProperties => {
  const p = prog(frame, delay, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

export const fadeDown = (
  frame: number,
  delay: number,
  dist = 20,
  dur = 15,
): React.CSSProperties => {
  const p = prog(frame, delay, dur);
  return { opacity: p, transform: `translateY(${(p - 1) * dist}px)` };
};

export const fadeLeft = (
  frame: number,
  delay: number,
  dist = 38,
  dur = 15,
): React.CSSProperties => {
  const p = prog(frame, delay, dur);
  return { opacity: p, transform: `translateX(${(p - 1) * dist}px)` };
};

export const fadeRight = (
  frame: number,
  delay: number,
  dist = 28,
  dur = 15,
): React.CSSProperties => {
  const p = prog(frame, delay, dur);
  return { opacity: p, transform: `translateX(${(1 - p) * dist}px)` };
};

export const fadeIn = (
  frame: number,
  delay: number,
  dur = 13,
): React.CSSProperties => ({
  opacity: prog(frame, delay, dur),
});

// Settle-in scale (myth badge / fact heading): scales from `from` down to 1.
export const popSettle = (
  frame: number,
  delay: number,
  from = 1.16,
  dur = 17,
): React.CSSProperties => {
  const p = prog(frame, delay, dur);
  return { opacity: p, transform: `scale(${interpolate(p, [0, 1], [from, 1])})` };
};

// Bouncy spring scale (vs badge, fact ring) with natural overshoot.
export const springScale = (
  frame: number,
  fps: number,
  delay: number,
  from: number,
  config: Parameters<typeof spring>[0]["config"],
): React.CSSProperties => {
  const s = spring({ frame: frame - delay, fps, config });
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `scale(${interpolate(s, [0, 1], [from, 1])})` };
};

export const counter = (
  frame: number,
  delay: number,
  dur: number,
  to: number,
) =>
  Math.round(
    interpolate(frame, [delay, delay + dur], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

// Per-scene opacity envelope: fade in, hold, fade out (for crossfades).
export const envelope = (frame: number, duration: number) =>
  interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

type GlassVariant = "gl" | "glP" | "glA" | "glD";

const glassStyles: Record<GlassVariant, React.CSSProperties> = {
  gl: {
    background: "rgba(255,255,255,0.085)",
    border: "1.5px solid rgba(255,255,255,0.18)",
  },
  glP: {
    background: "rgba(123,45,139,0.30)",
    border: "1.5px solid rgba(176,110,196,0.36)",
  },
  glA: {
    background: "rgba(245,166,35,0.14)",
    border: "2px solid rgba(245,166,35,0.40)",
  },
  glD: {
    background: "rgba(10,0,16,0.48)",
    border: "1.5px solid rgba(255,255,255,0.08)",
  },
};

export const Glass: React.FC<{
  variant?: GlassVariant;
  style?: React.CSSProperties;
  highlight?: boolean;
  children?: React.ReactNode;
}> = ({ variant = "gl", style, highlight = true, children }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: 44,
      backdropFilter: "blur(32px) saturate(180%)",
      WebkitBackdropFilter: "blur(32px) saturate(180%)",
      ...glassStyles[variant],
      ...style,
    }}
  >
    {highlight ? (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent)",
        }}
      />
    ) : null}
    {children}
  </div>
);
