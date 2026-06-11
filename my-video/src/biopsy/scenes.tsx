import React from "react";
import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import {
  C,
  counter,
  envelope,
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  Glass,
  HINDI,
  popSettle,
  springScale,
} from "./theme";
import { TopBar } from "./chrome";

type SceneProps = { frame: number; duration: number };

const SceneFrame: React.FC<{
  frame: number;
  duration: number;
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ frame, duration, bodyStyle, children }) => (
  <AbsoluteFill
    style={{ opacity: envelope(frame, duration), flexDirection: "column" }}
  >
    <TopBar />
    <div
      style={{
        flex: 1,
        padding: "0 60px 160px",
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
export const SceneMyth: React.FC<SceneProps> = ({ frame, duration }) => (
  <SceneFrame
    frame={frame}
    duration={duration}
    bodyStyle={{ gap: 48, alignItems: "center" }}
  >
    <p
      style={{
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: 8,
        textTransform: "uppercase",
        color: C.amber,
        fontFamily: HINDI,
        ...fadeDown(frame, 0),
      }}
    >
      अफवाह #2
    </p>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        ...popSettle(frame, 6, 1.16),
      }}
    >
      <div
        style={{
          fontSize: 188,
          fontWeight: 900,
          color: C.w,
          letterSpacing: -10,
          lineHeight: 0.88,
          textAlign: "center",
          textShadow: "0 0 80px rgba(123,45,139,.5)",
        }}
      >
        MYTH
      </div>
      <div
        style={{
          fontSize: 130,
          color: C.red,
          filter: "drop-shadow(0 0 40px rgba(229,57,53,.7))",
          lineHeight: 1,
        }}
      >
        ✕
      </div>
    </div>
    <Glass
      variant="gl"
      style={{
        width: "100%",
        padding: "48px 54px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        ...fadeUp(frame, 16),
      }}
    >
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 50,
          fontWeight: 900,
          color: C.w,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        Biopsy से <span style={{ color: C.amber }}>Cancer</span> फैलता है?
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 28,
          color: "rgba(255,255,255,.56)",
          textAlign: "center",
          lineHeight: 1.45,
        }}
      >
        यह अफवाह गलत है — और इसे मानना खतरनाक हो सकता है
      </p>
    </Glass>
    <div
      style={{
        background: "rgba(245,166,35,.16)",
        border: "2px solid rgba(245,166,35,.48)",
        borderRadius: 80,
        padding: "16px 48px",
        fontSize: 24,
        fontWeight: 700,
        color: C.amber,
        letterSpacing: 3,
        textTransform: "uppercase",
        fontFamily: HINDI,
        ...fadeUp(frame, 25),
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
    style={{
      flex: 1,
      padding: "44px 28px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    }}
  >
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: iconBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 62,
      }}
    >
      {icon}
    </div>
    <p
      style={{
        fontWeight: 800,
        fontSize: 32,
        color: C.w,
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontSize: 22,
        color: "rgba(255,255,255,.46)",
        textAlign: "center",
        lineHeight: 1.6,
      }}
    >
      {lines.map((l, i) => (
        <React.Fragment key={i}>
          {l}
          {i < lines.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </p>
  </Glass>
);

export const SceneComparison: React.FC<SceneProps> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  const overlap = counter(frame, 30, 39, 78);
  const barW = interpolate(frame, [30, 69], [0, 78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 40 }}>
      <p
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "rgba(255,255,255,.38)",
          textAlign: "center",
          fontFamily: HINDI,
          ...fadeDown(frame, 0),
        }}
      >
        यह problem क्यों है?
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 54,
          fontWeight: 900,
          color: C.w,
          textAlign: "center",
          lineHeight: 1.2,
          ...fadeDown(frame, 5),
        }}
      >
        Symptoms एक जैसे हो सकते हैं
      </p>
      <div
        style={{
          display: "flex",
          gap: 22,
          alignItems: "stretch",
          ...fadeIn(frame, 11),
        }}
      >
        <CompareBox
          variant="glP"
          icon="🫁"
          iconBg="rgba(123,45,139,.5)"
          label="Lung Cancer"
          lines={["Persistent cough", "Weight loss", "Chest pain"]}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 72,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: C.amber,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              color: "#000",
              boxShadow: "0 0 28px rgba(245,166,35,.5)",
              ...springScale(frame, fps, 15, 0, {
                damping: 9,
                stiffness: 140,
                mass: 0.7,
              }),
            }}
          >
            vs
          </div>
        </div>
        <CompareBox
          variant="gl"
          icon="🦠"
          iconBg="rgba(255,255,255,.09)"
          label="Tuberculosis"
          lines={["Persistent cough", "Weight loss", "Chest pain"]}
        />
      </div>
      <Glass
        variant="gl"
        style={{
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          ...fadeUp(frame, 20),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,.48)",
            fontWeight: 600,
          }}
        >
          <span>Symptom Overlap</span>
          <span style={{ color: C.amber, fontWeight: 800 }}>{overlap}%</span>
        </div>
        <div
          style={{
            height: 18,
            borderRadius: 9,
            background: "rgba(255,255,255,.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barW}%`,
              borderRadius: 9,
              background: `linear-gradient(90deg,${C.p},${C.amber})`,
            }}
          />
        </div>
        <p
          style={{
            fontFamily: HINDI,
            fontSize: 26,
            color: "rgba(255,255,255,.60)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          इसीलिए Biopsy से confirmatory diagnosis ज़रूरी है
        </p>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S3 — BIOPSY INFO ════ */
const InfoRow: React.FC<{
  frame: number;
  delay: number;
  icon: string;
  main: string;
  sub: string;
}> = ({ frame, delay, icon, main, sub }) => (
  <Glass
    variant="gl"
    style={{
      padding: "36px 44px",
      display: "flex",
      alignItems: "center",
      gap: 34,
      ...fadeLeft(frame, delay),
    }}
  >
    <div
      style={{
        width: 94,
        height: 94,
        borderRadius: "50%",
        background: "rgba(123,45,139,.46)",
        border: "2px solid rgba(176,110,196,.40)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 44,
        flexShrink: 0,
        boxShadow: "0 0 22px rgba(123,45,139,.32)",
      }}
    >
      {icon}
    </div>
    <div>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 36,
          fontWeight: 800,
          color: C.w,
          lineHeight: 1.2,
        }}
      >
        {main}
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 24,
          color: "rgba(255,255,255,.46)",
          marginTop: 4,
        }}
      >
        {sub}
      </p>
    </div>
  </Glass>
);

