// ══ SCENE 2 — PROBLEM / COMMON MISTAKE ══  (global frames 90–240 / 3–8s)
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Ban } from "lucide-react";
import { EyeIcon } from "./EyeIcon";
import { HINDI, fadeEnvelope, popIn, riseIn, softSpring } from "./theme";
import type { Palette } from "./types";

/** Simple flat eye-drop bottle held in a stylised hand, tilted toward the eye. */
const DropperBottle: React.FC<{ colors: Palette; dropY: number }> = ({ colors, dropY }) => (
  <svg width={260} height={360} viewBox="0 0 200 300" fill="none" style={{ transform: "rotate(-32deg)" }}>
    {/* falling drop */}
    <path
      d={`M118,${150 + dropY} c8,10 8,20 0,26 c-8,-6 -8,-16 0,-26 Z`}
      fill={colors.coral}
    />
    {/* nozzle */}
    <path d="M104,132 l14,0 l-4,22 l-6,0 Z" fill={colors.teal} />
    {/* cap */}
    <rect x={82} y={24} width={40} height={40} rx={10} fill={colors.teal} />
    {/* body */}
    <rect x={64} y={60} width={80} height={80} rx={18} fill={colors.cream} stroke={colors.teal} strokeWidth={5} />
    {/* coral label band */}
    <rect x={64} y={88} width={80} height={22} fill={colors.coral} opacity={0.9} />
    {/* stylised hand grip (three rounded fingers) */}
    {[150, 176, 202].map((y) => (
      <rect key={y} x={48} y={y} width={112} height={22} rx={11} fill={colors.gold} stroke={colors.teal} strokeWidth={3} />
    ))}
    <rect x={40} y={150} width={26} height={78} rx={13} fill={colors.gold} stroke={colors.teal} strokeWidth={3} />
  </svg>
);

export const Scene2Problem: React.FC<{
  colors: Palette;
  headline: string;
  subtext: string;
}> = ({ colors, headline, subtext }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Looping drop toward the eye.
  const dropY = interpolate(frame % 40, [0, 40], [0, 60]);

  // Prohibited icon slams in around local frame 60 (global 150): scale + rotate spring.
  const banS = softSpring(frame, fps, 60, { damping: 10, stiffness: 120 });
  const banStyle: React.CSSProperties = {
    opacity: interpolate(banS, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
    transform: `scale(${interpolate(banS, [0, 1], [0, 1])}) rotate(${interpolate(banS, [0, 1], [-120, 0])}deg)`,
  };

  const words = headline.split(" ");

  return (
    <AbsoluteFill style={{ opacity: fadeEnvelope(frame, 150), alignItems: "center", justifyContent: "center", gap: 70 }}>
      {/* illustration: bottle tilted toward eye, with prohibited overlay */}
      <div style={{ position: "relative", width: 720, height: 420, display: "flex", alignItems: "center", justifyContent: "center", ...popIn(frame, fps, 4, 0.7) }}>
        <div style={{ position: "absolute", left: 70, top: 40 }}>
          <DropperBottle colors={colors} dropY={dropY} />
        </div>
        <div style={{ position: "absolute", right: 60, top: 150 }}>
          <EyeIcon size={280} stroke={colors.teal} irisColor={colors.coral} pupil={colors.teal} />
        </div>
        {/* prohibited circle-slash */}
        <div style={{ position: "absolute", ...banStyle }}>
          <Ban size={300} color={colors.coral} strokeWidth={2.4} />
        </div>
      </div>

      {/* main line — word-by-word reveal */}
      <h2
        style={{
          fontFamily: HINDI,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.3,
          color: colors.teal,
          textAlign: "center",
          maxWidth: 920,
          margin: 0,
          padding: "0 60px",
          display: "flex",
          flexWrap: "wrap",
          gap: "0 18px",
          justifyContent: "center",
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ display: "inline-block", ...riseIn(frame, fps, 20 + i * 5, 26) }}>
            {w}
          </span>
        ))}
      </h2>

      {/* subtext fades in after the main line */}
      <p
        style={{
          fontFamily: HINDI,
          fontWeight: 400,
          fontSize: 40,
          color: colors.gray,
          textAlign: "center",
          margin: 0,
          ...riseIn(frame, fps, 20 + words.length * 5 + 8, 24),
        }}
      >
        {subtext}
      </p>
    </AbsoluteFill>
  );
};
