import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  counter,
  envelope,
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  FONT,
  Glass,
  HINDI,
  popSettle,
  springScale,
} from "../biopsy/theme";

const R = 36; // card radius for this design

/* ── Background (full-bleed, orbF 8s) ── */
const Orb: React.FC<{ frame: number; phase: number; style: React.CSSProperties }> = ({
  frame,
  phase,
  style,
}) => {
  const t = (Math.sin(((frame + phase) / 240) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(130px)",
        transform: `translate(${t * 36}px, ${t * 48}px) scale(${1 + t * 0.08})`,
        ...style,
      }}
    />
  );
};

const Background: React.FC<{ frame: number }> = ({ frame }) => (
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
        backgroundSize: "72px 72px",
      }}
    />
    <Orb
      frame={frame}
      phase={0}
      style={{
        width: 660,
        height: 660,
        top: -180,
        left: -150,
        background: "radial-gradient(circle,rgba(123,45,139,.60) 0%,transparent 70%)",
      }}
    />
    <Orb
      frame={frame}
      phase={90}
      style={{
        width: 540,
        height: 540,
        bottom: -120,
        right: -120,
        background: "radial-gradient(circle,rgba(176,110,196,.42) 0%,transparent 70%)",
      }}
    />
    <Orb
      frame={frame}
      phase={150}
      style={{
        width: 420,
        height: 420,
        top: "45%",
        left: "20%",
        background: "radial-gradient(circle,rgba(245,166,35,.16) 0%,transparent 70%)",
      }}
    />
  </AbsoluteFill>
);

const TopBar: React.FC = () => (
  <div style={{ padding: "72px 64px 36px", flexShrink: 0, position: "relative", zIndex: 10 }}>
    <p style={{ fontSize: 42, fontWeight: 800, color: C.w, letterSpacing: -0.5, lineHeight: 1 }}>
      Dr. Sidharth Pant
    </p>
    <p style={{ fontSize: 24, color: "rgba(255,255,255,.46)", fontWeight: 500, marginTop: 8 }}>
      MD Radiation Oncology | DrNB Medical Oncology
    </p>
  </div>
);

const SceneFrame: React.FC<{
  frame: number;
  duration: number;
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ frame, duration, bodyStyle, children }) => (
  <AbsoluteFill style={{ opacity: envelope(frame, duration), flexDirection: "column" }}>
    <TopBar />
    <div
      style={{
        flex: 1,
        minHeight: 0,
        padding: "20px 64px 170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...bodyStyle,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

/* ════ S1 — MYTH ════ */
const SceneMyth: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 36, alignItems: "center" }}>
    <p
      style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 14,
        textTransform: "uppercase",
        color: C.amber,
        fontFamily: HINDI,
        ...fadeDown(frame, 0, 24),
      }}
    >
      अफवाह #2
    </p>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        ...popSettle(frame, 5, 1.15),
      }}
    >
      <div
        style={{
          fontSize: 240,
          fontWeight: 900,
          color: C.w,
          letterSpacing: -14,
          lineHeight: 0.86,
          textAlign: "center",
          textShadow: "0 0 90px rgba(123,45,139,.55)",
        }}
      >
        MYTH
      </div>
      <div
        style={{
          fontSize: 156,
          color: C.red,
          filter: "drop-shadow(0 0 50px rgba(229,57,53,.72))",
          lineHeight: 1,
        }}
      >
        ✕
      </div>
    </div>
    <Glass
      variant="gl"
      radius={R}
      style={{
        width: "100%",
        padding: "52px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        alignItems: "center",
        ...fadeUp(frame, 13),
      }}
    >
      <p style={{ fontFamily: HINDI, fontSize: 64, fontWeight: 900, color: C.w, lineHeight: 1.35, textAlign: "center" }}>
        Biopsy से <span style={{ color: C.amber }}>Cancer</span> फैलता है?
      </p>
      <p style={{ fontFamily: HINDI, fontSize: 34, color: "rgba(255,255,255,.55)", textAlign: "center", lineHeight: 1.5 }}>
        यह अफवाह गलत है — और इसे मानना खतरनाक हो सकता है
      </p>
    </Glass>
    <div
      style={{
        background: "rgba(245,166,35,.16)",
        border: "2px solid rgba(245,166,35,.44)",
        borderRadius: 80,
        padding: "22px 64px",
        fontSize: 28,
        fontWeight: 700,
        color: C.amber,
        letterSpacing: 4,
        textTransform: "uppercase",
        fontFamily: HINDI,
        ...fadeUp(frame, 21),
      }}
    >
      जानिए सच क्या है →
    </div>
  </SceneFrame>
);

