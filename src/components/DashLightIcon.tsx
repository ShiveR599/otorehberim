import type { ReactElement, SVGProps } from "react";

/** Dashboard-style vector icons. Stroke uses currentColor so severity color applies. */
type IconProps = SVGProps<SVGSVGElement>;

const S = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

const Icons: Record<string, (p: IconProps) => ReactElement> = {
  "check-engine": (p) => (
    <svg {...S(p)}>
      <path d="M5 10h2V8h3v2h4l2-2h2v3h2v4h-2v3h-2l-2-2h-4v2H7v-2H5z" />
      <path d="M9 13h4" />
    </svg>
  ),
  "oil-pressure": (p) => (
    <svg {...S(p)}>
      <path d="M4 14c0-3 3-5 6-5h3l4-3v4h2v3l-3 2H9c-3 0-5 1-5 3z" />
      <path d="M8 18c1-2 3-2 4 0" />
    </svg>
  ),
  temp: (p) => (
    <svg {...S(p)}>
      <path d="M12 3a2 2 0 0 0-2 2v9a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      <path d="M3 8h3M3 12h3M3 16h3" />
    </svg>
  ),
  battery: (p) => (
    <svg {...S(p)}>
      <rect x="3" y="7" width="16" height="11" rx="1.5" />
      <path d="M19 10h2v5h-2M7 12h2M8 11v2M14 12h2" />
      <path d="M6 5h4M14 5h4" />
    </svg>
  ),
  brake: (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="6" />
      <path d="M4 12a8 8 0 0 1 2-5M20 12a8 8 0 0 0-2-5M4 12a8 8 0 0 0 2 5M20 12a8 8 0 0 1-2 5" />
      <path d="M12 8v4" /><circle cx="12" cy="15" r="0.8" fill="currentColor" />
    </svg>
  ),
  abs: (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="6" />
      <path d="M4 12a8 8 0 0 1 2-5M20 12a8 8 0 0 0-2-5M4 12a8 8 0 0 0 2 5M20 12a8 8 0 0 1-2 5" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor" stroke="none">ABS</text>
    </svg>
  ),
  airbag: (p) => (
    <svg {...S(p)}>
      <circle cx="9" cy="9" r="3" />
      <path d="M9 12v2h3l7 5h-7c-4 0-6-2-6-5" />
    </svg>
  ),
  seatbelt: (p) => (
    <svg {...S(p)}>
      <circle cx="10" cy="7" r="2.5" />
      <path d="M6 20l4-10 4 10M14 10l4 10" />
    </svg>
  ),
  tpms: (p) => (
    <svg {...S(p)}>
      <path d="M4 16c0-4 3-8 8-8s8 4 8 8" />
      <path d="M4 16h3M17 16h3" />
      <path d="M12 11v3" /><circle cx="12" cy="16" r="0.9" fill="currentColor" />
    </svg>
  ),
  esp: (p) => (
    <svg {...S(p)}>
      <path d="M5 14c1.5-1 2.5-1 4 0s2.5 1 4 0 2.5-1 4 0" />
      <rect x="6" y="7" width="12" height="5" rx="1.5" />
      <circle cx="9" cy="14.5" r="1" fill="currentColor" />
      <circle cx="15" cy="14.5" r="1" fill="currentColor" />
      <text x="12" y="20.5" textAnchor="middle" fontSize="3.5" fontWeight="700" fill="currentColor" stroke="none">ESP</text>
    </svg>
  ),
  dpf: (p) => (
    <svg {...S(p)}>
      <rect x="3" y="9" width="14" height="6" rx="1" />
      <path d="M17 12h2M6 9v6M10 9v6M14 9v6" />
      <path d="M20 8c1 1 1 2 0 3M20 13c1 1 1 2 0 3" />
    </svg>
  ),
  glow: (p) => (
    <svg {...S(p)}>
      <path d="M6 8h8a4 4 0 0 1 0 8H8" />
      <path d="M6 8v8M18 10l2 2-2 2" />
    </svg>
  ),
  "coolant-low": (p) => (
    <svg {...S(p)}>
      <path d="M12 4v8" />
      <path d="M8 12h8l-2 5H10z" />
      <path d="M5 19c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0" />
    </svg>
  ),
  "fuel-low": (p) => (
    <svg {...S(p)}>
      <rect x="4" y="4" width="10" height="16" rx="1" />
      <path d="M14 8h2l2 2v6a1.5 1.5 0 0 1-3 0v-3h-1" />
      <path d="M6 8h6" />
    </svg>
  ),
  adblue: (p) => (
    <svg {...S(p)}>
      <path d="M12 3l5 8a5 5 0 1 1-10 0z" />
      <text x="12" y="15" textAnchor="middle" fontSize="4" fontWeight="700" fill="currentColor" stroke="none">AdBlue</text>
    </svg>
  ),
  washer: (p) => (
    <svg {...S(p)}>
      <path d="M4 12c3-4 13-4 16 0" />
      <path d="M4 12v3h16v-3" />
      <path d="M8 18l-1 3M12 18v3M16 18l1 3" />
    </svg>
  ),
  door: (p) => (
    <svg {...S(p)}>
      <path d="M4 20V9l6-4h6v15" />
      <path d="M4 20h16" />
      <circle cx="13" cy="13" r="0.8" fill="currentColor" />
    </svg>
  ),
  "beam-low": (p) => (
    <svg {...S(p)}>
      <path d="M4 6a5 5 0 0 1 5-3h1v14H9a5 5 0 0 1-5-3z" />
      <path d="M14 7l6-1M14 11l6 0M14 15l6 1" />
    </svg>
  ),
  "beam-high": (p) => (
    <svg {...S(p)}>
      <path d="M4 6a5 5 0 0 1 5-3h1v14H9a5 5 0 0 1-5-3z" />
      <path d="M14 6h6M14 10h6M14 14h6M14 18h6" />
    </svg>
  ),
  "fog-front": (p) => (
    <svg {...S(p)}>
      <path d="M4 6a5 5 0 0 1 5-3h1v14H9a5 5 0 0 1-5-3z" />
      <path d="M14 6h6M14 10h6M14 14h6" />
      <path d="M13 17c2-1 4 1 6 0" />
    </svg>
  ),
  "fog-rear": (p) => (
    <svg {...S(p)}>
      <path d="M20 6a5 5 0 0 0-5-3h-1v14h1a5 5 0 0 0 5-3z" />
      <path d="M10 6H4M10 10H4M10 14H4" />
      <path d="M11 17c-2-1-4 1-6 0" />
    </svg>
  ),
  immobilizer: (p) => (
    <svg {...S(p)}>
      <circle cx="8" cy="12" r="3" />
      <path d="M11 12h9M17 12v3M20 12v2" />
    </svg>
  ),
  cruise: (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 12l4-3" />
      <path d="M12 5v1M19 12h-1M12 19v-1M5 12h1" />
    </svg>
  ),
  "auto-hold": (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="7" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" stroke="none">A</text>
      <path d="M6 6l12 12" />
    </svg>
  ),
  "start-stop": (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="7" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">A</text>
      <path d="M17 7l-2 3" />
    </svg>
  ),
  steering: (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 14v5M10 12H5M14 12h5" />
    </svg>
  ),
  "trans-temp": (p) => (
    <svg {...S(p)}>
      <circle cx="10" cy="12" r="4" />
      <path d="M10 8v-2M10 18v-2M6 12H4M16 12h-2" />
      <path d="M19 4v10a2 2 0 1 0 2 0V4z" />
    </svg>
  ),
  handbrake: (p) => (
    <svg {...S(p)}>
      <circle cx="12" cy="12" r="6" />
      <path d="M4 12a8 8 0 0 1 2-5M20 12a8 8 0 0 0-2-5M4 12a8 8 0 0 0 2 5M20 12a8 8 0 0 1-2 5" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">P</text>
    </svg>
  ),
  "hybrid-ready": (p) => (
    <svg {...S(p)}>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <text x="12" y="14.5" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" stroke="none">READY</text>
    </svg>
  ),
  "ev-charge": (p) => (
    <svg {...S(p)}>
      <path d="M9 3v3M15 3v3" />
      <rect x="7" y="6" width="10" height="8" rx="2" />
      <path d="M12 14v4M10 20h4" />
    </svg>
  ),
};

const Fallback = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M12 3l10 17H2z" />
    <path d="M12 10v5" />
    <circle cx="12" cy="18" r="0.9" fill="currentColor" />
  </svg>
);

export function DashLightIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = Icons[name] ?? Fallback;
  return <Cmp className={className} width={40} height={40} aria-hidden />;
}