export const SceneInfo: React.FC<SceneProps> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 34 }}>
    <Glass
      variant="glP"
      style={{
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        gap: 30,
        ...fadeDown(frame, 0),
      }}
    >
      <div
        style={{
          fontSize: 62,
          filter: "drop-shadow(0 0 18px rgba(176,110,196,.6))",
        }}
      >
        🔬
      </div>
      <div style={{ fontFamily: HINDI, fontSize: 42, fontWeight: 900, color: C.w, lineHeight: 1.2 }}>
        Biopsy क्या बताती है?
        <span
          style={{
            display: "block",
            fontSize: 24,
            color: "rgba(255,255,255,.46)",
            fontWeight: 400,
            marginTop: 4,
          }}
        >
          3 ज़रूरी जानकारियाँ
        </span>
      </div>
    </Glass>
    <InfoRow frame={frame} delay={9} icon="🔬" main="Cancer का Origin" sub="Primary site की सटीक पहचान" />
    <InfoRow frame={frame} delay={16} icon="🧬" main="Genetic Makeup" sub="Cancer का पूरा molecular profile" />
    <InfoRow frame={frame} delay={22} icon="⚡" main="Mutations की जानकारी" sub="Targeted therapy के लिए ज़रूरी" />
    <Glass
      variant="glD"
      style={{
        padding: "28px 44px",
        display: "flex",
        alignItems: "center",
        gap: 26,
        ...fadeUp(frame, 30),
      }}
    >
      <span style={{ fontSize: 52, filter: "drop-shadow(0 0 14px rgba(176,110,196,.5))" }}>🧬</span>
      <span style={{ fontFamily: HINDI, fontSize: 26, color: "rgba(255,255,255,.55)", lineHeight: 1.4 }}>
        Prognosis और Survival Analysis को बेहतर बनाता है
      </span>
    </Glass>
  </SceneFrame>
);

