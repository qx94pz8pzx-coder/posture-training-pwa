import type { ReactNode } from 'react';
import type { HabitIllustrationType } from '../types';

interface HabitIllustrationProps {
  type: HabitIllustrationType;
  compact?: boolean;
}

const ink = '#735847';
const soft = '#d9c3ad';
const accent = '#789589';
const warn = '#c99591';

function L({ x1, y1, x2, y2, color = ink, width = 4 }: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />;
}

function Head({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="7" fill="#fffaf2" stroke={ink} strokeWidth="3" />;
}

function Shell({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <svg viewBox="0 0 180 112" role="img" aria-label="生活场景简笔画提醒卡" className={`habit-illustration ${compact ? 'compact' : ''}`}>
      <rect x="6" y="6" width="168" height="100" rx="12" fill="#fffaf2" />
      {children}
    </svg>
  );
}

export function HabitIllustration({ type, compact = false }: HabitIllustrationProps) {
  switch (type) {
    case 'phone':
      return (
        <Shell compact={compact}>
          <Head x={74} y={38} />
          <L x1={74} y1={47} x2={72} y2={76} />
          <L x1={72} y1={58} x2={100} y2={50} color={accent} />
          <rect x="102" y="39" width="20" height="30" rx="4" fill="none" stroke={accent} strokeWidth="3" />
          <path d="M42 34 C58 50 66 66 70 84" stroke={warn} strokeWidth="3" fill="none" strokeDasharray="5 5" />
          <text x="28" y="96" fill={accent} fontSize="11" fontWeight="700">手机抬高</text>
        </Shell>
      );
    case 'sitting':
      return (
        <Shell compact={compact}>
          <Head x={76} y={36} />
          <L x1={76} y1={45} x2={76} y2={72} />
          <L x1={76} y1={72} x2={110} y2={72} />
          <L x1={110} y1={72} x2={110} y2={96} />
          <L x1={46} y1={76} x2={126} y2={76} color={soft} />
          <L x1={52} y1={76} x2={52} y2={99} color={soft} />
          <L x1={124} y1={76} x2={124} y2={99} color={soft} />
          <text x="28" y="24" fill={accent} fontSize="11" fontWeight="700">双脚踩地</text>
        </Shell>
      );
    case 'standing':
      return (
        <Shell compact={compact}>
          <Head x={86} y={28} />
          <L x1={86} y1={37} x2={86} y2={68} />
          <L x1={86} y1={68} x2={74} y2={98} />
          <L x1={86} y1={68} x2={100} y2={98} />
          <path d="M115 72 C128 78 129 92 116 98" stroke={warn} strokeWidth="3" fill="none" strokeDasharray="5 5" />
          <text x="28" y="24" fill={accent} fontSize="11" fontWeight="700">膝盖微松</text>
        </Shell>
      );
    case 'camera':
      return (
        <Shell compact={compact}>
          <rect x="116" y="42" width="34" height="26" rx="6" fill="none" stroke={accent} strokeWidth="3" />
          <circle cx="132" cy="55" r="6" fill="none" stroke={accent} strokeWidth="3" />
          <Head x={70} y={35} />
          <L x1={70} y1={44} x2={70} y2={76} />
          <L x1={70} y1={55} x2={54} y2={68} />
          <L x1={70} y1={55} x2={91} y2={66} />
          <text x="28" y="96" fill={accent} fontSize="11" fontWeight="700">30秒预备</text>
        </Shell>
      );
    case 'cross_leg':
      return (
        <Shell compact={compact}>
          <Head x={76} y={34} />
          <L x1={76} y1={43} x2={76} y2={70} />
          <L x1={76} y1={70} x2={114} y2={82} color={warn} />
          <L x1={76} y1={70} x2={50} y2={88} />
          <L x1={50} y1={88} x2={116} y2={88} color={soft} />
          <text x="24" y="24" fill={accent} fontSize="11" fontWeight="700">10分钟换边</text>
        </Shell>
      );
    case 'bed_gaming':
      return (
        <Shell compact={compact}>
          <L x1={28} y1={86} x2={152} y2={86} color={soft} width={7} />
          <Head x={68} y={45} />
          <L x1={68} y1={54} x2={80} y2={78} />
          <L x1={80} y1={64} x2={118} y2={56} color={accent} />
          <rect x="120" y="48" width="24" height="18" rx="4" fill="none" stroke={accent} strokeWidth="3" />
          <text x="24" y="24" fill={accent} fontSize="11" fontWeight="700">垫腰抬屏</text>
        </Shell>
      );
    case 'walking':
      return (
        <Shell compact={compact}>
          <Head x={76} y={30} />
          <L x1={76} y1={39} x2={76} y2={68} />
          <L x1={76} y1={68} x2={56} y2={96} />
          <L x1={76} y1={68} x2={104} y2={92} />
          <path d="M116 60 C142 64 150 78 140 94" stroke={accent} strokeWidth="3" fill="none" />
          <text x="26" y="24" fill={accent} fontSize="11" fontWeight="700">膝对脚尖</text>
        </Shell>
      );
    case 'nutrition':
      return (
        <Shell compact={compact}>
          <circle cx="82" cy="62" r="30" fill="none" stroke={soft} strokeWidth="5" />
          <path d="M62 62 H102" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <path d="M82 42 V82" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <L x1={124} y1={36} x2={124} y2={91} color={ink} />
          <L x1={136} y1={36} x2={136} y2={91} color={ink} />
          <text x="24" y="24" fill={accent} fontSize="11" fontWeight="700">吃够蛋白</text>
        </Shell>
      );
    default:
      return null;
  }
}
