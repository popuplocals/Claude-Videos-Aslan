// ═══════════════════════════════════════════════════════════════════════
//  RED EYE — CAUSES (GLASS)  — glassmorphism variant of RedEyeCauses
//  1080×1920 · 30fps · 420 frames (14s)
//
//  Frosted-glass cards on a teal gradient with coral/gold glows + ambient
//  orbs. Same script/beats as RedEyeCauses; each card gets a coral (gold for
//  "serious illness") glow-pulse as it lands.
// ═══════════════════════════════════════════════════════════════════════
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Bandage, Bug, Flower2, HeartPulse } from "lucide-react";
import { EyeIcon } from "./EyeIcon";
import { HINDI, fadeEnvelope, lerpColor, popIn, riseIn, softSpring } from "./theme";

// ── PALETTE ─────────────────────────────────────────────────────────────
const C = {
  teal: "#0B4F4A",
  tealDeep: "#083C38",
  coral: "#E8543E",
  cream: "#FDF8F0",
  gold: "#D4A24C",
};
const CORAL_RGB = "232,84,62";
const GOLD_RGB = "212,162,76";

// ── COPY ────────────────────────────────────────────────────────────────
const COPY = {
  setupLine: "लाल आंख का कारण क्या है?",
  gridTitle: "इसके कई कारण हो सकते हैं",
  closingLine: "इसलिए, सही जांच ज़रूरी है",
};

type Icon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
type Cause = { Icon: Icon; label: React.ReactNode; gold?: boolean };
const CAUSES: Cause[] = [
  { Icon: Flower2, label: <span style={{ fontFamily: "inherit" }}>Allergy</span> },
  { Icon: Bug, label: (<>संक्रमण<span style={{ display: "block", fontSize: 28, opacity: 0.7, marginTop: 4 }}>Infection</span></>) },
  { Icon: Bandage, label: "आंख में चोट" },
  { Icon: HeartPulse, label: "गंभीर बीमारी", gold: true },
];

export const RED_EYE_CAUSES_GLASS_DURATION = 420;

// ── beat frame ranges ───────────────────────────────────────────────────
const CARD_START = 95; // first card lands
const STAGGER = 25;
const BEAT3_START = 330;

// reusable frosted-glass style
const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "rgba(255,255,255,0.10)",
  backdropFilter: "blur(22px) saturate(160%)",
  WebkitBackdropFilter: "blur(22px) saturate(160%)",
  border: "1.5px solid rgba(255,255,255,0.28)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.35)",
  ...extra,
});

