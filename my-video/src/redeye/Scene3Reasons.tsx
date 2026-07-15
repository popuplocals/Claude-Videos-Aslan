// ══ SCENE 3 — WHY IT MATTERS ══  (global frames 240–390 / 8–13s)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, Clock, Stethoscope } from "lucide-react";
import { ENG, HINDI, fadeEnvelope, slideInX } from "./theme";
import type { Palette } from "./types";

type Reason = { Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; text: string; badge: string };

export const Scene3Reasons: React.FC<{ colors: Palette; heading: string; reasons: [string, string, string] }> = ({
  colors,
  heading,
  reasons,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows: Reason[] = [
    { Icon: AlertTriangle, text: reasons[0], badge: colors.coral },
    { Icon: Clock, text: reasons[1], badge: colors.gold },
    { Icon: Stethoscope, text: reasons[2], badge: colors.teal },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeEnvelope(frame, 150), alignItems: "center", justifyContent: "center", gap: 44, padding: "0 70px" }}>
      <h2
        style={{
          fontFamily: HINDI,
          fontWeight: 700,
          fontSize: 58,
          color: colors.cream,
          textAlign: "center",
          margin: "0 0 20px",
          ...slideInX(frame, fps, 2, 0),
        }}
      >
        {heading}
      </h2>

      {rows.map(({ Icon, text, badge }, i) => (
        <div
          key={i}
          style={{
            // staggered slide-in from left, ~20-frame offset each
            ...slideInX(frame, fps, 12 + i * 20, -70),
            width: "100%",
            maxWidth: 940,
            display: "flex",
            alignItems: "center",
            gap: 34,
            background: colors.cream,
            borderRadius: 32,
            padding: "34px 40px",
            boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 104,
              height: 104,
              borderRadius: "50%",
              background: badge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 -4px 10px rgba(0,0,0,0.12)",
            }}
          >
            <Icon size={54} color={colors.cream} strokeWidth={2.4} />
          </div>
          <p style={{ fontFamily: HINDI, fontWeight: 600, fontSize: 42, lineHeight: 1.3, color: colors.teal, margin: 0 }}>
            {text}
          </p>
          <span style={{ fontFamily: ENG, fontWeight: 800, fontSize: 44, color: badge, marginLeft: "auto", opacity: 0.25 }}>
            {i + 1}
          </span>
        </div>
      ))}
    </AbsoluteFill>
  );
};
