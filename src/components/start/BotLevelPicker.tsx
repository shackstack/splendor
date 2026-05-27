import type { BotLevel } from '../../types/player';

interface BotLevelPickerProps {
  onSelect: (level: BotLevel) => void;
}

const LEVELS: {
  level: BotLevel;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    level: 'random',
    label: '방랑 소환사',
    sublabel: '입문',
    description: '정령의 흐름에 몸을 맡기는 자',
    icon: '🌿',
    color: 'border-emerald-700/60 hover:border-emerald-500/80',
  },
  {
    level: 'greedy',
    label: '숙련 소환사',
    sublabel: '중급',
    description: '정령석과 승점을 향해 달려가는 자',
    icon: '🔥',
    color: 'border-amber-700/60 hover:border-amber-500/80',
  },
  {
    level: 'strategic',
    label: '현자 소환사',
    sublabel: '고급',
    description: '오행의 이치를 꿰뚫은 자',
    icon: '🐉',
    color: 'border-violet-700/60 hover:border-violet-500/80',
  },
];

export function BotLevelPicker({ onSelect }: BotLevelPickerProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2.5">
      {LEVELS.map(({ level, label, sublabel, description, icon, color }) => (
        <button
          key={level}
          type="button"
          onClick={() => onSelect(level)}
          className={[
            'min-h-[60px] rounded-xl border bg-slate-900/60 px-4 py-3 text-left',
            'transition-colors active:scale-[0.98]',
            color,
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-white">{label}</span>
                <span className="text-[10px] text-slate-500">{sublabel}</span>
              </div>
              <span className="block text-xs text-slate-400">{description}</span>
            </div>
            <span className="text-slate-600">›</span>
          </div>
        </button>
      ))}
    </div>
  );
}