const AmbientOrb: React.FC<{ frame: number; style: React.CSSProperties; phase: number }> = ({ frame, style, phase }) => {
  const t = Math.sin((frame / 90) * Math.PI * 2 + phase);
  return <div style={{ position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", transform: `translate(${t * 18}px, ${t * 22}px)`, ...style }} />;
};

const GlassCard: React.FC<{ frame: number; fps: number; cause: Cause; index: number; gridFade: number; gridScale: number }> = ({ frame, fps, cause, index, gridFade, gridScale }) => {
  const delay = CARD_START + index * STAGGER;
  const s = softSpring(frame, fps, delay, { damping: 12, stiffness: 130 });
  const enter = interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // glow-pulse as the card lands (sin over 12 frames)
  const gp = Math.max(0, Math.sin(interpolate(frame, [delay, delay + 12], [0, Math.PI], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const rgb = cause.gold ? GOLD_RGB : CORAL_RGB;
  const { Icon, label } = cause;

  return (
    <div
      style={{
        ...glass({
          borderRadius: 40,
          borderColor: `rgba(${rgb},${gp * 0.6 + 0.28})`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.35), 0 0 ${gp * 45}px rgba(${rgb},${gp * 0.55})`,
        }),
        opacity: enter * gridFade,
        transform: `translateY(${(1 - Math.min(s, 1)) * 40}px) scale(${interpolate(s, [0, 1], [0.8, 1]) * gridScale})`,
        width: 430,
        height: 380,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 34,
        padding: 30,
      }}
    >
      <div style={{ width: 148, height: 148, borderRadius: "50%", background: `rgba(${rgb},0.18)`, border: `2px solid rgba(${rgb},0.5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={78} color={cause.gold ? C.gold : C.coral} strokeWidth={2.2} />
      </div>
      <div style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 42, lineHeight: 1.2, color: C.cream, textAlign: "center" }}>{label}</div>
    </div>
  );
};

export const RedEyeCausesGlass: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BEAT 1
  const beat1Out = interpolate(frame, [58, 76], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const irisColor = lerpColor(C.cream, C.coral, interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  // looping coral pulse ring (~27f period)
  const ringT = (frame % 27) / 27;
  const ringScale = interpolate(ringT, [0, 1], [0.9, 1.2]);
  const ringOpacity = frame < 8 ? 0 : interpolate(ringT, [0, 1], [0.7, 0]);

  // BEAT 2 fade/scale-down before closing
  const gridFade = interpolate(frame, [315, 340], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gridScale = interpolate(frame, [315, 340], [1, 0.94], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOut = interpolate(frame, [315, 335], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // BEAT 3
  const panelPop = popIn(frame, fps, BEAT3_START + 4, 0.7);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 25% 20%, rgba(232,84,62,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(212,162,76,0.18) 0%, transparent 50%), linear-gradient(160deg, #0B4F4A 0%, #083C38 100%)",
      }}
    >
      {/* ambient glass orbs */}
      <AmbientOrb frame={frame} phase={0} style={{ width: 340, height: 340, top: -100, left: -120 }} />
      <AmbientOrb frame={frame} phase={2} style={{ width: 260, height: 260, bottom: 100, right: -100 }} />
      <AmbientOrb frame={frame} phase={4} style={{ width: 180, height: 180, bottom: -60, left: 60 }} />

      {/* ══ BEAT 1 — SETUP (0–76) ══ */}
      {frame < 80 && (
        <AbsoluteFill style={{ opacity: beat1Out, alignItems: "center", justifyContent: "center", gap: 70 }}>
          <div style={{ position: "relative", width: 280, height: 280, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", ...glass({ borderRadius: "50%" }), ...popIn(frame, fps, 2, 0.7) }}>
            <div style={{ position: "absolute", inset: 0, border: `3px solid ${C.coral}`, borderRadius: "50%", transform: `scale(${ringScale})`, opacity: ringOpacity }} />
            <EyeIcon size={230} stroke={C.cream} irisColor={irisColor} pupil={C.teal} />
          </div>
          <h1 style={{ fontFamily: HINDI, fontWeight: 800, fontSize: 56, lineHeight: 1.4, color: C.cream, textAlign: "center", maxWidth: 820, margin: 0, padding: "0 60px", ...riseIn(frame, fps, 20, 40) }}>{COPY.setupLine}</h1>
        </AbsoluteFill>
      )}

      {/* ══ BEAT 2 — GRID (68–340) ══ */}
      {frame >= 68 && frame < 344 && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56 }}>
          <h2 style={{ fontFamily: HINDI, fontWeight: 800, fontSize: 52, color: C.cream, textAlign: "center", margin: 0, opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * titleOut, transform: `translateY(${interpolate(frame, [80, 100], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)` }}>{COPY.gridTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "430px 430px", gridTemplateRows: "380px 380px", gap: 44 }}>
            {CAUSES.map((cause, i) => (
              <GlassCard key={i} frame={frame} fps={fps} cause={cause} index={i} gridFade={gridFade} gridScale={gridScale} />
            ))}
          </div>
        </AbsoluteFill>
      )}

      {/* ══ BEAT 3 — CLOSING (330–420) ══ */}
      {frame >= BEAT3_START && (
        <AbsoluteFill style={{ opacity: fadeEnvelope(frame - BEAT3_START, RED_EYE_CAUSES_GLASS_DURATION - BEAT3_START, 14), alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
          <div style={{ ...glass({ borderRadius: 48 }), padding: "80px 64px", ...panelPop }}>
            <h2 style={{ fontFamily: HINDI, fontWeight: 800, fontSize: 62, lineHeight: 1.3, color: C.cream, textAlign: "center", margin: 0, ...riseIn(frame, fps, BEAT3_START + 15, 40) }}>{COPY.closingLine}</h2>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