/* ════ S2 — COMPARISON ════ */
const CompareBox: React.FC<{
  variant: "gl" | "glP";
  icon: string;
  iconBg: string;
  label: string;
  lines: string[];
}> = ({ variant, icon, iconBg, label, lines }) => (
  <Glass
    variant={variant}
    radius={R}
    style={{ flex: 1, padding: "52px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
  >
    <div
      style={{
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 72,
      }}
    >
      {icon}
    </div>
    <p style={{ fontWeight: 800, fontSize: 38, color: C.w, textAlign: "center", lineHeight: 1.2 }}>{label}</p>
    <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", textAlign: "center", lineHeight: 1.65 }}>
      {lines.map((l, i) => (
        <React.Fragment key={i}>
          {l}
          {i < lines.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </p>
  </Glass>
);

const SceneComparison: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  const overlap = counter(frame, 26, 36, 78);
  const barW = interpolate(frame, [26, 62], [0, 78], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 36 }}>
      <p
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "rgba(255,255,255,.36)",
          textAlign: "center",
          fontFamily: HINDI,
          ...fadeDown(frame, 0, 16),
        }}
      >
        यह problem क्यों है?
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 66,
          fontWeight: 900,
          color: C.w,
          textAlign: "center",
          lineHeight: 1.2,
          ...fadeDown(frame, 4, 16),
        }}
      >
        Symptoms एक जैसे हो सकते हैं
      </p>
      <div style={{ display: "flex", gap: 28, alignItems: "stretch", ...fadeIn(frame, 8) }}>
        <CompareBox variant="glP" icon="🫁" iconBg="rgba(123,45,139,.5)" label="Lung Cancer" lines={["Persistent cough", "Weight loss", "Chest pain"]} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 80 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: C.amber,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "#000",
              boxShadow: "0 0 30px rgba(245,166,35,.5)",
              ...springScale(frame, fps, 12, 0, { damping: 9, stiffness: 140, mass: 0.7 }),
            }}
          >
            vs
          </div>
        </div>
        <CompareBox variant="gl" icon="🦠" iconBg="rgba(255,255,255,.09)" label="Tuberculosis" lines={["Persistent cough", "Weight loss", "Chest pain"]} />
      </div>
      <Glass variant="gl" radius={R} style={{ padding: "44px 56px", display: "flex", flexDirection: "column", gap: 22, ...fadeUp(frame, 17) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28, color: "rgba(255,255,255,.46)", fontWeight: 600 }}>
          <span>Symptom Overlap</span>
          <span style={{ color: C.amber, fontWeight: 800 }}>{overlap}%</span>
        </div>
        <div style={{ height: 18, borderRadius: 9, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${barW}%`, borderRadius: 9, background: `linear-gradient(90deg,${C.p},${C.amber})` }} />
        </div>
        <p style={{ fontFamily: HINDI, fontSize: 30, color: "rgba(255,255,255,.58)", textAlign: "center", lineHeight: 1.5 }}>
          इसीलिए Biopsy से confirmatory diagnosis ज़रूरी है
        </p>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S3 — BIOPSY INFO ════ */
const InfoRow: React.FC<{ frame: number; delay: number; icon: string; main: string; sub: string }> = ({
  frame,
  delay,
  icon,
  main,
  sub,
}) => (
  <Glass variant="gl" radius={R} style={{ padding: "36px 48px", display: "flex", alignItems: "center", gap: 36, ...fadeLeft(frame, delay, 40) }}>
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "rgba(123,45,139,.44)",
        border: "2px solid rgba(176,110,196,.36)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
        flexShrink: 0,
        boxShadow: "0 0 22px rgba(123,45,139,.28)",
      }}
    >
      {icon}
    </div>
    <div>
      <p style={{ fontFamily: HINDI, fontSize: 40, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>{main}</p>
      <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 6 }}>{sub}</p>
    </div>
  </Glass>
);

const SceneInfo: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 28 }}>
    <Glass variant="glP" radius={R} style={{ padding: "44px 52px", display: "flex", alignItems: "center", gap: 36, ...fadeDown(frame, 0, 20) }}>
      <div style={{ fontSize: 72, filter: "drop-shadow(0 0 20px rgba(176,110,196,.6))", flexShrink: 0 }}>🔬</div>
      <div style={{ fontFamily: HINDI, fontSize: 52, fontWeight: 900, color: C.w, lineHeight: 1.2 }}>
        Biopsy क्या बताती है?
        <span style={{ display: "block", fontSize: 28, color: "rgba(255,255,255,.44)", fontWeight: 400, marginTop: 6 }}>
          3 ज़रूरी जानकारियाँ
        </span>
      </div>
    </Glass>
    <InfoRow frame={frame} delay={7} icon="🔬" main="Cancer का Origin" sub="Primary site की सटीक पहचान" />
    <InfoRow frame={frame} delay={13} icon="🧬" main="Genetic Makeup" sub="Cancer का पूरा molecular profile" />
    <InfoRow frame={frame} delay={18} icon="⚡" main="Mutations की जानकारी" sub="Targeted therapy के लिए ज़रूरी" />
    <Glass variant="glD" radius={R} style={{ padding: "28px 48px", display: "flex", alignItems: "center", gap: 28, ...fadeUp(frame, 25) }}>
      <span style={{ fontSize: 52, filter: "drop-shadow(0 0 14px rgba(176,110,196,.5))" }}>🧬</span>
      <span style={{ fontFamily: HINDI, fontSize: 28, color: "rgba(255,255,255,.54)", lineHeight: 1.4 }}>
        Prognosis और Survival Analysis को बेहतर बनाता है
      </span>
    </Glass>
  </SceneFrame>
);

/* ════ S4 — TREATMENT ════ */
const SceneTreatment: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const chVal = counter(frame, 26, 42, 68);
  const dashOffset = interpolate(frame, [26, 68], [800, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotOp = interpolate(frame, [64, 72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pill = (active: boolean): React.CSSProperties => ({
    padding: "18px 40px",
    borderRadius: 80,
    fontSize: 28,
    fontWeight: active ? 800 : 700,
    background: active ? C.amber : "rgba(255,255,255,.09)",
    border: active ? "none" : "2px solid rgba(255,255,255,.17)",
    color: active ? "#000" : "rgba(255,255,255,.76)",
  });
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 36 }}>
      <p
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "rgba(255,255,255,.34)",
          fontFamily: HINDI,
          ...fadeDown(frame, 0, 16),
        }}
      >
        आज के ज़माने में
      </p>
      <p style={{ fontFamily: HINDI, fontSize: 66, fontWeight: 900, color: C.w, lineHeight: 1.25, ...fadeUp(frame, 5) }}>
        Mutation Makeup से
        <br />
        <span style={{ color: C.amber }}>Personalized Treatment</span>
        <br />
        possible है
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, ...fadeIn(frame, 12) }}>
        <span style={pill(false)}>Prognosis</span>
        <span style={pill(false)}>Survival Analysis</span>
        <span style={pill(false)}>Targeted Therapy</span>
        <span style={pill(true)}>Better Outcomes ↑</span>
      </div>
      <Glass variant="gl" radius={R} style={{ padding: "44px 52px", display: "flex", flexDirection: "column", gap: 20, ...fadeUp(frame, 19) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,.50)", letterSpacing: 1 }}>Patient Outcome Trend</span>
          <span style={{ fontSize: 32, fontWeight: 800, color: C.green }}>+{chVal}%</span>
        </div>
        <svg style={{ width: "100%", height: 140 }} viewBox="0 0 952 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B2D8B" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
            <linearGradient id="ag2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B06EC4" stopOpacity=".4" />
              <stop offset="100%" stopColor="#B06EC4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#ag2)" opacity={0.13} d="M0,130 C120,124 270,100 476,72 C600,52 780,16 952,4 L952,140 L0,140 Z" />
          <path
            fill="none"
            stroke="url(#lg2)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={800}
            strokeDashoffset={dashOffset}
            d="M0,130 C120,124 270,100 476,72 C600,52 780,16 952,4"
          />
          <circle cx={952} cy={4} r={10} fill="#F5A623" opacity={dotOp} />
        </svg>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S5 — EXCEPTION ════ */
const ExItem: React.FC<{ frame: number; delay: number; title: string; sub: string }> = ({ frame, delay, title, sub }) => (
  <Glass
    variant="gl"
    radius={R}
    style={{ padding: "36px 48px", display: "flex", alignItems: "flex-start", gap: 28, borderLeft: `6px solid ${C.amber}`, ...fadeRight(frame, delay) }}
  >
    <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.amber, marginTop: 14, flexShrink: 0, boxShadow: "0 0 16px rgba(245,166,35,.68)" }} />
    <div>
      <p style={{ fontFamily: HINDI, fontSize: 42, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>{title}</p>
      <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 8, lineHeight: 1.4 }}>{sub}</p>
    </div>
  </Glass>
);

const SceneException: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 28 }}>
    <Glass variant="glA" radius={R} style={{ padding: "36px 48px", display: "flex", alignItems: "center", gap: 28, ...fadeLeft(frame, 0, 28) }}>
      <span style={{ fontSize: 64, flexShrink: 0 }}>⚠️</span>
      <div>
        <p style={{ fontFamily: HINDI, fontSize: 56, fontWeight: 900, color: C.amber, lineHeight: 1.1 }}>कुछ Exceptions हैं</p>
        <p style={{ fontSize: 26, color: "rgba(255,255,255,.40)", fontWeight: 500, marginTop: 6 }}>इन cases में biopsy की जगह surgery होती है</p>
      </div>
    </Glass>
    <ExItem frame={frame} delay={8} title="Testicular Cancer" sub="Biopsy से disease spread का खतरा — surgery preferred" />
    <ExItem frame={frame} delay={13} title="Early Stage Ovarian Cancer" sub="Surgery से ही diagnosis establish होती है" />
    <Glass variant="glP" radius={R} style={{ padding: "44px 52px", display: "flex", alignItems: "center", gap: 36, ...fadeUp(frame, 22) }}>
      <span style={{ fontSize: 76, filter: "drop-shadow(0 0 24px rgba(123,45,139,.80))", flexShrink: 0 }}>🏥</span>
      <div>
        <p style={{ fontFamily: HINDI, fontSize: 42, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>Surgery = Direct Diagnosis</p>
        <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 8, lineHeight: 1.4 }}>इन cases में surgery एक ज़रूरी और safe विकल्प है</p>
      </div>
    </Glass>
  </SceneFrame>
);

/* ════ S6 — FACT ════ */
const SceneFact: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 36, alignItems: "center" }}>
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(46,204,113,.09)",
          border: "4px solid rgba(46,204,113,.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 110,
          boxShadow: "0 0 80px rgba(46,204,113,.24),0 0 160px rgba(46,204,113,.09)",
          ...springScale(frame, fps, 0, 0.34, { damping: 8, stiffness: 110, mass: 0.9 }),
        }}
      >
        ✅
      </div>
      <p style={{ fontSize: 160, fontWeight: 900, color: C.w, letterSpacing: -8, lineHeight: 0.86, ...popSettle(frame, 10, 1.15) }}>
        FACT <span style={{ color: C.green }}>✓</span>
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 42,
          fontWeight: 700,
          color: "rgba(255,255,255,.78)",
          textAlign: "center",
          lineHeight: 1.55,
          padding: "0 16px",
          ...fadeUp(frame, 17),
        }}
      >
        Biopsy से cancer <span style={{ color: C.amber }}>नहीं फैलता</span> — यह एक ज़रूरी और life-saving diagnosis tool है
      </p>
      <Glass variant="gl" radius={R} style={{ width: "100%", padding: "44px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", ...fadeUp(frame, 25) }}>
        <div>
          <p style={{ fontSize: 44, fontWeight: 800, color: C.w }}>Dr. Sidharth Pant</p>
          <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 8, lineHeight: 1.4 }}>
            MD Radiation Oncology | DrNB Medical Oncology
          </p>
        </div>
        <div style={{ width: 6, height: 72, background: C.p, borderRadius: 3, flexShrink: 0, marginLeft: 24 }} />
      </Glass>
      <Glass variant="glD" radius={R} style={{ width: "100%", padding: "36px 52px", display: "flex", alignItems: "center", gap: 28, ...fadeUp(frame, 29) }}>
        <span style={{ fontSize: 52, flexShrink: 0 }}>📞</span>
        <div style={{ fontFamily: HINDI, fontSize: 28, color: "rgba(255,255,255,.54)", lineHeight: 1.5 }}>
          <strong style={{ color: C.w, display: "block", fontSize: 36 }}>735-599-2740</strong>
          Lucknow Cancer Institute, Manas Nagar, Jiamau
        </div>
      </Glass>
    </SceneFrame>
  );
};

/* ── Chrome ── */
const LBLS = ["Hook", "Comparison", "Biopsy Info", "Treatment", "Exception", "Fact ✓"];

const Progress: React.FC<{ index: number }> = ({ index }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: 8,
      width: `${((index + 1) / 6) * 100}%`,
      background: `linear-gradient(90deg, ${C.p}, ${C.amber})`,
      boxShadow: "0 0 20px rgba(245,166,35,.4)",
      zIndex: 500,
    }}
  />
);

const Dots: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 18, zIndex: 500 }}>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: i === index ? C.amber : "rgba(255,255,255,.22)",
          transform: i === index ? "scale(1.5)" : "scale(1)",
          boxShadow: i === index ? "0 0 14px rgba(245,166,35,.65)" : "none",
        }}
      />
    ))}
  </div>
);

const NavBtn: React.FC<{ disabled?: boolean; children: React.ReactNode }> = ({ disabled, children }) => (
  <div
    style={{
      width: 110,
      height: 110,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,.16)",
      background: "rgba(255,255,255,.07)",
      color: C.w,
      fontSize: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.18 : 1,
    }}
  >
    {children}
  </div>
);

const Nav: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 500 }}>
    <NavBtn disabled={index === 0}>{"‹"}</NavBtn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,.38)", letterSpacing: 4, textTransform: "uppercase", fontFamily: FONT }}>
        {LBLS[index]}
      </span>
      <span style={{ fontSize: 40, fontWeight: 800, color: C.w }}>
        {index + 1}
        <span style={{ color: "rgba(255,255,255,.28)" }}> / 6</span>
      </span>
    </div>
    <NavBtn disabled={index === 5}>{"›"}</NavBtn>
  </div>
);

/* ── Assembly ── */
const SCENES = [
  { start: 0, duration: 128, Comp: SceneMyth },
  { start: 116, duration: 140, Comp: SceneComparison },
  { start: 244, duration: 128, Comp: SceneInfo },
  { start: 360, duration: 150, Comp: SceneTreatment },
  { start: 498, duration: 128, Comp: SceneException },
  { start: 614, duration: 166, Comp: SceneFact },
] as const;

export const INSTA_DURATION = 780;

const BOUNDS = [122, 250, 366, 504, 620];
const currentIndex = (frame: number) => {
  for (let i = 0; i < BOUNDS.length; i++) if (frame < BOUNDS[i]) return i;
  return 5;
};

export const BiopsyInstaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const index = currentIndex(frame);
  return (
    <AbsoluteFill style={{ background: "#0d0015", fontFamily: FONT }}>
      <Background frame={frame} />
      <Progress index={index} />
      <Dots index={index} />
      {SCENES.map(({ start, duration, Comp }, i) => {
        if (frame < start - 2 || frame > start + duration) return null;
        return <Comp key={i} frame={frame - start} duration={duration} />;
      })}
      <Nav index={index} />
    </AbsoluteFill>
  );
};
