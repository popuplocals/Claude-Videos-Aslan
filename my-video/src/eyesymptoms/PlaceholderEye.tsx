// Temporary placeholder "eye photo" (replace public/eye.jpg with the real image).
import React from "react";
import { AbsoluteFill } from "remotion";

export const PlaceholderEye: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, #d9b8ab 0%, #c99a8c 40%, #9c6455 100%)" }}>
    {/* redness wash */}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 45% at 50% 50%, rgba(200,60,50,0.35), transparent 70%)" }} />
    {/* sclera almond */}
    <div style={{ position: "absolute", left: "6%", right: "6%", top: "32%", bottom: "32%", borderRadius: "50%", background: "radial-gradient(ellipse at center, #f4e9e3 0%, #e7cfc6 70%, #d0a99c 100%)", boxShadow: "inset 0 0 80px rgba(150,40,40,0.35)" }} />
    {/* iris */}
    <div style={{ position: "absolute", left: "50%", top: "45%", width: 470, height: 470, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, #4a2c17 0%, #7a4a26 45%, #b07a44 70%, #5c3a1f 100%)", boxShadow: "0 0 40px rgba(0,0,0,0.4)" }} />
    {/* pupil */}
    <div style={{ position: "absolute", left: "50%", top: "45%", width: 170, height: 170, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "#100a0a" }} />
    {/* catch-light */}
    <div style={{ position: "absolute", left: "44%", top: "38%", width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.85)", filter: "blur(4px)" }} />
  </AbsoluteFill>
);
