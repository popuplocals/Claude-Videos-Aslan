import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, counter, envelope, FONT, Glass, HINDI } from "../biopsy/theme";

const R = 40;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const REVEAL = Easing.bezier(0.77, 0, 0.18, 1);

const op = (f: number, delay: number, dur = 10) =>
  interpolate(f, [delay, delay + dur], [0, 1], CL);
const eased = (f: number, delay: number, dur: number, easing = BACK) =>
  interpolate(f, [delay, delay + dur], [0, 1], { ...CL, easing });

/* ── entrance helpers ── */
const clipReveal = (f: number, delay: number, dur = 18): React.CSSProperties => ({
  opacity: 1,
  clipPath: `inset(0 ${(1 - interpolate(f, [delay, delay + dur], [0, 1], { ...CL, easing: REVEAL })) * 100}% 0 0)`,
});
const scaleYReveal = (f: number, delay: number, dur = 12): React.CSSProperties => ({
  opacity: 1,
  transform: `scaleY(${eased(f, delay, dur)})`,
  transformOrigin: "top",
});
const fadeDown = (f: number, delay: number, dist = 20, dur = 16): React.CSSProperties => ({
  opacity: op(f, delay),
  transform: `translateY(${-(1 - eased(f, delay, dur)) * dist}px)`,
});
const fadeUp = (f: number, delay: number, dist = 28, dur = 16): React.CSSProperties => ({
  opacity: op(f, delay),
  transform: `translateY(${(1 - eased(f, delay, dur)) * dist}px)`,
});
const fadeLeft = (f: number, delay: number, dist = 50, dur = 16): React.CSSProperties => ({
  opacity: op(f, delay),
  transform: `translateX(${-(1 - eased(f, delay, dur)) * dist}px)`,
});
const fadeRight = (f: number, delay: number, dist = 50, dur = 16): React.CSSProperties => ({
  opacity: op(f, delay),
  transform: `translateX(${(1 - eased(f, delay, dur)) * dist}px)`,
});
const slideUp = (f: number, delay: number, dur = 18): React.CSSProperties => {
  const t = eased(f, delay, dur);
  return { opacity: op(f, delay), transform: `translateY(${(1 - t) * 30}px) scale(${0.97 + 0.03 * Math.min(t, 1)})` };
};
const letterDrop = (f: number, fps: number, delay: number): React.CSSProperties => {
  const s = spring({ frame: f - delay, fps, config: { damping: 12, stiffness: 120, mass: 0.8 } });
  return { opacity: op(f, delay, 8), transform: `translateY(${(1 - s) * 80}px) rotate(${(1 - s) * 8}deg)` };
};
const bounceIn = (f: number, fps: number, delay: number, fromRot = -30): React.CSSProperties => {
  const s = spring({ frame: f - delay, fps, config: { damping: 9, stiffness: 140, mass: 0.8 } });
  return { opacity: op(f, delay, 8), transform: `scale(${interpolate(s, [0, 1], [0, 1])}) rotate(${interpolate(s, [0, 1], [fromRot, 0])}deg)` };
};
const popScale = (f: number, fps: number, delay: number): React.CSSProperties => {
  const s = spring({ frame: f - delay, fps, config: { damping: 11, stiffness: 150, mass: 0.7 } });
  return { opacity: op(f, delay, 8), transform: `scale(${interpolate(s, [0, 1], [0.7, 1])}) translateY(${(1 - s) * 20}px)` };
};

/* ── ambient background ── */
const wave = (f: number, periodSec: number, phase = 0) =>
  (Math.sin((f / (periodSec * 30)) * Math.PI * 2 + phase) + 1) / 2;

const PARTS = [
  { left: "10%", size: 4, dur: 12, delay: 0, color: C.pl },
  { left: "25%", size: 3, dur: 16, delay: 4, color: C.pl },
  { left: "40%", size: 5, dur: 10, delay: 2, color: C.pl },
  { left: "60%", size: 3, dur: 14, delay: 6, color: C.pl },
  { left: "75%", size: 4, dur: 11, delay: 3, color: C.pl },
  { left: "88%", size: 3, dur: 13, delay: 8, color: C.pl },
  { left: "50%", size: 6, dur: 18, delay: 1, color: C.amber },
  { left: "15%", size: 3, dur: 9, delay: 5, color: C.amber },
];

