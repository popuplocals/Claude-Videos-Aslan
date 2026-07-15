// ═══════════════════════════════════════════════════════════════════════
//  EYE SYMPTOMS — real-photo motion graphic (reference-matched)
//  1080×1920 · 30fps · 420 frames (14s)
//
//  A real close-up eye photo split into three colour-tinted panels, with
//  red symptom banners dropping in one-by-one, a slow zoom, then a Hindi
//  awareness line + CTA. Drop the photo in at:  public/eye.jpg
// ═══════════════════════════════════════════════════════════════════════
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MessageCircle } from "lucide-react";
import { ENG, HINDI, popIn, riseIn, softSpring } from "../redeye/theme";

// ── EDITABLE CONFIG ─────────────────────────────────────────────────────
const IMAGE = "eye.jpg"; // file in /public
const COLORS = {
  red: "#B4121A", // banner red
  redDeep: "#7C0A10",
  white: "#FFFFFF",
  cream: "#FDF5F0",
  ink: "#1A0B0B",
  gray: "#8A7D7D",
};
const TITLE = "इन लक्षणों को नज़रअंदाज़ न करें"; // top strip (Hindi)
const SYMPTOMS = ["STINGING OR BURNING SENSATION", "RED OR WATERY EYES", "BLURRED VISION"];
const CTA_LINE = "आंखों में ये लक्षण? खुद दवा न लें";
const CTA_SUB = "आज ही Eye Specialist से मिलें";
const CLINIC_NAME = "[Clinic Name]";
const CONTACT_NUMBER = "[WhatsApp Number]";
const LOCATION = "[City/Area]";

export const EYE_SYMPTOMS_DURATION = 420;

// panel tints (left warm-red → middle neutral → right cool-blue)
const PANEL_TINTS = [
  "rgba(200,26,32,0.34)",
  "rgba(120,90,90,0.10)",
  "rgba(38,86,168,0.34)",
];

const HERO_TOP = 250;
const HERO_H = 1150;

export const EyeSymptoms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // slow ken-burns zoom across the whole clip
  const zoom = interpolate(frame, [0, EYE_SYMPTOMS_DURATION], [1.06, 1.16]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.redDeep }}>
      {/* ── TOP RED STRIP ─────────────────────────────── (0–) */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: HERO_TOP, background: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
        <h1 style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 54, color: COLORS.white, textAlign: "center", margin: 0, lineHeight: 1.25, ...riseIn(frame, fps, 2, 30) }}>
          {TITLE}
        </h1>
      </div>

      {/* ── HERO: real photo + tinted panels + banners ── */}
      <div style={{ position: "absolute", top: HERO_TOP, left: 0, right: 0, height: HERO_H, overflow: "hidden" }}>
        {/* real image */}
        <Img
          src={staticFile(IMAGE)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }}
        />

        {/* three colour panels wipe in (clip from top), staggered */}
        {PANEL_TINTS.map((tint, i) => {
          const s = softSpring(frame, fps, 8 + i * 12, { damping: 16, stiffness: 90 });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${(i * 100) / 3}%`,
                width: `${100 / 3}%`,
                background: tint,
                clipPath: `inset(0 0 ${(1 - s) * 100}% 0)`,
              }}
            />
          );
        })}

        {/* white dividers */}
        {[1, 2].map((i) => {
          const s = softSpring(frame, fps, 8 + i * 12, { damping: 16, stiffness: 90 });
          return <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i * 100) / 3}%`, width: 3, background: "rgba(255,255,255,0.85)", transform: `scaleY(${s})`, transformOrigin: "top" }} />;
        })}

        {/* symptom banners drop in one by one */}
        <div style={{ position: "absolute", top: 30, left: 0, right: 0, display: "flex", gap: 14, padding: "0 16px" }}>
          {SYMPTOMS.map((label, i) => {
            const s = softSpring(frame, fps, 20 + i * 14, { damping: 12, stiffness: 120 });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: COLORS.red,
                  borderRadius: 6,
                  padding: "22px 12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                  opacity: interpolate(s, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `translateY(${(1 - s) * -140}px)`,
                }}
              >
                <p style={{ fontFamily: ENG, fontWeight: 800, fontSize: 26, lineHeight: 1.15, color: COLORS.white, textAlign: "center", textTransform: "uppercase", margin: 0, letterSpacing: 0.3 }}>
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA (slides up near the end) ────────── */}
      <BottomCTA frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

const BottomCTA: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const start = 300; // frame where the CTA begins
  const s = softSpring(frame, fps, start, { damping: 16, stiffness: 90 });
  return (
    <div
      style={{
        position: "absolute",
        top: HERO_TOP + HERO_H,
        left: 0,
        right: 0,
        bottom: 0,
        background: COLORS.cream,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "0 70px",
        opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${(1 - s) * 200}px)`,
      }}
    >
      <p style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 46, color: COLORS.red, textAlign: "center", margin: 0, lineHeight: 1.3, ...riseIn(frame, fps, start + 8, 26) }}>{CTA_LINE}</p>
      <p style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 40, color: COLORS.ink, textAlign: "center", margin: 0, ...riseIn(frame, fps, start + 16, 24) }}>{CTA_SUB}</p>
      <div style={{ ...popIn(frame, fps, start + 26, 0.5), display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 8 }}>
        <p style={{ fontFamily: ENG, fontWeight: 800, fontSize: 38, color: COLORS.red, margin: 0 }}>{CLINIC_NAME}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 50, height: 50, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageCircle size={30} color={COLORS.white} strokeWidth={2.4} />
          </span>
          <span style={{ fontFamily: ENG, fontWeight: 700, fontSize: 36, color: COLORS.ink }}>{CONTACT_NUMBER}</span>
        </div>
        <span style={{ fontFamily: ENG, fontWeight: 500, fontSize: 30, color: COLORS.gray }}>{LOCATION}</span>
      </div>
    </div>
  );
};
