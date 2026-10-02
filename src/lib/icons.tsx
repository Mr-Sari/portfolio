import type { SVGProps } from 'react';
import type { BrandIconData } from './brandIcons';
import {
  siAnthropic,
  siDatacamp,
  siDocker,
  siDuckdb,
  siGit,
  siGithub,
  siGoogle,
  siGradio,
  siJavascript,
  siLangchain,
  siOpencv,
  siPandas,
  siPydantic,
  siPython,
  siSap,
  siSqlite,
  siStreamlit,
  siTypescript,
} from './brandIcons';
import {
  Bot,
  Brain,
  ChartColumnBig,
  Database,
  Eye,
  FileSpreadsheet,
  Gauge,
  Layers,
  LayoutDashboard,
  MessageSquareText,
  Network,
  Regex,
  ScanSearch,
  Search,
  Sparkles,
  Table2,
  Terminal,
  Workflow,
  Boxes,
  Sigma,
  ListFilter,
  type LucideIcon,
} from 'lucide-react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function brand(icon: BrandIconData) {
  function BrandIcon({ size = 20, ...props }: IconProps) {
    return (
      <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
        <path d={icon.path} />
      </svg>
    );
  }
  BrandIcon.displayName = `Brand(${icon.title})`;
  return BrandIcon;
}

function lucide(Icon: LucideIcon) {
  function Wrapped({ size = 20, ...props }: IconProps) {
    return <Icon size={size} strokeWidth={1.75} aria-hidden="true" {...(props as object)} />;
  }
  Wrapped.displayName = `Lucide(${Icon.displayName ?? 'icon'})`;
  return Wrapped;
}

/** Text monogram for organisations without a permissively licensed logo. */
function monogram(text: string) {
  function Mono({ size = 20, ...props }: IconProps) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} {...props}>
        <text
          x="12"
          y="12.5"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="700"
          fontSize={text.length > 3 ? 7.5 : text.length > 2 ? 9.5 : 11.5}
          letterSpacing={text.length > 2 ? -0.4 : 0}
          fill="currentColor"
        >
          {text}
        </text>
      </svg>
    );
  }
  Mono.displayName = `Monogram(${text})`;
  return Mono;
}

export function LinkedInIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export const GitHubIcon = brand(siGithub);

const registry = {
  python: brand(siPython),
  sql: lucide(Database),
  javascript: brand(siJavascript),
  typescript: brand(siTypescript),
  regex: lucide(Regex),
  brain: lucide(Brain),
  network: lucide(Network),
  message: lucide(MessageSquareText),
  eye: lucide(Eye),
  scan: lucide(ScanSearch),
  yolo: monogram('YOLO'),
  layers: lucide(Layers),
  opencv: brand(siOpencv),
  sparkles: lucide(Sparkles),
  search: lucide(Search),
  terminal: lucide(Terminal),
  langchain: brand(siLangchain),
  database: lucide(Database),
  bot: lucide(Bot),
  claude: brand(siAnthropic),
  pydantic: brand(siPydantic),
  workflow: lucide(Workflow),
  pandas: brand(siPandas),
  duckdb: brand(siDuckdb),
  sqlite: brand(siSqlite),
  table: lucide(Table2),
  powerbi: lucide(ChartColumnBig),
  excel: lucide(FileSpreadsheet),
  sap: brand(siSap),
  gauge: lucide(Gauge),
  dashboard: lucide(LayoutDashboard),
  docker: brand(siDocker),
  git: brand(siGit),
  github: GitHubIcon,
  streamlit: brand(siStreamlit),
  gradio: brand(siGradio),
  datacamp: brand(siDatacamp),
  google: brand(siGoogle),
  ibm: monogram('IBM'),
  deeplearningai: monogram('DL'),
  sigma: lucide(Sigma),
  filter: lucide(ListFilter),
  fallback: lucide(Boxes),
} as const;

export function TechIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = registry[name as keyof typeof registry] ?? registry.fallback;
  return <Icon {...props} />;
}
