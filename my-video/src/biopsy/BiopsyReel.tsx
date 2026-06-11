import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT } from "./theme";
import { Background, Dots, HomeBar, Nav, Notch, ProgressBar, StatusBar } from "./chrome";
import {
  SceneComparison,
  SceneException,
  SceneFact,
  SceneInfo,
  SceneMyth,
  SceneTreatment,
} from "./scenes";

// Each scene: [start, duration]. Scenes overlap by ~12f for crossfades.
const SCENES = [
  { start: 0, duration: 128, Comp: SceneMyth },
  { start: 116, duration: 140, Comp: SceneComparison },
  { start: 244, duration: 128, Comp: SceneInfo },
  { start: 360, duration: 150, Comp: SceneTreatment },
  { start: 498, duration: 128, Comp: SceneException },
  { start: 614, duration: 166, Comp: SceneFact },
] as const;

export const REEL_DURATION = 780; // frames @ 30fps = 26s

// Index boundaries for chrome (centers of the crossfades).
const BOUNDS = [122, 250, 366, 504, 620];
const currentIndex = (frame: number) => {
  for (let i = 0; i < BOUNDS.length; i++) {
    if (frame < BOUNDS[i]) return i;
  }
  return 5;
};

export const BiopsyReel: React.FC = () => {
  const frame = useCurrentFrame();
  const index = currentIndex(frame);

  return (
    <AbsoluteFill style={{ background: "#0d0015", fontFamily: FONT }}>
      {/* Phone shell */}
      <AbsoluteFill
        style={{
          borderRadius: 108,
          background: "#1a1a2e",
          boxShadow:
            "0 0 0 6px #2a2a3e, 0 0 0 14px #111122, 0 60px 160px rgba(0,0,0,0.85), 0 0 200px rgba(123,45,139,0.3)",
          overflow: "hidden",
        }}
      >
        <Notch />
        <StatusBar />

        {/* Screen content area (below notch + status bar) */}
        <div
          style={{
            position: "absolute",
            top: 114,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            borderRadius: "0 0 94px 94px",
          }}
        >
          <Background frame={frame} />
          <ProgressBar index={index} />
          <Dots index={index} />

          {/* Scenes */}
          {SCENES.map(({ start, duration, Comp }, i) => {
            if (frame < start - 2 || frame > start + duration) return null;
            return <Comp key={i} frame={frame - start} duration={duration} />;
          })}

          <Nav index={index} />
          <HomeBar />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