/* ════ S4 — TREATMENT ════ */
export const SceneTreatment: React.FC<SceneProps> = ({ frame, duration }) => {
  const chVal = counter(frame, 30, 45, 68);
  const dashOffset = interpolate(frame, [30, 78], [800, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotOp = interpolate(frame, [74, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pill = (text: string, active: boolean): React.CSSProperties => ({
    padding: "14px 36px",
    borderRadius: 80,
    fontSize: 24,
    fontWeight: active ? 800 : 700,
    background: active ? C.amber : "rgba(255,255,255,.09)",
    border: active ? "none" : "1.5px solid rgba(255,255,255,.17)",
    color: active ? "#000" : "rgba(255,255,255,.76)",
  });
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 40 }}>
      <p
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "rgba(255,255,255,.36)",
          fontFamily: HINDI,
          ...fadeDown(frame, 0, 12),
        }}
      >
        आज के ज़माने में
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 60,
          fontWeight: 900,
          color: C.w,
          lineHeight: 1.22,
          ...fadeUp(frame, 6),
        }}
      >
        Mutation Makeup से
        <br />
        <span style={{ color: C.amber }}>Personalized Treatment</span>
        <br />
        possible है
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, ...fadeIn(frame, 15) }}>
        <span style={pill("Prognosis", false)}>Prognosis</span>
        <span style={pill("Survival Analysis", false)}>Survival Analysis</span>
        <span style={pill("Targeted Therapy", false)}>Targeted Therapy</span>
        <span style={pill("Better Outcomes ↑", true)}>Better Outcomes ↑</span>
      </div>
      <Glass
        variant="gl"
        style={{
          padding: "40px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          ...fadeUp(frame, 22),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,.52)", letterSpacing: 1 }}>
            Patient Outcome Trend
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, color: C.green }}>+{chVal}%</span>
        </div>
        <svg style={{ width: "100%", height: 140 }} viewBox="0 0 640 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B2D8B" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
            <linearGradient id="ag" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B06EC4" stopOpacity=".4" />
              <stop offset="100%" stopColor="#B06EC4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ag)"
            opacity={0.14}
            d="M0,130 C80,124 180,102 300,74 C400,48 520,18 640,6 L640,140 L0,140 Z"
          />
          <path
            fill="none"
            stroke="url(#lg)"
            strokeWidth={5.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={800}
            strokeDashoffset={dashOffset}
            d="M0,130 C80,124 180,102 300,74 C400,48 520,18 640,6"
          />
          <circle cx={640} cy={6} r={9} fill="#F5A623" opacity={dotOp} />
        </svg>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S5 — EXCEPTION ════ */
const ExItem: React.FC<{
  frame: number;
  delay: number;
  title: string;
  sub: string;
}> = ({ frame, delay, title, sub }) => (
  <Glass
    variant="gl"
    style={{
      padding: "36px 44px",
      display: "flex",
      alignItems: "flex-start",
      gap: 28,
      borderLeft: `6px solid ${C.amber}`,
      ...fadeRight(frame, delay),
    }}
  >
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: C.amber,
        marginTop: 12,
        flexShrink: 0,
        boxShadow: "0 0 18px rgba(245,166,35,.7)",
      }}
    />
    <div>
      <p style={{ fontFamily: HINDI, fontSize: 38, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>{title}</p>
      <p style={{ fontFamily: HINDI, fontSize: 24, color: "rgba(255,255,255,.46)", marginTop: 6, lineHeight: 1.4 }}>
        {sub}
      </p>
    </div>
  </Glass>
);

export const SceneException: React.FC<SceneProps> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 34 }}>
    <Glass
      variant="glA"
      style={{
        padding: "32px 44px",
        display: "flex",
        alignItems: "center",
        gap: 26,
        ...fadeLeft(frame, 0, 26),
      }}
    >
      <span style={{ fontSize: 56 }}>⚠️</span>
      <div>
        <p style={{ fontFamily: HINDI, fontSize: 48, fontWeight: 900, color: C.amber, lineHeight: 1.1 }}>
          कुछ Exceptions हैं
        </p>
        <p style={{ fontFamily: HINDI, fontSize: 24, color: "rgba(255,255,255,.40)", fontWeight: 500, marginTop: 4 }}>
          इन cases में biopsy की जगह surgery होती है
        </p>
      </div>
    </Glass>
    <ExItem
      frame={frame}
      delay={10}
      title="Testicular Cancer"
      sub="Biopsy से disease spread का खतरा — surgery preferred"
    />
    <ExItem
      frame={frame}
      delay={16}
      title="Early Stage Ovarian Cancer"
      sub="Surgery से ही diagnosis establish होती है"
    />
    <Glass
      variant="glP"
      style={{
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        gap: 34,
        ...fadeUp(frame, 26),
      }}
    >
      <span style={{ fontSize: 70, filter: "drop-shadow(0 0 22px rgba(123,45,139,.8))" }}>🏥</span>
      <div>
        <p style={{ fontFamily: HINDI, fontSize: 38, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>
          Surgery = Direct Diagnosis
        </p>
        <p style={{ fontFamily: HINDI, fontSize: 24, color: "rgba(255,255,255,.46)", marginTop: 5, lineHeight: 1.4 }}>
          इन cases में surgery एक ज़रूरी और safe विकल्प है
        </p>
      </div>
    </Glass>
  </SceneFrame>
);

/* ════ S6 — FACT ════ */
export const SceneFact: React.FC<SceneProps> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  return (
    <SceneFrame
      frame={frame}
      duration={duration}
      bodyStyle={{ gap: 40, alignItems: "center" }}
    >
      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(46,204,113,.09)",
          border: "3px solid rgba(46,204,113,.30)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 118,
          boxShadow: "0 0 70px rgba(46,204,113,.26),0 0 140px rgba(46,204,113,.10)",
          ...springScale(frame, fps, 0, 0.38, { damping: 8, stiffness: 110, mass: 0.9 }),
        }}
      >
        ✅
      </div>
      <p
        style={{
          fontSize: 136,
          fontWeight: 900,
          color: C.w,
          letterSpacing: -6,
          lineHeight: 0.9,
          ...popSettle(frame, 11, 1.16),
        }}
      >
        FACT <span style={{ color: C.green }}>✓</span>
      </p>
      <p
        style={{
          fontFamily: HINDI,
          fontSize: 40,
          fontWeight: 700,
          color: "rgba(255,255,255,.78)",
          textAlign: "center",
          lineHeight: 1.5,
          padding: "0 18px",
          ...fadeUp(frame, 20),
        }}
      >
        Biopsy से cancer <span style={{ color: C.amber }}>नहीं फैलता</span> — यह एक ज़रूरी और life-saving diagnosis tool है
      </p>
      <Glass
        variant="gl"
        style={{
          width: "100%",
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...fadeUp(frame, 28),
        }}
      >
        <div>
          <p style={{ fontSize: 36, fontWeight: 800, color: C.w }}>Dr. Sidharth Pant</p>
          <p style={{ fontSize: 22, color: "rgba(255,255,255,.46)", marginTop: 5, lineHeight: 1.4 }}>
            MD Radiation Oncology
            <br />
            DrNB Medical Oncology
          </p>
        </div>
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: "50%",
            background: "rgba(123,45,139,.52)",
            border: "3px solid rgba(176,110,196,.42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 900,
            color: C.w,
            boxShadow: "0 0 36px rgba(123,45,139,.42)",
            flexShrink: 0,
          }}
        >
          LCI
        </div>
      </Glass>
      <Glass
        variant="glD"
        style={{
          width: "100%",
          padding: "32px 48px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          ...fadeUp(frame, 34),
        }}
      >
        <span style={{ fontSize: 38 }}>📞</span>
        <div style={{ fontFamily: HINDI, fontSize: 26, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>
          <strong style={{ color: C.w, display: "block", fontSize: 32 }}>735-599-2740</strong>
          Lucknow Cancer Institute, Manas Nagar, Jiamau
        </div>
      </Glass>
    </SceneFrame>
  );
};
