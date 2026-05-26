import { BotLevelPicker } from './BotLevelPicker';
import type { BotLevel } from '../../types/player';

interface StartScreenProps {
  onStart: (level: BotLevel) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">스플렌더</h1>
        <p className="mt-2 text-sm text-slate-400">1인 플레이 · 봇 난이도 선택</p>
      </div>
      <BotLevelPicker onSelect={onStart} />
    </div>
  );
}
