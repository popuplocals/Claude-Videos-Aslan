// ═══════════════════════════════════════════════════════════════════════
//  DRY EYE — COMMON SYMPTOMS  (animated circular infographic)
//  1080×1920 · 30fps · 420 frames (14s)
//
//  Central hub + 5 symptom bubbles orbiting it, connected by dashed lines
//  that draw outward as each bubble pops in. Brand header + clinic footer.
//  Flat line-icons (swap for real photos by dropping images into the bubbles).
// ═══════════════════════════════════════════════════════════════════════
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Camera, Droplets, Eye, Flame, Frown, Glasses, MapPin, Phone, Play } from "lucide-react";
import { ENG, HINDI, riseIn, softSpring } from "../redeye/theme";

// ── EDITABLE CONFIG ─────────────────────────────────────────────────────
const BRAND = { hindi: "दृष्टी", tagline: "The Vision" };
const CENTER_TITLE = ["Common", "Symptoms", "OF DRY EYE"];
const FOOTER = {
  address: "Drushti Eye Care, Opp. Timber Bhawan, Dhamangaon Road, Yavatmal - 445001",
  phone: "+91 9422922249",
};

const C = {
  bgTop: "#EEF4FB",
  bgBottom: "#D6E3F4",
  hub: "#1E5AA8",
  hubDeep: "#123c78",
  ink: "#173a6b",
  white: "#FFFFFF",
  footer: "#173a6b",
};

type Icon = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
type Symptom = { label: string; color: string; Icon: Icon; angle: number; labelSide: "above" | "below" };

// reveal order + positions follow the reference (clockwise from top)
const SYMPTOMS: Symptom[] = [
  { label: "Redness", color: "#34A853", Icon: Eye, angle: 0, labelSide: "above" },
  { label: "Episodes of\nblurred vision", color: "#F4B400", Icon: Glasses, angle: 72, labelSide: "above" },
  { label: "Sandy or gritty\nsensation", color: "#D0342C", Icon: Frown, angle: 144, labelSide: "below" },
  { label: "Excessive\ntearing", color: "#2540A8", Icon: Droplets, angle: 216, labelSide: "below" },
  { label: "Stinging or\nburning", color: "#E84393", Icon: Flame, angle: 288, labelSide: "above" },
];

export const DRY_EYE_DURATION = 420;

// ── circular layout geometry ────────────────────────────────────────────
const CX = 540;
const CY = 1015;
const RX = 330; // horizontal orbit radius
const RY = 545; // vertical orbit radius
const HUB_R = 205;
const BUB_R = 120;

const posOf = (angleDeg: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + RX * Math.sin(a), y: CY - RY * Math.cos(a) };
};

