import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, FONT } from "./theme";

export const Notch: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: 260,
      height: 54,
      background: "#111122",
      borderRadius: "0 0 40px 40px",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
    }}
  >
    <div
      style={{
        width: 60,
        height: 10,
        borderRadius: 6,
        background: "#0d0015",
      }}
    />
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#0d0015",
        border: "3px solid #222",
      }}
    />
  </div>
);

export const StatusBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 54,
      left: 0,
      right: 0,
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 60px",
      zIndex: 100,
    }}
  >
    <span
      style={{
        fontSize: 28,
        fontWeight: 700,
        color: "rgba(255,255,255,0.9)",
        letterSpacing: 1,
      }}
    >
      9:41
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }}>
        ▲▲▲
      </span>
      <span style={{ fontSize: 24, color: "rgba(255,255,255,0.85)" }}>📶</span>
      <div
        style={{
          width: 52,
          height: 26,
          border: "3px solid rgba(255,255,255,0.7)",
          borderRadius: 6,
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: 3,
        }}
      >
        <div
          style={{
            width: "70%",
            height: "100%",
            background: C.green,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -9,
            top: "50%",
            transform: "translateY(-50%)",
            width: 5,
            height: 14,
            background: "rgba(255,255,255,0.5)",
            borderRadius: "0 3px 3px 0",
          }}
        />
      </div>
    </div>
  </div>
);

const Orb: React.FC<{
  frame: number;
  phase: number;
  style: React.CSSProperties;
}> = ({ frame, phase, style }) => {
  // orbFloat: 10s (300f) ease-in-out alternate, translate(0,0)->(36,55) scale 1->1.1
  const t = (Math.sin(((frame + phase) / 300) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(110px)",
        transform: `translate(${t * 36}px, ${t * 55}px) scale(${1 + t * 0.1})`,
        ...style,
      }}
    />
  );
};

export const Background: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(145deg, #1a0028 0%, #2d0845 38%, #1c0030 65%, #0d0018 100%)",
      overflow: "hidden",
    }}
  >
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "54px 54px",
      }}
    />
    <Orb
      frame={frame}
      phase={0}
      style={{
        width: 700,
        height: 700,
        top: -150,
        left: -100,
        background:
          "radial-gradient(circle,rgba(123,45,139,.55) 0%,transparent 70%)",
      }}
    />
    <Orb
      frame={frame}
      phase={120}
      style={{
        width: 550,
        height: 550,
        bottom: -80,
        right: -80,
        background:
          "radial-gradient(circle,rgba(176,110,196,.38) 0%,transparent 70%)",
      }}
    />
    <Orb
      frame={frame}
      phase={210}
      style={{
        width: 380,
        height: 380,
        top: "45%",
        left: "22%",
        background:
          "radial-gradient(circle,rgba(245,166,35,.14) 0%,transparent 70%)",
      }}
    />
  </AbsoluteFill>
);

export const TopBar: React.FC = () => (
  <div
    style={{
      padding: "36px 60px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
    }}
  >
    <div>
      <p
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: C.w,
          letterSpacing: -0.3,
          lineHeight: 1,
        }}
      >
        Dr. Sidharth Pant
      </p>
      <p
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,.48)",
          fontWeight: 500,
          marginTop: 4,
        }}
      >
        MD Radiation Oncology | DrNB Medical Oncology
      </p>
    </div>
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "rgba(123,45,139,.52)",
        border: "2px solid rgba(176,110,196,.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        fontWeight: 900,
        color: C.w,
        boxShadow: "0 0 36px rgba(123,45,139,.4)",
        flexShrink: 0,
      }}
    >
      LCI
    </div>
  </div>
);

export const ProgressBar: React.FC<{ index: number }> = ({ index }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: 6,
      width: `${((index + 1) / 6) * 100}%`,
      background: `linear-gradient(90deg, ${C.p}, ${C.amber})`,
      zIndex: 300,
      borderRadius: "0 3px 0 0",
    }}
  />
);

export const Dots: React.FC<{ index: number }> = ({ index }) => (
  <div
    style={{
      position: "absolute",
      right: 28,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      zIndex: 300,
    }}
  >
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: i === index ? C.amber : "rgba(255,255,255,.22)",
          transform: i === index ? "scale(1.5)" : "scale(1)",
          boxShadow: i === index ? "0 0 12px rgba(245,166,35,.6)" : "none",
        }}
      />
    ))}
  </div>
);

const LBLS = ["Hook", "Comparison", "Biopsy Info", "Treatment", "Exception", "Fact ✓"];

const NavBtn: React.FC<{ disabled?: boolean; children: React.ReactNode }> = ({
  disabled,
  children,
}) => (
  <div
    style={{
      width: 104,
      height: 104,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,.18)",
      background: "rgba(255,255,255,.07)",
      color: C.w,
      fontSize: 46,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.2 : 1,
    }}
  >
    {children}
  </div>
);

export const Nav: React.FC<{ index: number }> = ({ index }) => (
  <div
    style={{
      position: "absolute",
      bottom: 60,
      left: 0,
      right: 0,
      padding: "0 64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 300,
    }}
  >
    <NavBtn disabled={index === 0}>{"‹"}</NavBtn>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "rgba(255,255,255,.42)",
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: FONT,
        }}
      >
        {LBLS[index]}
      </span>
      <span style={{ fontSize: 34, fontWeight: 800, color: C.w }}>
        {index + 1}
        <span style={{ color: "rgba(255,255,255,.3)" }}> / 6</span>
      </span>
    </div>
    <NavBtn disabled={index === 5}>{"›"}</NavBtn>
  </div>
);

export const HomeBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      width: 220,
      height: 10,
      background: "rgba(255,255,255,0.55)",
      borderRadius: 6,
      zIndex: 300,
    }}
  />
);

export { interpolate };
