import type { BotLevel } from '../../types/player';

interface BotLevelPickerProps {
  onSelect: (level: BotLevel) => void;
}

const LEVELS: { level: BotLevel; label: string; description: string }[] = [
  { level: 'random', label: '랜덤', description: '무작위 행동' },
  { level: 'greedy', label: '탐욕', description: '점수·카드 우선' },
  { level: 'strategic', label: '전략', description: '탐욕과 동일 (향후 확장)' },
];

export function BotLevelPicker({ onSelect }: BotLevelPickerProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {LEVELS.map(({ level, label, description }) => (
        <button
          key={level}
          type="button"
          onClick={() => onSelect(level)}
          className="min-h-14 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-left active:bg-slate-700"
        >
          <span className="block text-base font-bold text-white">{label}</span>
          <span className="block text-xs text-slate-400">{description}</span>
        </button>
      ))}
    </div>
  );
}
