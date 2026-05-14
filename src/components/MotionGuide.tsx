import type { ReactNode } from 'react';

type MotionGuideProps = {
  type: string;
  labels?: string[];
  compact?: boolean;
};

const ink = '#735847';
const soft = '#d9c3ad';
const accent = '#789589';
const guide = '#c99591';

function Line({
  x1,
  y1,
  x2,
  y2,
  color = ink,
  width = 4,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dash?: string;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />;
}

function Head({ x, y, muted = false }: { x: number; y: number; muted?: boolean }) {
  return <circle cx={x} cy={y} r="7" fill="#fffaf2" stroke={muted ? soft : ink} strokeWidth="3" />;
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI * 0.78;
  const a2 = angle - Math.PI * 0.78;
  const len = 8;
  return (
    <g stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 14} ${x2} ${y2}`} />
      <path d={`M${x2} ${y2} L${x2 + Math.cos(a1) * len} ${y2 + Math.sin(a1) * len}`} />
      <path d={`M${x2} ${y2} L${x2 + Math.cos(a2) * len} ${y2 + Math.sin(a2) * len}`} />
    </g>
  );
}

function FrameLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect x={x - 5} y={y - 12} width={Math.max(34, text.length * 12 + 10)} height="20" rx="10" fill="#edf4ef" />
      <text x={x} y={y + 2} fill="#526f63" fontSize="11" fontWeight="700">
        {text}
      </text>
    </g>
  );
}

function Shell({ children, labels = [], compact = false }: { children: ReactNode; labels?: string[]; compact?: boolean }) {
  return (
    <svg viewBox="0 0 210 132" role="img" aria-label="极简动作轨迹线稿" className={`motion-guide ${compact ? 'compact' : ''}`}>
      <rect x="6" y="6" width="198" height="120" rx="12" fill="#fffaf2" />
      <path d="M18 106 C50 94 78 111 105 101 S160 91 192 104" stroke="#efe0cd" strokeWidth="7" fill="none" />
      {children}
      {labels.slice(0, 3).map((label, index) => (
        <FrameLabel key={label} x={18 + index * 62} y={22} text={label} />
      ))}
    </svg>
  );
}

function SupineBridge({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={38} y={84} muted />
      <Line x1={46} y1={85} x2={82} y2={85} color={soft} />
      <Line x1={82} y1={85} x2={106} y2={67} color={soft} />
      <Line x1={106} y1={67} x2={132} y2={88} color={soft} />
      <Head x={38} y={86} />
      <Line x1={47} y1={86} x2={77} y2={86} />
      <Line x1={77} y1={86} x2={111} y2={58} />
      <Line x1={111} y1={58} x2={142} y2={86} />
      <Line x1={142} y1={86} x2={160} y2={86} />
      <Arrow x1={101} y1={78} x2={111} y2={58} />
    </Shell>
  );
}

function SupineCore({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={44} y={86} />
      <Line x1={52} y1={88} x2={108} y2={88} />
      <Line x1={70} y1={84} x2={58} y2={55} />
      <Line x1={88} y1={84} x2={110} y2={57} />
      <Line x1={108} y1={88} x2={132} y2={62} />
      <Line x1={132} y1={62} x2={156} y2={73} />
      <Line x1={108} y1={88} x2={132} y2={106} />
      <Line x1={70} y1={84} x2={38} y2={60} color={guide} dash="5 5" />
      <Line x1={132} y1={62} x2={168} y2={46} color={guide} dash="5 5" />
      <Arrow x1={116} y1={62} x2={160} y2={48} />
    </Shell>
  );
}

function StandingPosture({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Line x1={62} y1={38} x2={62} y2={106} color={soft} />
      <Head x={92} y={42} />
      <Line x1={92} y1={51} x2={92} y2={82} />
      <Line x1={92} y1={60} x2={70} y2={72} />
      <Line x1={92} y1={60} x2={114} y2={72} />
      <Line x1={92} y1={82} x2={80} y2={112} />
      <Line x1={92} y1={82} x2={106} y2={112} />
      <Head x={116} y={42} muted />
      <Line x1={116} y1={51} x2={116} y2={82} color={soft} />
      <Arrow x1={120} y1={43} x2={99} y2={43} />
    </Shell>
  );
}

function WallAngel({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Line x1={54} y1={32} x2={54} y2={112} color={soft} />
      <Head x={92} y={49} />
      <Line x1={92} y1={58} x2={92} y2={88} />
      <Line x1={92} y1={68} x2={68} y2={52} />
      <Line x1={92} y1={68} x2={116} y2={52} />
      <path d="M70 66 C70 40 86 33 96 31" stroke={guide} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="5 5" />
      <path d="M114 66 C114 40 98 33 88 31" stroke={guide} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="5 5" />
      <Line x1={92} y1={88} x2={78} y2={114} />
      <Line x1={92} y1={88} x2={106} y2={114} />
      <Arrow x1={116} y1={64} x2={108} y2={34} />
    </Shell>
  );
}

function SideLying({ labels, compact, clamshell = false }: MotionGuideProps & { clamshell?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={44} y={82} />
      <Line x1={52} y1={84} x2={98} y2={84} />
      {clamshell ? (
        <>
          <Line x1={98} y1={84} x2={128} y2={99} />
          <Line x1={128} y1={99} x2={158} y2={99} />
          <Line x1={98} y1={84} x2={130} y2={64} color={guide} />
          <Line x1={130} y1={64} x2={160} y2={76} color={guide} />
          <Arrow x1={124} y1={91} x2={136} y2={61} />
        </>
      ) : (
        <>
          <Line x1={98} y1={84} x2={158} y2={96} />
          <Line x1={98} y1={84} x2={158} y2={58} color={guide} />
          <Arrow x1={136} y1={89} x2={164} y2={54} />
        </>
      )}
    </Shell>
  );
}

function HalfKneel({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={102} y={42} />
      <Line x1={102} y1={51} x2={102} y2={82} />
      <Line x1={102} y1={62} x2={78} y2={76} />
      <Line x1={102} y1={62} x2={126} y2={76} />
      <Line x1={102} y1={82} x2={72} y2={108} />
      <Line x1={102} y1={82} x2={138} y2={82} />
      <Line x1={138} y1={82} x2={158} y2={108} />
      <Line x1={52} y1={112} x2={168} y2={112} color={soft} />
      <Arrow x1={94} y1={84} x2={114} y2={82} />
    </Shell>
  );
}

function Hinge({ labels, compact, fly = false }: MotionGuideProps & { fly?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={88} y={43} />
      <Line x1={88} y1={52} x2={122} y2={78} />
      <Line x1={122} y1={78} x2={108} y2={112} />
      <Line x1={122} y1={78} x2={142} y2={112} />
      {fly ? (
        <>
          <Line x1={106} y1={66} x2={72} y2={54} color={guide} />
          <Line x1={106} y1={66} x2={144} y2={54} color={guide} />
          <Arrow x1={100} y1={70} x2={146} y2={54} />
        </>
      ) : (
        <>
          <Line x1={108} y1={64} x2={90} y2={90} />
          <Line x1={108} y1={64} x2={126} y2={90} />
          <Line x1={86} y1={94} x2={132} y2={94} color={accent} />
          <Arrow x1={104} y1={52} x2={132} y2={76} />
        </>
      )}
    </Shell>
  );
}

function Lunge({ labels, compact }: MotionGuideProps) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={98} y={42} />
      <Line x1={98} y1={51} x2={98} y2={78} />
      <Line x1={98} y1={62} x2={76} y2={74} />
      <Line x1={98} y1={62} x2={120} y2={74} />
      <Line x1={98} y1={78} x2={70} y2={100} />
      <Line x1={70} y1={100} x2={48} y2={100} />
      <Line x1={98} y1={78} x2={134} y2={94} color={guide} />
      <Line x1={134} y1={94} x2={160} y2={108} color={guide} />
      <Arrow x1={150} y1={78} x2={132} y2={96} />
    </Shell>
  );
}

function KneelingFlow({ labels, compact, child = false }: MotionGuideProps & { child?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      {child ? (
        <>
          <Head x={54} y={88} />
          <path d="M62 91 C88 78 118 80 150 98" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <Line x1={92} y1={88} x2={156} y2={70} />
          <Line x1={92} y1={88} x2={154} y2={88} />
          <Arrow x1={88} y1={66} x2={64} y2={84} />
        </>
      ) : (
        <>
          <Head x={48} y={66} />
          <path d="M58 70 C82 52 114 52 142 70" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M58 83 C82 98 114 98 142 83" stroke={guide} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="5 5" />
          <Line x1={76} y1={70} x2={62} y2={102} />
          <Line x1={132} y1={70} x2={150} y2={102} />
          <Arrow x1={96} y1={50} x2={102} y2={91} />
        </>
      )}
    </Shell>
  );
}

function RowPull({ labels, compact, face = false }: MotionGuideProps & { face?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      <Line x1={166} y1={38} x2={166} y2={110} color={soft} />
      <Head x={78} y={50} />
      <Line x1={78} y1={59} x2={78} y2={92} />
      <Line x1={78} y1={70} x2={face ? 116 : 112} y2={face ? 58 : 70} />
      <Line x1={78} y1={70} x2={face ? 116 : 112} y2={face ? 82 : 70} />
      <Line x1={112} y1={face ? 58 : 70} x2={166} y2={62} color={accent} width={3} />
      <Line x1={112} y1={face ? 82 : 70} x2={166} y2={62} color={accent} width={3} />
      <Line x1={78} y1={92} x2={64} y2={116} />
      <Line x1={78} y1={92} x2={94} y2={116} />
      <Arrow x1={136} y1={62} x2={110} y2={70} />
    </Shell>
  );
}

function GenericStandingMove({ labels, compact, side = false }: MotionGuideProps & { side?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={86} y={42} />
      <Line x1={86} y1={51} x2={86} y2={84} />
      <Line x1={86} y1={63} x2={64} y2={76} />
      <Line x1={86} y1={63} x2={108} y2={76} />
      <Line x1={86} y1={84} x2={74} y2={114} />
      <Line x1={86} y1={84} x2={108} y2={114} />
      {side ? (
        <>
          <path d="M72 103 C90 98 112 98 130 103" stroke={accent} strokeWidth="4" fill="none" />
          <Arrow x1={126} y1={92} x2={158} y2={92} />
        </>
      ) : (
        <Arrow x1={130} y1={106} x2={130} y2={78} />
      )}
    </Shell>
  );
}

function HipControl({ labels, compact, seated = false }: MotionGuideProps & { seated?: boolean }) {
  return (
    <Shell labels={labels} compact={compact}>
      <Head x={82} y={52} />
      <Line x1={82} y1={61} x2={82} y2={88} />
      {seated ? (
        <>
          <Line x1={82} y1={88} x2={54} y2={105} />
          <Line x1={82} y1={88} x2={126} y2={105} color={guide} />
          <Line x1={118} y1={91} x2={168} y2={91} color={soft} />
          <Arrow x1={120} y1={106} x2={150} y2={92} />
        </>
      ) : (
        <>
          <Line x1={82} y1={88} x2={50} y2={104} />
          <Line x1={82} y1={88} x2={132} y2={104} />
          <Line x1={132} y1={104} x2={158} y2={84} color={guide} />
          <Arrow x1={118} y1={100} x2={146} y2={82} />
        </>
      )}
    </Shell>
  );
}

export function MotionGuide({ type, labels = [], compact = false }: MotionGuideProps) {
  switch (type) {
    case 'breathing_9090':
      return (
        <Shell labels={labels} compact={compact}>
          <Head x={44} y={88} />
          <Line x1={52} y1={90} x2={108} y2={90} />
          <Line x1={108} y1={90} x2={108} y2={58} />
          <Line x1={108} y1={58} x2={152} y2={58} />
          <path d="M66 78 C78 68 96 68 108 78" stroke={guide} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M74 55 C88 42 114 42 128 55" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="5 5" />
          <Arrow x1={118} y1={44} x2={93} y2={58} />
        </Shell>
      );
    case 'chin_tuck':
    case 'wall_posture':
      return <StandingPosture type={type} labels={labels} compact={compact} />;
    case 'wall_angel':
      return <WallAngel type={type} labels={labels} compact={compact} />;
    case 'dead_bug':
      return <SupineCore type={type} labels={labels} compact={compact} />;
    case 'glute_bridge':
    case 'single_leg_bridge':
    case 'hip_thrust':
      return <SupineBridge type={type} labels={labels} compact={compact} />;
    case 'clamshell':
      return <SideLying type={type} labels={labels} compact={compact} clamshell />;
    case 'side_leg_raise':
      return <SideLying type={type} labels={labels} compact={compact} />;
    case 'hip_flexor_stretch':
      return <HalfKneel type={type} labels={labels} compact={compact} />;
    case 'band_row':
      return <RowPull type={type} labels={labels} compact={compact} />;
    case 'face_pull':
      return <RowPull type={type} labels={labels} compact={compact} face />;
    case 'bird_dog':
      return (
        <Shell labels={labels} compact={compact}>
          <Head x={48} y={66} />
          <Line x1={57} y1={70} x2={112} y2={78} />
          <Line x1={70} y1={72} x2={44} y2={100} />
          <Line x1={102} y1={76} x2={116} y2={108} />
          <Line x1={112} y1={78} x2={160} y2={58} color={guide} />
          <Line x1={57} y1={70} x2={28} y2={48} color={guide} />
          <Arrow x1={122} y1={72} x2={164} y2={56} />
        </Shell>
      );
    case 'chest_stretch':
      return (
        <Shell labels={labels} compact={compact}>
          <Line x1={62} y1={38} x2={62} y2={112} color={soft} />
          <Head x={98} y={48} />
          <Line x1={98} y1={57} x2={98} y2={88} />
          <Line x1={98} y1={66} x2={64} y2={58} />
          <Line x1={98} y1={66} x2={126} y2={76} />
          <Line x1={98} y1={88} x2={84} y2={114} />
          <Line x1={98} y1={88} x2={112} y2={114} />
          <Arrow x1={112} y1={66} x2={132} y2={66} />
        </Shell>
      );
    case 'romanian_deadlift':
      return <Hinge type={type} labels={labels} compact={compact} />;
    case 'reverse_fly':
    case 'ytwl':
      return <Hinge type={type} labels={labels} compact={compact} fly />;
    case 'band_side_walk':
    case 'standing_kickback':
      return <GenericStandingMove type={type} labels={labels} compact={compact} side />;
    case 'reverse_lunge':
      return <Lunge type={type} labels={labels} compact={compact} />;
    case 'calf_raise':
      return <GenericStandingMove type={type} labels={labels} compact={compact} />;
    case 'cat_cow':
      return <KneelingFlow type={type} labels={labels} compact={compact} />;
    case 'child_pose':
      return <KneelingFlow type={type} labels={labels} compact={compact} child />;
    case 'knees_to_chest':
      return (
        <Shell labels={labels} compact={compact}>
          <Head x={48} y={90} />
          <Line x1={56} y1={92} x2={104} y2={92} />
          <Line x1={104} y1={92} x2={122} y2={70} />
          <Line x1={122} y1={70} x2={140} y2={88} />
          <Line x1={76} y1={88} x2={118} y2={70} color={guide} />
          <Arrow x1={112} y1={64} x2={138} y2={76} />
        </Shell>
      );
    case 'hip_9090_switch':
      return <HipControl type={type} labels={labels} compact={compact} />;
    case 'seated_hip_internal_rotation':
      return <HipControl type={type} labels={labels} compact={compact} seated />;
    default:
      return <StandingPosture type={type} labels={labels} compact={compact} />;
  }
}