const Background: React.FC<{ frame: number }> = ({ frame }) => {
  const gridP = (frame / (20 * 30)) * 54;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 120% 60% at 20% 10%, #2a0845 0%, #0d0018 50%, #060010 100%)", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,45,139,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,45,139,0.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          backgroundPosition: `${gridP % 54}px ${gridP % 54}px`,
        }}
      />
      <div style={{ position: "absolute", width: 700, height: 700, top: -200, left: -150, borderRadius: "50%", filter: "blur(140px)", background: "radial-gradient(circle,rgba(123,45,139,.65) 0%,transparent 70%)", transform: `scale(${1 + wave(frame, 16) * 0.15}) translate(${wave(frame, 16) * 30}px,${wave(frame, 16) * 40}px)` }} />
      <div style={{ position: "absolute", width: 560, height: 560, bottom: -100, right: -100, borderRadius: "50%", filter: "blur(140px)", background: "radial-gradient(circle,rgba(176,110,196,.45) 0%,transparent 70%)", transform: `scale(${1 + wave(frame, 22, 1) * 0.15}) translate(${wave(frame, 22, 1) * -30}px,${wave(frame, 22, 1) * -40}px)` }} />
      <div style={{ position: "absolute", width: 400, height: 400, top: "40%", left: "25%", borderRadius: "50%", filter: "blur(140px)", background: "radial-gradient(circle,rgba(245,166,35,.18) 0%,transparent 70%)", transform: `translate(${wave(frame, 28) * -60}px,${wave(frame, 28) * 80}px)` }} />
      {PARTS.map((p, i) => {
        const period = p.dur * 30;
        const ph = (((frame + p.delay * 30) % period) + period) % period;
        const pp = ph / period;
        const y = interpolate(pp, [0, 1], [1920, -50]);
        const o = pp < 0.05 ? (pp / 0.05) * 0.6 : pp < 0.9 ? 0.6 - ((pp - 0.05) / 0.85) * 0.3 : 0.3 * (1 - (pp - 0.9) / 0.1);
        return <div key={i} style={{ position: "absolute", left: p.left, top: 0, width: p.size, height: p.size, borderRadius: "50%", background: p.color, opacity: o, transform: `translateY(${y}px) scale(${interpolate(pp, [0, 1], [0, 1.2])})` }} />;
      })}
    </AbsoluteFill>
  );
};

const TopBar: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ padding: "80px 72px 0", flexShrink: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: 40, fontWeight: 800, color: C.w, letterSpacing: -0.5, lineHeight: 1, ...clipReveal(f, 0) }}>Dr. Sidharth Pant</p>
      <p style={{ fontSize: 22, color: "rgba(255,255,255,.44)", fontWeight: 400, ...clipReveal(f, 5) }}>MD Radiation Oncology | DrNB Medical Oncology</p>
    </div>
    <div style={{ width: 0, height: 52, borderLeft: "3px solid rgba(123,45,139,.7)", margin: "0 32px", ...scaleYReveal(f, 9) }} />
  </div>
);

const SceneFrame: React.FC<{ frame: number; duration: number; bodyStyle?: React.CSSProperties; children: React.ReactNode }> = ({ frame, duration, bodyStyle, children }) => (
  <AbsoluteFill style={{ opacity: envelope(frame, duration), flexDirection: "column" }}>
    <TopBar f={frame} />
    <div style={{ flex: 1, minHeight: 0, padding: "30px 72px 180px", display: "flex", flexDirection: "column", justifyContent: "center", ...bodyStyle }}>{children}</div>
  </AbsoluteFill>
);

