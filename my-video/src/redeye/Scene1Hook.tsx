// ══ SCENE 1 — HOOK ══  (global frames 0–90 / 0–3s)
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EyeIcon } from "./EyeIcon";
import { HINDI, fadeEnvelope, lerpColor, popIn, pulse, riseIn } from "./theme";
import type { Palette } from "./types";

export const Scene1Hook: React.FC<{ colors: Palette; headline: string }> = ({ colors, headline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Iris tints white → coral over frames 10–50 (ease).
  const tint = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const irisColor = lerpColor(colors.cream, colors.coral, tint);

  // Attention ring: looping scale pulse + gentle opacity breathe.
  const ringScale = pulse(frame, fps, 0.9, 1.1, 1.3);
  const ringOpacity = interpolate(pulse(frame, fps, 0, 1, 1.3), [0, 1], [0.25, 0.6]);

  return (
    <AbsoluteFill style={{ opacity: fadeEnvelope(frame, 90), alignItems: "center", justifyContent: "center", gap: 90 }}>
      <div style={{ position: "relative", ...popIn(frame, fps, 2, 0.6) }}>
        {/* pulsing attention ring */}
        <div
          style={{
            position: "absolute",
            inset: "-70px -30px",
            borderRadius: "50%",
            border: `6px solid ${colors.coral}`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />
        <EyeIcon size={440} stroke={colors.cream} irisColor={irisColor} pupil={colors.teal} />
      </div>

      <h1
        style={{
          fontFamily: HINDI,
          fontWeight: 700,
          fontSize: 76,
          lineHeight: 1.35,
          color: colors.cream,
          textAlign: "center",
          maxWidth: 900,
          margin: 0,
          padding: "0 60px",
          ...riseIn(frame, fps, 26, 48),
        }}
      >
        {headline}
      </h1>
    </AbsoluteFill>
  );
};
