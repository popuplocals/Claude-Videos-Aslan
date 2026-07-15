import React from "react";

/**
 * Minimalist line-art eye. `irisColor` is animated by the caller
 * (white → coral) to suggest redness appearing.
 */
export const EyeIcon: React.FC<{
  size?: number;
  stroke: string;
  irisColor: string;
  pupil?: string;
  strokeWidth?: number;
}> = ({ size = 320, stroke, irisColor, pupil = "#0B4F4A", strokeWidth = 6 }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 100 62" fill="none">
    {/* upper + lower lids */}
    <path
      d="M4,31 Q50,-2 96,31 Q50,64 4,31 Z"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* iris (tintable) */}
    <circle cx={50} cy={31} r={17} fill={irisColor} />
    {/* pupil */}
    <circle cx={50} cy={31} r={7.5} fill={pupil} />
    {/* catch-light */}
    <circle cx={45} cy={26} r={2.6} fill="#FDF8F0" opacity={0.9} />
    {/* iris outline for definition */}
    <circle cx={50} cy={31} r={17} fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.5} opacity={0.35} />
  </svg>
);
