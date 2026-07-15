// ═══════════════════════════════════════════════════════════════════════
//  RED EYE — CAUSES  (continues the RedEyeAwareness visual system)
//  1080×1920 · 30fps · 420 frames (14s)
//
//  Script: "लाल आंख का कारण allergy, संक्रमण, आंख में चोट या कभी-कभी
//           गंभीर बीमारी भी हो सकती है।"
//
//  Standalone composition id "RedEyeCauses"; also importable as a <Sequence>
//  insert into the RedEyeAwareness timeline (see notes at bottom of file).
//  Reuses shared easing/fonts/helpers from ./theme.
// ═══════════════════════════════════════════════════════════════════════
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Bandage, Bug, Flower2, HeartPulse } from "lucide-react";
import { EyeIcon } from "./EyeIcon";
import { HINDI, fadeEnvelope, lerpColor, popIn, pulse, riseIn, softSpring } from "./theme";
import type { Palette } from "./types";

// ── PALETTE (matches RedEyeAwareness) ───────────────────────────────────
const COLORS: Palette = {
  teal: "#0B4F4A",
  coral: "#E8543E",
  cream: "#FDF8F0",
  gold: "#D4A24C",
  gray: "#7C8A85",
};
const CARD_BORDER = "#E7DED4"; // resting card border (neutral cream)

// ── COPY (edit freely) ──────────────────────────────────────────────────
const COPY = {
  setupLine: "लाल आंख का कारण क्या है?",
  closingLine: "इसलिए, सही जांच ज़रूरी है",
};

// ── CAUSE CARDS (reveal order follows the spoken script) ────────────────
type Cause = {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  label: string;
  badge: string; // coral or gold — "गंभीर बीमारी" stays calm gold, not alarming
};
const CAUSES: Cause[] = [
  { Icon: Flower2, label: "Allergy", badge: COLORS.coral },
  { Icon: Bug, label: "संक्रमण (Infection)", badge: COLORS.gold },
  { Icon: Bandage, label: "आंख में चोट", badge: COLORS.coral },
  { Icon: HeartPulse, label: "गंभीर बीमारी", badge: COLORS.gold },
];

export const RED_EYE_CAUSES_DURATION = 420;

// ── beat frame ranges (relative to this component's own frame 0) ────────
const BEAT2_START = 75; //  grid starts    (2.5s)
const CARD_STAGGER = 25; //  offset per card
const BEAT3_START = 330; // closing starts (11s)

/** Background crossfades: teal (setup) → cream (grid) → teal (closing). */
const bgColorAt = (frame: number): string => {
  if (frame < BEAT2_START) return COLORS.teal;
  if (frame < BEAT2_START + 20) return lerpColor(COLORS.teal, COLORS.cream, (frame - BEAT2_START) / 20);
  if (frame < BEAT3_START) return COLORS.cream;
  if (frame < BEAT3_START + 20) return lerpColor(COLORS.cream, COLORS.teal, (frame - BEAT3_START) / 20);
  return COLORS.teal;
};

const CauseCard: React.FC<{ frame: number; fps: number; cause: Cause; index: number; gridFade: number; gridScale: number }> = ({
  frame,
  fps,
  cause,
  index,
  gridFade,
  gridScale,
}) => {
  const delay = BEAT2_START + index * CARD_STAGGER;
  // spring scale + fade, rising from slightly below
  const s = softSpring(frame, fps, delay, { damping: 13, stiffness: 120 });
  const enterOpacity = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // brief 10-frame coral highlight pulse as the card lands, then settles
  const glow = interpolate(frame, [delay, delay + 6, delay + 18], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const borderColor = lerpColor(CARD_BORDER, COLORS.coral, glow);
  const { Icon, label, badge } = cause;

  return (
    <div
      style={{
        opacity: enterOpacity * gridFade,
        transform: `translateY(${(1 - s) * 46}px) scale(${gridScale})`,
        width: 430,
        height: 380,
        background: COLORS.cream,
        borderRadius: 36,
        border: `4px solid ${borderColor}`,
        boxShadow: `0 16px 34px rgba(0,0,0,0.16), 0 0 ${glow * 40}px rgba(232,84,62,${glow * 0.55})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 34,
        padding: 30,
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: badge,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 -5px 12px rgba(0,0,0,0.14)",
        }}
      >
        <Icon size={78} color={COLORS.cream} strokeWidth={2.2} />
      </div>
      <p style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 42, lineHeight: 1.25, color: COLORS.teal, textAlign: "center", margin: 0 }}>
        {label}
      </p>
    </div>
  );
};

export const RedEyeCauses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── BEAT 1 — setup line (0–75 / 0–2.5s) ──
  // eye + headline fade out at the end of the beat to make room for the grid.
  const beat1Out = interpolate(frame, [58, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eyeScale = pulse(frame, fps, 0.94, 1.06, 1.5);

  // ── BEAT 3 — closing (330–420 / 11–14s) ──
  const gridFade = interpolate(frame, [BEAT3_START, BEAT3_START + 20], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gridScale = interpolate(frame, [BEAT3_START, BEAT3_START + 20], [1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColorAt(frame) }}>
      {/* ══ BEAT 1 — SETUP (0–75) ══ */}
      {frame < 80 && (
        <AbsoluteFill style={{ opacity: beat1Out, alignItems: "center", justifyContent: "center", gap: 70 }}>
          <div style={{ transform: `scale(${eyeScale})`, ...popIn(frame, fps, 2, 0.6) }}>
            <EyeIcon size={300} stroke={COLORS.cream} irisColor={COLORS.coral} pupil={COLORS.teal} />
          </div>
          <h1 style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 72, lineHeight: 1.3, color: COLORS.cream, textAlign: "center", maxWidth: 900, margin: 0, padding: "0 60px", ...riseIn(frame, fps, 14, 44) }}>
            {COPY.setupLine}
          </h1>
        </AbsoluteFill>
      )}

      {/* ══ BEAT 2 — 2×2 CAUSES GRID (75–330) ══ */}
      {frame >= 68 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "430px 430px", gridTemplateRows: "380px 380px", gap: 44 }}>
            {CAUSES.map((cause, i) => (
              <CauseCard key={i} frame={frame} fps={fps} cause={cause} index={i} gridFade={gridFade} gridScale={gridScale} />
            ))}
          </div>
        </AbsoluteFill>
      )}

      {/* ══ BEAT 3 — CLOSING LINE (330–420) ══ */}
      {frame >= BEAT3_START && (
        <AbsoluteFill style={{ opacity: fadeEnvelope(frame - BEAT3_START, RED_EYE_CAUSES_DURATION - BEAT3_START, 14), alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
          <h2 style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 68, lineHeight: 1.3, color: COLORS.cream, textAlign: "center", margin: 0, textShadow: "0 4px 24px rgba(0,0,0,0.3)", ...riseIn(frame, fps, BEAT3_START + 10, 40) }}>
            {COPY.closingLine}
          </h2>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
