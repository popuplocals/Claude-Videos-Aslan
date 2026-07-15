// ══ SCENE 4 — CALL TO ACTION ══  (global frames 390–540 / 13–18s)
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MapPin, MessageCircle, Stethoscope } from "lucide-react";
import { ENG, HINDI, popIn, riseIn, softSpring } from "./theme";
import type { Palette } from "./types";

export const Scene4CTA: React.FC<{
  colors: Palette;
  headline: string;
  clinicName: string;
  contactNumber: string;
  location: string;
  badgeLabel: string;
}> = ({ colors, headline, clinicName, contactNumber, location, badgeLabel }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card slides up from bottom with spring easing.
  const cardS = softSpring(frame, fps, 4, { damping: 15, stiffness: 90 });
  const cardStyle: React.CSSProperties = {
    opacity: interpolate(cardS, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${(1 - cardS) * 520}px)`,
  };

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
      <div
        style={{
          ...cardStyle,
          width: "100%",
          maxWidth: 940,
          background: colors.cream,
          borderRadius: 44,
          padding: "70px 60px 64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          boxShadow: "0 30px 60px rgba(0,0,0,0.28)",
        }}
      >
        {/* gold clinic icon */}
        <div style={{ ...popIn(frame, fps, 22, 0.4), width: 150, height: 150, borderRadius: "50%", background: colors.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(212,162,76,0.45)" }}>
          <Stethoscope size={84} color={colors.cream} strokeWidth={2.2} />
        </div>

        <h2 style={{ fontFamily: HINDI, fontWeight: 700, fontSize: 60, lineHeight: 1.3, color: colors.teal, textAlign: "center", margin: 0, ...riseIn(frame, fps, 26, 30) }}>
          {headline}
        </h2>

        {/* editable client info lines */}
        <div style={{ ...riseIn(frame, fps, 40, 26), display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginTop: 6 }}>
          <p style={{ fontFamily: ENG, fontWeight: 800, fontSize: 46, color: colors.coral, margin: 0, textAlign: "center" }}>{clinicName}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 58, height: 58, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MessageCircle size={34} color={colors.cream} strokeWidth={2.4} />
            </span>
            <span style={{ fontFamily: ENG, fontWeight: 700, fontSize: 42, color: colors.teal }}>{contactNumber}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <MapPin size={34} color={colors.gray} strokeWidth={2.4} />
            <span style={{ fontFamily: ENG, fontWeight: 500, fontSize: 36, color: colors.gray }}>{location}</span>
          </div>
        </div>

        {/* logo/name placeholder badge scales in last */}
        <div
          style={{
            ...popIn(frame, fps, 66, 0.5),
            marginTop: 14,
            padding: "18px 46px",
            borderRadius: 22,
            border: `3px solid ${colors.coral}`,
            fontFamily: ENG,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 2,
            color: colors.teal,
            textTransform: "uppercase",
          }}
        >
          {badgeLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
};
