import type { Project } from '../data/types';

/**
 * Abstract, code-drawn illustration for each project type. Used instead of
 * screenshots, since the CV provides no project imagery.
 */
export function ProjectVisual({ visual, className = '' }: { visual: Project['visual']; className?: string }) {
  return (
    <div aria-hidden className={`relative overflow-hidden bg-grid ${className}`} style={{ backgroundSize: '22px 22px' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,var(--accent-glow),transparent_65%)]" />
      <svg viewBox="0 0 320 160" className="relative h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {motifs[visual]}
      </svg>
    </div>
  );
}

const A = 'var(--accent)';
const L = 'var(--fg-subtle)';
const F = 'var(--bg-elevated)';

const motifs: Record<Project['visual'], React.ReactNode> = {
  rag: (
    <g strokeWidth="1.5">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${34 + i * 8} ${38 + i * 8})`}>
          <rect width="52" height="66" rx="6" fill={F} stroke={L} strokeOpacity=".5" />
          <path d="M10 16h32M10 26h26M10 36h30M10 46h20" stroke={L} strokeOpacity=".5" />
        </g>
      ))}
      <path d="M112 86h30" stroke={A} strokeDasharray="3 4" />
      {[...Array(12)].map((_, i) => (
        <circle key={i} cx={158 + (i % 4) * 14} cy={62 + Math.floor(i / 4) * 16} r="3.2" fill={i === 5 || i === 10 ? A : L} fillOpacity={i === 5 || i === 10 ? 1 : 0.35} />
      ))}
      <path d="M216 86h22" stroke={A} strokeDasharray="3 4" />
      <rect x="244" y="54" width="54" height="26" rx="10" fill={F} stroke={L} strokeOpacity=".5" />
      <rect x="244" y="88" width="54" height="26" rx="10" fill={A} fillOpacity=".14" stroke={A} />
      <path d="M254 101h26" stroke={A} />
    </g>
  ),
  resume: (
    <g strokeWidth="1.5">
      <rect x="44" y="24" width="84" height="112" rx="8" fill={F} stroke={L} strokeOpacity=".5" />
      <circle cx="64" cy="46" r="8" stroke={L} strokeOpacity=".6" />
      <path d="M80 42h34M80 51h22M58 72h56M58 82h48M58 92h52M58 108h40M58 118h46" stroke={L} strokeOpacity=".45" />
      <path d="M142 80c20 0 22-30 42-30M142 80c20 0 22 30 42 30" stroke={A} strokeDasharray="3 4" />
      <rect x="192" y="30" width="92" height="40" rx="8" fill={F} stroke={L} strokeOpacity=".5" />
      <rect x="192" y="90" width="92" height="40" rx="8" fill={A} fillOpacity=".12" stroke={A} />
      <path d="M204 46h40M204 56h28" stroke={L} strokeOpacity=".5" />
      <path d="M204 104l6 6 12-12" stroke={A} strokeWidth="2" />
      <path d="M230 106h40M230 116h26" stroke={A} strokeOpacity=".6" />
    </g>
  ),
  vision: (
    <g strokeWidth="1.5">
      <path d="M52 110l18-34c4-8 10-12 20-12h112c10 0 18 4 24 12l26 34" stroke={L} strokeOpacity=".6" />
      <rect x="40" y="108" width="240" height="22" rx="8" fill={F} stroke={L} strokeOpacity=".6" />
      <circle cx="92" cy="134" r="13" fill={F} stroke={L} strokeOpacity=".6" />
      <circle cx="232" cy="134" r="13" fill={F} stroke={L} strokeOpacity=".6" />
      <rect x="170" y="70" width="62" height="52" rx="3" stroke={A} strokeWidth="1.8" strokeDasharray="5 3" />
      <rect x="170" y="56" width="58" height="14" rx="3" fill={A} />
      <text x="175" y="66" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="var(--accent-fg)">damage</text>
      <rect x="62" y="84" width="56" height="40" rx="3" stroke={L} strokeOpacity=".8" strokeDasharray="5 3" />
      <text x="64" y="80" fontSize="8" fontFamily="JetBrains Mono, monospace" fill={L}>part</text>
    </g>
  ),
  platform: (
    <g strokeWidth="1.5">
      <rect x="40" y="24" width="240" height="116" rx="10" fill={F} stroke={L} strokeOpacity=".5" />
      <path d="M40 44h240" stroke={L} strokeOpacity=".4" />
      <path d="M100 44v96" stroke={L} strokeOpacity=".3" />
      <path d="M54 60h30M54 74h24M54 88h28M54 102h20" stroke={L} strokeOpacity=".45" />
      <rect x="114" y="56" width="152" height="18" rx="9" stroke={A} />
      <circle cx="126" cy="65" r="4" stroke={A} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={114 + i * 52} y="86" width="46" height="40" rx="6" fill={i === 0 ? A : 'none'} fillOpacity=".12" stroke={i === 0 ? A : L} strokeOpacity={i === 0 ? 1 : 0.4} />
          <path d={`M${122 + i * 52} 100h26M${122 + i * 52} 110h18`} stroke={i === 0 ? A : L} strokeOpacity=".6" />
        </g>
      ))}
    </g>
  ),
  dashboard: (
    <g strokeWidth="1.5">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 82} y="22" width="74" height="34" rx="7" fill={F} stroke={L} strokeOpacity=".45" />
          <path d={`M${50 + i * 82} 34h24`} stroke={L} strokeOpacity=".5" />
          <path d={`M${50 + i * 82} 45h${34 - i * 6}`} stroke={i === 0 ? A : 'var(--fg)'} strokeWidth="3" strokeOpacity={i === 0 ? 1 : 0.55} />
        </g>
      ))}
      <rect x="40" y="66" width="240" height="72" rx="8" fill={F} stroke={L} strokeOpacity=".45" />
      {[26, 38, 30, 48, 42, 56, 50, 62, 58].map((h, i) => (
        <rect key={i} x={56 + i * 24} y={128 - h} width="12" height={h} rx="2.5" fill={i === 7 ? A : L} fillOpacity={i === 7 ? 1 : 0.28} />
      ))}
    </g>
  ),
  reporting: (
    <g strokeWidth="1.5">
      {[2, 1, 0].map((i) => (
        <rect key={i} x={70 + i * 12} y={20 + i * 8} width="150" height="112" rx="8" fill={F} stroke={L} strokeOpacity={0.3 + (2 - i) * 0.15} />
      ))}
      <path d="M84 44h60M84 54h40" stroke={L} strokeOpacity=".55" />
      <path d="M84 116l24-18 20 8 26-26 24 12 26-22" stroke={A} strokeWidth="2" />
      <circle cx="204" cy="70" r="3.5" fill={A} />
      <rect x="234" y="70" width="52" height="52" rx="26" stroke={L} strokeOpacity=".45" />
      <path d="M260 70a26 26 0 0 1 24 34" stroke={A} strokeWidth="5" />
    </g>
  ),
  pipeline: (
    <g strokeWidth="1.5">
      {['raw', 'parse', 'duckdb'].map((label, i) => (
        <g key={label}>
          <rect x={30 + i * 96} y="58" width="72" height="44" rx="9" fill={i === 2 ? A : F} fillOpacity={i === 2 ? 0.12 : 1} stroke={i === 2 ? A : L} strokeOpacity={i === 2 ? 1 : 0.5} />
          <text x={66 + i * 96} y="84" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={i === 2 ? A : L}>
            {label}
          </text>
          {i < 2 && <path d={`M${106 + i * 96} 80h18m-5-5 5 5-5 5`} stroke={A} />}
        </g>
      ))}
      <path d="M66 58V40h192v18" stroke={L} strokeOpacity=".35" strokeDasharray="3 4" />
      <text x="162" y="34" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill={L}>hourly</text>
      <rect x="138" y="118" width="48" height="18" rx="4" stroke={L} strokeOpacity=".45" />
      <text x="162" y="130" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill={L}>docker</text>
    </g>
  ),
  timeseries: (
    <g strokeWidth="1.5">
      <path d="M32 130h256M32 30v100" stroke={L} strokeOpacity=".35" />
      <path d="M32 104c18 0 22-40 40-40s22 34 40 34 22-52 40-52 22 44 40 44 22-30 40-30 22 22 40 22" stroke={A} strokeWidth="2" />
      {[
        [72, 64],
        [152, 46],
        [232, 68],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="5" fill={F} stroke={A} strokeWidth="2" />
          <path d={`M${x} ${y + 8}v${122 - y - 8}`} stroke={A} strokeOpacity=".3" strokeDasharray="2 3" />
        </g>
      ))}
      {[112, 192, 272].map((x) => (
        <circle key={x} cx={x} cy={x === 112 ? 98 : x === 192 ? 90 : 82} r="3.5" fill={L} fillOpacity=".5" />
      ))}
    </g>
  ),
};
