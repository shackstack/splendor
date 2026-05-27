import { BotLevelPicker } from './BotLevelPicker';
import type { BotLevel } from '../../types/player';

interface StartScreenProps {
  onStart: (level: BotLevel) => void;
}

/** 오행 원소 장식 */
const ELEMENTS = [
  { label: '木', color: '#22c55e', desc: '목기석' },
  { label: '火', color: '#ef4444', desc: '화기석' },
  { label: '土', color: '#eab308', desc: '토기석' },
  { label: '金', color: '#e2e8f0', desc: '금기석' },
  { label: '水', color: '#475569', desc: '수기석' },
];

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 px-6 py-12">

      {/* 타이틀 섹션 */}
      <div className="text-center">
        {/* 오행 원소 아이콘 행 */}
        <div className="mb-6 flex justify-center gap-3">
          {ELEMENTS.map(({ label, color, desc }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-base font-bold shadow-lg"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
                  border: `1.5px solid ${color}88`,
                  color,
                  textShadow: `0 0 8px ${color}`,
                  boxShadow: `0 0 10px ${color}33`,
                }}
              >
                {label}
              </div>
              <span className="text-[9px] text-slate-500">{desc}</span>
            </div>
          ))}
        </div>

        {/* 게임 제목 */}
        <h1
          className="text-4xl font-bold tracking-tight text-white"
          style={{ textShadow: '0 0 20px rgba(167,139,250,0.6)' }}
        >
          오행 소환
        </h1>
        <p className="mt-2 text-sm font-medium text-violet-300/80">
          五行召喚
        </p>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          오행 정령석을 모아 강력한 신수를 소환하라
        </p>

        {/* 장식선 */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500/50" />
          <span className="text-xs text-violet-400/60">⬡</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500/50" />
        </div>
      </div>

      {/* 난이도 선택 */}
      <div className="w-full max-w-sm">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          상대 소환사 선택
        </p>
        <BotLevelPicker onSelect={onStart} />
      </div>

      {/* 하단 플레이버 텍스트 */}
      <p className="text-center text-[10px] leading-relaxed text-slate-600">
        오사신과 다섯 전설 신수가 당신의 소환을 기다린다
      </p>
    </div>
  );
}
