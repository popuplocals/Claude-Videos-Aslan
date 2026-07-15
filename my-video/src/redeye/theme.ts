// ── Fonts + shared animation helpers for the RedEyeAwareness video ──
import React from "react";
import { interpolate, spring } from "remotion";
import { loadFont as loadDevanagari } from "@remotion/google-fonts/NotoSansDevanagari";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: DEV } = loadDevanagari();
const { fontFamily: JAKARTA } = loadJakarta();

// Hindi text → Noto Sans Devanagari; English/numerals → Plus Jakarta Sans.
export const HINDI = `${DEV}, sans-serif`;
export const ENG = `${JAKARTA}, sans-serif`;

/** Gentle spring 0→1 (soft, slightly springy). */
export const softSpring = (
  frame: number,
  fps: number,
  delay = 0,
  config?: Partial<Parameters<typeof spring>[0]["config"]>,
) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.9, ...config },
  });

/** Spring-driven fade + slide-up entrance. */
export const riseIn = (
  frame: number,
  fps: number,
  delay = 0,
  dist = 40,
): React.CSSProperties => {
  const s = softSpring(frame, fps, delay);
  return { opacity: s, transform: `translateY(${(1 - s) * dist}px)` };
};

/** Spring-driven fade + slide-in from a side (negative dist = from left). */
export const slideInX = (
  frame: number,
  fps: number,
  delay = 0,
  dist = -60,
): React.CSSProperties => {
  const s = softSpring(frame, fps, delay);
  return { opacity: s, transform: `translateX(${(1 - s) * dist}px)` };
};

/** Spring-driven scale-in (with a touch of overshoot for pop). */
export const popIn = (
  frame: number,
  fps: number,
  delay = 0,
  from = 0,
): React.CSSProperties => {
  const s = softSpring(frame, fps, delay, { damping: 11, stiffness: 130 });
  return { opacity: interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }), transform: `scale(${interpolate(s, [0, 1], [from, 1])})` };
};

/** Looping scale pulse between `min` and `max` (e.g. 0.9 ↔ 1.1). */
export const pulse = (frame: number, fps: number, min = 0.9, max = 1.1, periodSec = 1.4) => {
  const t = (Math.sin((frame / (periodSec * fps)) * Math.PI * 2) + 1) / 2;
  return min + (max - min) * t;
};

/** Linear hex color interpolation. */
export const lerpColor = (a: string, b: string, t: number): string => {
  const c = Math.max(0, Math.min(1, t));
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const ch = pa.map((v, i) => Math.round(v + (pb[i] - v) * c));
  return `#${ch.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
};

/** Opacity envelope for gentle in/out fades within a scene. */
export const fadeEnvelope = (frame: number, duration: number, edge = 10) =>
  interpolate(frame, [0, edge, duration - edge, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