/* ════ S1 — MYTH STAMP ════ */
const SceneMyth: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 44, alignItems: "center" }}>
      <p style={{ fontSize: 26, fontWeight: 700, letterSpacing: 14, textTransform: "uppercase", color: C.amber, fontFamily: HINDI, ...fadeDown(frame, 6) }}>अफवाह #2</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {["M", "Y", "T", "H"].map((ch, i) => (
          <span key={i} style={{ fontSize: 230, fontWeight: 900, color: C.w, letterSpacing: -10, lineHeight: 0.88, display: "inline-block", textShadow: "0 0 80px rgba(123,45,139,.6),0 0 160px rgba(123,45,139,.3)", ...letterDrop(frame, fps, 12 + i * 3) }}>{ch}</span>
        ))}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", ...bounceIn(frame, fps, 27, -45) }}>
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "3px solid rgba(229,57,53,.6)", transform: `scale(${interpolate(frame, [29, 47], [0, 3.5], CL)})`, opacity: interpolate(frame, [29, 47], [0.8, 0], CL) }} />
        <div style={{ fontSize: 140, color: C.red, filter: "drop-shadow(0 0 40px rgba(229,57,53,.8)) drop-shadow(0 0 80px rgba(229,57,53,.4))" }}>✕</div>
      </div>
      <Glass variant="gl" radius={R} style={{ width: "100%", padding: "54px 68px", display: "flex", flexDirection: "column", gap: 22, alignItems: "center", ...slideUp(frame, 33) }}>
        <p style={{ fontFamily: HINDI, fontSize: 62, fontWeight: 900, color: C.w, lineHeight: 1.35, textAlign: "center" }}>Biopsy से <span style={{ color: C.amber }}>Cancer</span> फैलता है?</p>
        <p style={{ fontFamily: HINDI, fontSize: 32, color: "rgba(255,255,255,.52)", textAlign: "center", lineHeight: 1.5, ...fadeUp(frame, 40, 14) }}>यह अफवाह गलत है — और इसे मानना खतरनाक हो सकता है</p>
      </Glass>
      <div style={{ background: "rgba(245,166,35,.14)", border: "2px solid rgba(245,166,35,.42)", borderRadius: 80, padding: "22px 68px", fontSize: 26, fontWeight: 700, color: C.amber, letterSpacing: 4, textTransform: "uppercase", fontFamily: HINDI, ...popScale(frame, fps, 48) }}>जानिए सच क्या है →</div>
    </SceneFrame>
  );
};