export const DryEyeSymptoms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hubS = softSpring(frame, fps, 12, { damping: 12, stiffness: 120 });
  const hubBreathe = 1 + Math.sin((frame / (2 * fps)) * Math.PI * 2) * 0.012;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.bgTop} 0%, ${C.bgBottom} 100%)` }}>
      {/* faint vertical streaks */}
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 2px, transparent 2px 90px)", opacity: 0.4 }} />

      {/* ── dashed connectors (draw outward as each bubble lands) ── */}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        {SYMPTOMS.map((s, i) => {
          const p = posOf(s.angle);
          const dx = p.x - CX;
          const dy = p.y - CY;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const sx = CX + ux * (HUB_R + 6);
          const sy = CY + uy * (HUB_R + 6);
          const ex = p.x - ux * (BUB_R + 6);
          const ey = p.y - uy * (BUB_R + 6);
          const delay = 45 + i * 26;
          const grow = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <line
              key={i}
              x1={sx}
              y1={sy}
              x2={sx + (ex - sx) * grow}
              y2={sy + (ey - sy) * grow}
              stroke={C.hubDeep}
              strokeWidth={4}
              strokeDasharray="3 16"
              strokeLinecap="round"
              opacity={0.75}
            />
          );
        })}
      </svg>

      {/* ── central hub ── */}
      <div
        style={{
          position: "absolute",
          left: CX - HUB_R,
          top: CY - HUB_R,
          width: HUB_R * 2,
          height: HUB_R * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 42%, #2f74c9 0%, ${C.hub} 45%, ${C.hubDeep} 100%)`,
          boxShadow: "0 20px 60px rgba(18,40,90,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(hubS, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(hubS, [0, 1], [0.4, 1]) * hubBreathe})`,
        }}
      >
        {/* faint iris texture */}
        <div style={{ position: "absolute", inset: 24, borderRadius: "50%", background: "repeating-conic-gradient(rgba(255,255,255,0.05) 0deg 4deg, transparent 4deg 8deg)" }} />
        <p style={{ fontFamily: ENG, fontWeight: 800, fontSize: 62, lineHeight: 1.02, color: C.white, textAlign: "center", margin: 0, textShadow: "0 3px 12px rgba(0,0,0,0.35)" }}>
          {CENTER_TITLE[0]}
          <br />
          {CENTER_TITLE[1]}
        </p>
        <p style={{ fontFamily: ENG, fontWeight: 800, fontSize: 44, color: C.white, textAlign: "center", margin: "6px 0 0", letterSpacing: 1 }}>
          {CENTER_TITLE[2]}
        </p>
      </div>

      {/* ── symptom bubbles ── */}
      {SYMPTOMS.map((s, i) => {
        const p = posOf(s.angle);
        const delay = 45 + i * 26;
        const bs = softSpring(frame, fps, delay + 8, { damping: 12, stiffness: 130 });
        const bob = Math.sin((frame - delay) / 22) * 5;
        const { Icon } = s;
        return (
          <div key={i} style={{ position: "absolute", left: p.x - BUB_R, top: p.y - BUB_R, width: BUB_R * 2, height: BUB_R * 2 }}>
            {/* bubble */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: C.white,
                border: `8px solid ${s.color}`,
                boxShadow: "0 14px 30px rgba(18,40,90,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: interpolate(bs, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                transform: `translateY(${(1 - Math.min(bs, 1)) * 30 + bob}px) scale(${interpolate(bs, [0, 1], [0.3, 1])})`,
              }}
            >
              <Icon size={92} color={s.color} strokeWidth={2} />
            </div>
            {/* label */}
            <p
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                [s.labelSide === "above" ? "bottom" : "top"]: BUB_R * 2 + 14,
                width: 320,
                fontFamily: ENG,
                fontWeight: 700,
                fontSize: 34,
                lineHeight: 1.2,
                color: C.ink,
                textAlign: "center",
                margin: 0,
                whiteSpace: "pre-line",
                opacity: interpolate(frame, [delay + 14, delay + 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              {s.label}
            </p>
          </div>
        );
      })}

      {/* ── HEADER: brand + socials ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 190, padding: "0 56px", display: "flex", alignItems: "center", justifyContent: "space-between", ...riseIn(frame, fps, 2, -30) }}>
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 78, height: 78, borderRadius: "50%", border: `4px solid ${C.hub}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.white }}>
            <Eye size={44} color={C.hub} strokeWidth={2.2} />
          </div>
          <div style={{ lineHeight: 1 }}>
            <p style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 46, color: C.hub, margin: 0 }}>{BRAND.hindi}</p>
            <p style={{ fontFamily: ENG, fontWeight: 600, fontSize: 24, color: C.ink, margin: "4px 0 0", letterSpacing: 3 }}>{BRAND.tagline}</p>
          </div>
        </div>
        {/* socials */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          <span style={{ fontFamily: ENG, fontWeight: 800, fontSize: 24, color: C.ink, letterSpacing: 1 }}>FOLLOW US ON:</span>
          <div style={{ display: "flex", gap: 12 }}>
            {/* generic social chips (facebook / instagram / youtube) */}
            <span style={{ width: 52, height: 52, borderRadius: 12, background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ENG, fontWeight: 800, fontSize: 34, color: C.white }}>f</span>
            <span style={{ width: 52, height: 52, borderRadius: 12, background: "#E1306C", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={30} color={C.white} strokeWidth={2} />
            </span>
            <span style={{ width: 52, height: 52, borderRadius: 12, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={28} color={C.white} strokeWidth={2} fill={C.white} />
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER: address + phone ── */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, background: C.footer, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, padding: "0 40px", ...riseIn(frame, fps, 10, 60) }}>
        <MapPin size={30} color="#F4B400" strokeWidth={2.4} />
        <span style={{ fontFamily: ENG, fontWeight: 600, fontSize: 26, color: C.white }}>{FOOTER.address}</span>
        <Phone size={28} color="#F4B400" strokeWidth={2.4} />
        <span style={{ fontFamily: ENG, fontWeight: 700, fontSize: 27, color: C.white }}>{FOOTER.phone}</span>
      </div>
    </AbsoluteFill>
  );
};
