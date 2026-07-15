// ═══════════════════════════════════════════════════════════════════════
//  RED EYE AWARENESS — vertical Hindi healthcare motion graphic
//  1080×1920 · 30fps · 540 frames (18s)
//
//  Everything a client would want to edit lives in the CONFIG block below:
//  colours, all Hindi copy, and the placeholder clinic fields.
// ═══════════════════════════════════════════════════════════════════════
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { lerpColor } from "./theme";
import type { Palette } from "./types";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Problem } from "./Scene2Problem";
import { Scene3Reasons } from "./Scene3Reasons";
import { Scene4CTA } from "./Scene4CTA";

// ── COLOUR PALETTE ──────────────────────────────────────────────────────
const COLORS: Palette = {
  teal: "#0B4F4A", // deep teal background
  coral: "#E8543E", // warm coral-red — the "red eye" / danger motif
  cream: "#FDF8F0", // off-white text & cards
  gold: "#D4A24C", // soft gold CTA highlight
  gray: "#7C8A85", // muted subtext
};

// ── COPY (all Hindi text, edit freely) ──────────────────────────────────
const COPY = {
  scene1Headline: "क्या आपकी आंखें लाल हो गई हैं?",
  scene2Headline: "हर बार eye drops खुद से ना डालें",
  scene2Subtext: "बिना डॉक्टर की सलाह के नहीं",
  scene3Heading: "ऐसा क्यों ज़रूरी है?",
  scene3Reasons: [
    "गलत दवा से नुकसान हो सकता है",
    "समय पर सही इलाज ज़रूरी है",
    "सही जांच के बाद ही दवा लें",
  ] as [string, string, string],
  scene4Headline: "आज ही Eye Specialist से मिलें",
};

// ── CLIENT PLACEHOLDER FIELDS (swap in real details) ────────────────────
const CLINIC_NAME = "[Clinic Name]";
const CONTACT_NUMBER = "[WhatsApp Number]";
const LOCATION = "[City/Area]";
const BADGE_LABEL = "[Logo / Name]";

// ── SCENE TIMING (frame ranges — adjust here to re-time) ─────────────────
const SCENES = {
  hook: { from: 0, duration: 90 }, //   0–90   (0–3s)
  problem: { from: 90, duration: 150 }, //  90–240  (3–8s)
  reasons: { from: 240, duration: 150 }, // 240–390  (8–13s)
  cta: { from: 390, duration: 150 }, //   390–540 (13–18s)
};

export const RED_EYE_DURATION = 540;

/**
 * Shared background whose colour crossfades across scene boundaries:
 * teal (hook) → cream (problem) → teal (reasons) → teal (cta).
 */
const bgColorAt = (frame: number): string => {
  if (frame < 90) return COLORS.teal;
  if (frame < 110) return lerpColor(COLORS.teal, COLORS.cream, (frame - 90) / 20);
  if (frame < 240) return COLORS.cream;
  if (frame < 260) return lerpColor(COLORS.cream, COLORS.teal, (frame - 240) / 20);
  return COLORS.teal;
};

export const RedEyeAwareness: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: bgColorAt(frame) }}>
      {/* SCENE 1 — Hook (0–90) */}
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.duration} name="Hook">
        <Scene1Hook colors={COLORS} headline={COPY.scene1Headline} />
      </Sequence>

      {/* SCENE 2 — Problem / common mistake (90–240) */}
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.duration} name="Problem">
        <Scene2Problem colors={COLORS} headline={COPY.scene2Headline} subtext={COPY.scene2Subtext} />
      </Sequence>

      {/* SCENE 3 — Why it matters (240–390) */}
      <Sequence from={SCENES.reasons.from} durationInFrames={SCENES.reasons.duration} name="Reasons">
        <Scene3Reasons colors={COLORS} heading={COPY.scene3Heading} reasons={COPY.scene3Reasons} />
      </Sequence>

      {/* SCENE 4 — CTA (390–540) */}
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration} name="CTA">
        <Scene4CTA
          colors={COLORS}
          headline={COPY.scene4Headline}
          clinicName={CLINIC_NAME}
          contactNumber={CONTACT_NUMBER}
          location={LOCATION}
          badgeLabel={BADGE_LABEL}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