/* ════ S2 — COMPARISON ════ */
const CompareBox: React.FC<{ frame: number; delay: number; dir: "l" | "r"; variant: "gl" | "glP"; icon: string; iconBg: string; label: string; lines: string[] }> = ({ frame, delay, dir, variant, icon, iconBg, label, lines }) => (
  <Glass variant={variant} radius={R} style={{ flex: 1, padding: "50px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, ...(dir === "l" ? fadeLeft(frame, delay, 60) : fadeRight(frame, delay, 60)) }}>
    <div style={{ width: 140, height: 140, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68 }}>{icon}</div>
    <p style={{ fontWeight: 800, fontSize: 36, color: C.w, textAlign: "center", lineHeight: 1.2 }}>{label}</p>
    <p style={{ fontSize: 24, color: "rgba(255,255,255,.44)", textAlign: "center", lineHeight: 1.7 }}>{lines.map((l, i) => <React.Fragment key={i}>{l}{i < lines.length - 1 ? <br /> : null}</React.Fragment>)}</p>
  </Glass>
);

const SceneComparison: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  const words = ["Symptoms", "एक", "जैसे", "हो", "सकते", "हैं"];
  const overlap = counter(frame, 42, 39, 78);
  const barW = interpolate(frame, [42, 81], [0, 78], CL);
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 40 }}>
      <p style={{ fontSize: 24, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase", color: "rgba(255,255,255,.34)", textAlign: "center", fontFamily: HINDI, ...fadeDown(frame, 5) }}>यह problem क्यों है?</p>
      <p style={{ fontFamily: HINDI, fontSize: 62, fontWeight: 900, color: C.w, textAlign: "center", lineHeight: 1.2 }}>
        {words.map((w, i) => (
          <span key={i} style={{ display: "inline-block", marginRight: 14, ...fadeLeft(frame, 9 + i * 2.5, 40, 13) }}>{w}</span>
        ))}
      </p>
      <div style={{ display: "flex", gap: 26, alignItems: "stretch" }}>
        <CompareBox frame={frame} delay={21} dir="l" variant="glP" icon="🫁" iconBg="rgba(123,45,139,.5)" label="Lung Cancer" lines={["Persistent cough", "Weight loss", "Chest pain"]} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 84 }}>
          <div style={{ width: 78, height: 78, borderRadius: "50%", background: "linear-gradient(135deg,#F5A623,#e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#000", boxShadow: "0 0 40px rgba(245,166,35,.5)", ...bounceIn(frame, fps, 27, -180) }}>vs</div>
        </div>
        <CompareBox frame={frame} delay={25} dir="r" variant="gl" icon="🦠" iconBg="rgba(255,255,255,.09)" label="Tuberculosis" lines={["Persistent cough", "Weight loss", "Chest pain"]} />
      </div>
      <Glass variant="gl" radius={R} style={{ padding: "46px 56px", display: "flex", flexDirection: "column", gap: 22, ...slideUp(frame, 33) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,.46)", fontWeight: 600 }}>
          <span>Symptom Overlap</span><span style={{ color: C.amber, fontWeight: 800 }}>{overlap}%</span>
        </div>
        <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${barW}%`, borderRadius: 8, background: `linear-gradient(90deg,${C.p},${C.pl},${C.amber})` }} />
        </div>
        <p style={{ fontFamily: HINDI, fontSize: 28, color: "rgba(255,255,255,.58)", textAlign: "center", lineHeight: 1.5, ...fadeUp(frame, 45, 8) }}>इसीलिए Biopsy से confirmatory diagnosis ज़रूरी है</p>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S3 — BIOPSY INFO ════ */
const InfoRow: React.FC<{ frame: number; delay: number; dir: "l" | "r"; icon: string; main: string; sub: string; num: string }> = ({ frame, delay, dir, icon, main, sub, num }) => (
  <Glass variant="gl" radius={R} style={{ padding: "38px 50px", display: "flex", alignItems: "center", gap: 36, ...(dir === "l" ? fadeLeft(frame, delay) : fadeRight(frame, delay)) }}>
    <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(123,45,139,.40)", border: "2px solid rgba(176,110,196,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, flexShrink: 0, boxShadow: "0 0 30px rgba(123,45,139,.35)" }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <p style={{ fontFamily: HINDI, fontSize: 40, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>{main}</p>
      <p style={{ fontSize: 24, color: "rgba(255,255,255,.44)", marginTop: 5 }}>{sub}</p>
    </div>
    <div style={{ fontSize: 100, fontWeight: 900, color: "rgba(123,45,139,.18)", lineHeight: 1, flexShrink: 0 }}>{num}</div>
  </Glass>
);

const SceneInfo: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 30 }}>
    <Glass variant="glP" radius={R} style={{ padding: "46px 56px", display: "flex", alignItems: "center", gap: 36, ...fadeDown(frame, 6, 24) }}>
      <div style={{ fontSize: 68, flexShrink: 0, filter: "drop-shadow(0 0 20px rgba(176,110,196,.7))", transform: `translateY(${wave(frame, 3) * -8}px)` }}>🔬</div>
      <div style={{ fontFamily: HINDI, fontSize: 50, fontWeight: 900, color: C.w, lineHeight: 1.2 }}>Biopsy क्या बताती है?<span style={{ display: "block", fontSize: 26, color: "rgba(255,255,255,.42)", fontWeight: 400, marginTop: 6 }}>3 ज़रूरी जानकारियाँ</span></div>
    </Glass>
    <InfoRow frame={frame} delay={16} dir="l" icon="🔬" main="Cancer का Origin" sub="Primary site की सटीक पहचान" num="1" />
    <InfoRow frame={frame} delay={23} dir="r" icon="🧬" main="Genetic Makeup" sub="Cancer का पूरा molecular profile" num="2" />
    <InfoRow frame={frame} delay={30} dir="l" icon="⚡" main="Mutations की जानकारी" sub="Targeted therapy के लिए ज़रूरी" num="3" />
    <Glass variant="glD" radius={R} style={{ padding: "32px 50px", display: "flex", alignItems: "center", gap: 30, ...slideUp(frame, 38) }}>
      <span style={{ fontSize: 54, filter: "drop-shadow(0 0 16px rgba(176,110,196,.6))", transform: `rotateY(${(frame / 75) * 360}deg)` }}>🧬</span>
      <span style={{ fontFamily: HINDI, fontSize: 28, color: "rgba(255,255,255,.54)", lineHeight: 1.4 }}>Prognosis और Survival Analysis को बेहतर बनाता है</span>
    </Glass>
  </SceneFrame>
);

/* ════ S4 — TREATMENT ════ */
const StatBar: React.FC<{ frame: number; delay: number; label: string; to: number; grad: string; color: string }> = ({ frame, delay, label, to, grad, color }) => {
  const w = interpolate(frame, [delay, delay + 36], [0, to], CL);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: 22, color: "rgba(255,255,255,.5)", width: 200, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: "rgba(255,255,255,.07)", overflow: "hidden" }}><div style={{ height: "100%", width: `${w}%`, borderRadius: 4, background: grad }} /></div>
      <span style={{ fontSize: 22, fontWeight: 700, width: 80, textAlign: "right", flexShrink: 0, color }}>{counter(frame, delay, 36, to)}%</span>
    </div>
  );
};

const SceneTreatment: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  const lines = ["Mutation Makeup से", "Personalized Treatment", "possible है"];
  const dash = interpolate(frame, [51, 99], [1000, 0], CL);
  const dotOp = interpolate(frame, [95, 102], [0, 1], CL);
  const chVal = counter(frame, 51, 45, 68);
  const pill = (active: boolean): React.CSSProperties => ({ padding: "18px 42px", borderRadius: 80, fontSize: 28, fontWeight: active ? 800 : 700, background: active ? "linear-gradient(135deg,#F5A623,#e8920f)" : "rgba(255,255,255,.08)", border: active ? "none" : "1.5px solid rgba(255,255,255,.16)", color: active ? "#000" : "rgba(255,255,255,.76)", boxShadow: active ? "0 8px 32px rgba(245,166,35,.4)" : "none" });
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 40 }}>
      <p style={{ fontSize: 24, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase", color: "rgba(255,255,255,.32)", fontFamily: HINDI, ...fadeDown(frame, 6) }}>आज के ज़माने में</p>
      <p style={{ fontFamily: HINDI, fontSize: 64, fontWeight: 900, color: C.w, lineHeight: 1.25 }}>
        {lines.map((l, i) => (
          <span key={i} style={{ display: "block", ...fadeLeft(frame, 11 + i * 5, 40, 16) }}>{i === 1 ? <span style={{ color: C.amber }}>{l}</span> : l}</span>
        ))}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
        {["Prognosis", "Survival Analysis", "Targeted Therapy"].map((t, i) => (
          <span key={t} style={{ ...pill(false), ...popScale(frame, fps, 27 + i * 4) }}>{t}</span>
        ))}
        <span style={{ ...pill(true), ...popScale(frame, fps, 39) }}>Better Outcomes ↑</span>
      </div>
      <Glass variant="gl" radius={R} style={{ padding: "46px 52px", display: "flex", flexDirection: "column", gap: 22, ...slideUp(frame, 43) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,.48)", letterSpacing: 1 }}>Patient Outcome Trend</span>
          <span style={{ fontSize: 34, fontWeight: 800, color: C.green }}>+{chVal}%</span>
        </div>
        <svg style={{ width: "100%", height: 148 }} viewBox="0 0 952 148" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lg4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7B2D8B" /><stop offset="50%" stopColor="#B06EC4" /><stop offset="100%" stopColor="#F5A623" /></linearGradient>
            <linearGradient id="ag4" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#B06EC4" stopOpacity=".35" /><stop offset="100%" stopColor="#B06EC4" stopOpacity="0" /></linearGradient>
          </defs>
          <path fill="url(#ag4)" opacity={0.12} d="M0,136 C100,130 220,108 400,78 C560,52 740,18 952,5 L952,148 L0,148 Z" />
          <path fill="none" stroke="url(#lg4)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1000} strokeDashoffset={dash} d="M0,136 C100,130 220,108 400,78 C560,52 740,18 952,5" />
          <circle cx={952} cy={5} r={10} fill="#F5A623" opacity={dotOp} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, ...fadeUp(frame, 51, 14) }}>
          <StatBar frame={frame} delay={60} label="Survival Rate" to={84} grad="linear-gradient(90deg,#7B2D8B,#B06EC4)" color={C.pl} />
          <StatBar frame={frame} delay={66} label="Treatment Match" to={91} grad="linear-gradient(90deg,#B06EC4,#F5A623)" color={C.amber} />
        </div>
      </Glass>
    </SceneFrame>
  );
};

/* ════ S5 — EXCEPTION ════ */
const ExItem: React.FC<{ frame: number; delay: number; dir: "l" | "r"; title: string; sub: string; num: string }> = ({ frame, delay, dir, title, sub, num }) => (
  <Glass variant="gl" radius={R} style={{ padding: "38px 50px", display: "flex", alignItems: "flex-start", gap: 30, borderLeft: `5px solid ${C.amber}`, ...(dir === "l" ? fadeLeft(frame, delay, 40) : fadeRight(frame, delay, 40)) }}>
    <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.amber, marginTop: 14, flexShrink: 0, boxShadow: `0 0 ${20 + wave(frame, 2) * 20}px rgba(245,166,35,${0.7 + wave(frame, 2) * 0.3})` }} />
    <div style={{ flex: 1 }}>
      <p style={{ fontFamily: HINDI, fontSize: 42, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>{title}</p>
      <p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 7, lineHeight: 1.4 }}>{sub}</p>
    </div>
    <div style={{ fontSize: 90, fontWeight: 900, color: "rgba(245,166,35,.10)", lineHeight: 1, flexShrink: 0 }}>{num}</div>
  </Glass>
);

const SceneException: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => (
  <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 32 }}>
    <Glass variant="glA" radius={R} style={{ padding: "38px 52px", display: "flex", alignItems: "center", gap: 30, ...fadeLeft(frame, 8, 30) }}>
      <span style={{ fontSize: 62, flexShrink: 0 }}>⚠️</span>
      <div><p style={{ fontFamily: HINDI, fontSize: 54, fontWeight: 900, color: C.amber, lineHeight: 1.1 }}>कुछ Exceptions हैं</p><p style={{ fontSize: 26, color: "rgba(255,255,255,.38)", fontWeight: 500, marginTop: 5 }}>इन cases में biopsy की जगह surgery होती है</p></div>
    </Glass>
    <ExItem frame={frame} delay={20} dir="l" title="Testicular Cancer" sub="Biopsy से disease spread का खतरा — surgery preferred" num="01" />
    <ExItem frame={frame} delay={28} dir="r" title="Early Stage Ovarian Cancer" sub="Surgery से ही diagnosis establish होती है" num="02" />
    <Glass variant="glP" radius={R} style={{ padding: "46px 56px", display: "flex", alignItems: "center", gap: 38, ...slideUp(frame, 39) }}>
      <span style={{ fontSize: 76, flexShrink: 0, filter: "drop-shadow(0 0 28px rgba(123,45,139,.9))", transform: `translateY(${wave(frame, 3) * -10}px)` }}>🏥</span>
      <div><p style={{ fontFamily: HINDI, fontSize: 42, fontWeight: 800, color: C.w, lineHeight: 1.2 }}>Surgery = Direct Diagnosis</p><p style={{ fontSize: 26, color: "rgba(255,255,255,.44)", marginTop: 6, lineHeight: 1.4 }}>इन cases में surgery एक ज़रूरी और safe विकल्प है</p></div>
    </Glass>
  </SceneFrame>
);

/* ════ S6 — FACT ════ */
const SceneFact: React.FC<{ frame: number; duration: number }> = ({ frame, duration }) => {
  const { fps } = useVideoConfig();
  const flines = [
    <>Biopsy से cancer <span style={{ color: C.amber }}>नहीं फैलता</span> —</>,
    <>यह एक ज़रूरी और</>,
    <><span style={{ color: C.amber }}>life-saving</span> diagnosis tool है</>,
  ];
  return (
    <SceneFrame frame={frame} duration={duration} bodyStyle={{ gap: 38, alignItems: "center" }}>
      <div style={{ position: "relative", width: 280, height: 280, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {[0, 1, 2].map((k) => {
          const period = 75;
          const ph = (((frame - k * 24) % period) + period) % period;
          const pp = ph / period;
          return <div key={k} style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "2px solid rgba(46,204,113,.25)", transform: `scale(${interpolate(pp, [0, 1], [0.6, 2])})`, opacity: frame > 8 ? interpolate(pp, [0, 1], [0.8, 0]) : 0 }} />;
        })}
        <div style={{ width: 180, height: 180, borderRadius: "50%", background: "rgba(46,204,113,.10)", border: "3px solid rgba(46,204,113,.30)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, zIndex: 1, boxShadow: "0 0 60px rgba(46,204,113,.25),0 0 120px rgba(46,204,113,.10)", ...bounceIn(frame, fps, 9, -30) }}>✅</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ fontSize: 150, fontWeight: 900, color: C.w, letterSpacing: -8, lineHeight: 0.88, ...fadeLeft(frame, 24, 60) }}>FACT</span>
        <span style={{ fontSize: 100, fontWeight: 900, color: C.green, letterSpacing: -4, lineHeight: 0.88, filter: "drop-shadow(0 0 30px rgba(46,204,113,.6))", ...bounceIn(frame, fps, 30, 20) }}>✓</span>
      </div>
      <p style={{ fontFamily: HINDI, fontSize: 40, fontWeight: 700, color: "rgba(255,255,255,.76)", textAlign: "center", lineHeight: 1.55, padding: "0 20px" }}>
        {flines.map((l, i) => <span key={i} style={{ display: "block", ...fadeUp(frame, 36 + i * 5, 16) }}>{l}</span>)}
      </p>
      <Glass variant="gl" radius={R} style={{ width: "100%", padding: "46px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", ...slideUp(frame, 54) }}>
        <div><p style={{ fontSize: 44, fontWeight: 800, color: C.w }}>Dr. Sidharth Pant</p><p style={{ fontSize: 24, color: "rgba(255,255,255,.42)", marginTop: 8, lineHeight: 1.4 }}>MD Radiation Oncology | DrNB Medical Oncology</p></div>
        <div style={{ width: 5, height: 76, background: `linear-gradient(to bottom,${C.p},${C.pl})`, borderRadius: 3, flexShrink: 0, marginLeft: 24, boxShadow: "0 0 16px rgba(123,45,139,.6)" }} />
      </Glass>
      <Glass variant="glD" radius={R} style={{ width: "100%", padding: "38px 56px", display: "flex", alignItems: "center", gap: 28, ...slideUp(frame, 62) }}>
        <span style={{ fontSize: 50, flexShrink: 0 }}>📞</span>
        <div style={{ fontFamily: HINDI, fontSize: 28, color: "rgba(255,255,255,.52)", lineHeight: 1.5 }}><strong style={{ color: C.w, display: "block", fontSize: 36 }}>735-599-2740</strong>Lucknow Cancer Institute, Manas Nagar, Jiamau</div>
      </Glass>
    </SceneFrame>
  );
};

/* ── chrome ── */
const LBLS = ["Myth", "Comparison", "Biopsy Info", "Treatment", "Exception", "Fact ✓"];
const Progress: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ position: "absolute", top: 0, left: 0, height: 6, width: `${((index + 1) / 6) * 100}%`, background: `linear-gradient(90deg,${C.p},${C.pl},${C.amber})`, boxShadow: "0 0 20px rgba(245,166,35,.5)", zIndex: 500 }} />
);
const Dots: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, zIndex: 500 }}>
    {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i === index ? C.amber : "rgba(255,255,255,.18)", transform: i === index ? "scale(1.6)" : "scale(1)", boxShadow: i === index ? "0 0 16px rgba(245,166,35,.7),0 0 32px rgba(245,166,35,.3)" : "none" }} />)}
  </div>
);
const NavBtn: React.FC<{ disabled?: boolean; children: React.ReactNode }> = ({ disabled, children }) => (
  <div style={{ width: 112, height: 112, borderRadius: "50%", border: "2px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.06)", color: C.w, fontSize: 50, display: "flex", alignItems: "center", justifyContent: "center", opacity: disabled ? 0.16 : 1 }}>{children}</div>
);
const Nav: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, padding: "0 72px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 500 }}>
    <NavBtn disabled={index === 0}>{"‹"}</NavBtn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,.36)", letterSpacing: 4, textTransform: "uppercase", fontFamily: FONT }}>{LBLS[index]}</span>
      <span style={{ fontSize: 42, fontWeight: 800, color: C.w }}>{index + 1}<span style={{ color: "rgba(255,255,255,.26)" }}> / 6</span></span>
    </div>
    <NavBtn disabled={index === 5}>{"›"}</NavBtn>
  </div>
);

/* ── assembly ── */
const SCENES = [
  { start: 0, duration: 135, Comp: SceneMyth },
  { start: 123, duration: 155, Comp: SceneComparison },
  { start: 266, duration: 135, Comp: SceneInfo },
  { start: 389, duration: 170, Comp: SceneTreatment },
  { start: 547, duration: 145, Comp: SceneException },
  { start: 680, duration: 170, Comp: SceneFact },
] as const;

export const PREMIUM_DURATION = 850;
const BOUNDS = [129, 272, 395, 553, 686];
const currentIndex = (frame: number) => {
  for (let i = 0; i < BOUNDS.length; i++) if (frame < BOUNDS[i]) return i;
  return 5;
};

export const BiopsyPremiumReel: React.FC = () => {
  const frame = useCurrentFrame();
  const index = currentIndex(frame);
  return (
    <AbsoluteFill style={{ background: "#060010", fontFamily: FONT }}>
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
