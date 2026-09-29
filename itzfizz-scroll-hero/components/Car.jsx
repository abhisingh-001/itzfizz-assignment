// Top-view sports car, drawn as SVG so there's no image to download.
// Faces right (nose on the +x side) because it drives left -> right.
export default function Car() {
  return (
    <svg
      viewBox="0 0 420 170"
      className="h-full w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.65)]"
      role="img"
      aria-label="Orange sports car seen from above"
    >
      <defs>
        <linearGradient id="paint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9200a" />
          <stop offset="0.55" stopColor="#ff5a1f" />
          <stop offset="1" stopColor="#ff8a3d" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2230" />
          <stop offset="1" stopColor="#05070b" />
        </linearGradient>
      </defs>

      {/* wheels */}
      <g fill="#0b0b0d">
        <rect x="82" y="6" width="62" height="26" rx="9" />
        <rect x="82" y="138" width="62" height="26" rx="9" />
        <rect x="286" y="6" width="62" height="26" rx="9" />
        <rect x="286" y="138" width="62" height="26" rx="9" />
      </g>

      {/* body */}
      <path
        d="M20 85 C20 55 45 38 90 34 L250 30 C300 30 350 42 395 70
           C405 77 405 93 395 100 C350 128 300 140 250 140
           L90 136 C45 132 20 115 20 85 Z"
        fill="url(#paint)"
      />

      {/* centre stripe */}
      <rect x="24" y="82" width="370" height="6" fill="#0d0d10" opacity="0.55" />

      {/* rear wing */}
      <rect x="18" y="42" width="20" height="86" rx="4" fill="#111114" />

      {/* cabin + windshield */}
      <path
        d="M150 52 L232 48 C252 48 264 62 266 85 C264 108 252 122 232 122
           L150 118 C138 112 132 98 132 85 C132 72 138 58 150 52 Z"
        fill="url(#glass)"
      />
      <rect x="160" y="60" width="52" height="50" rx="14" fill="#ff5a1f" opacity="0.9" />

      {/* mirrors */}
      <ellipse cx="256" cy="30" rx="10" ry="5" fill="#d94413" />
      <ellipse cx="256" cy="140" rx="10" ry="5" fill="#d94413" />

      {/* lights */}
      <polygon points="372,60 396,68 396,74 374,70" fill="#fff4d0" />
      <polygon points="372,110 396,102 396,96 374,100" fill="#fff4d0" />
      <rect x="20" y="58" width="6" height="16" rx="2" fill="#ff1d1d" />
      <rect x="20" y="96" width="6" height="16" rx="2" fill="#ff1d1d" />
    </svg>
  );
}
