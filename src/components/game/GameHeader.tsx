import { PointValue } from '../points/PointValue';
import type { GamePhase } from '../../types/game';

interface GameHeaderProps {
  turnNumber: number;
  phase: GamePhase;
  isHumanTurn: boolean;
  humanScore: number;
  botScore: number;
}

const PHASE_BADGES: Record<GamePhase, { text: string; className: string } | null> = {
  playing:     null,
  final_round: {
    text: '⚠ 최후의 소환식',
    className: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  },
  finished: {
    text: '소환 완료',
    className: 'bg-slate-700/60 text-slate-300 border border-slate-600/40',
  },
};

export function GameHeader({
  turnNumber,
  phase,
  isHumanTurn,
  humanScore,
  botScore,
}: GameHeaderProps) {
  const badge = PHASE_BADGES[phase];

  return (
    <header className="flex items-center justify-between gap-2 px-3 py-1.5">
      {/* 좌: 게임 타이틀 + 라운드 */}
      <div className="flex items-baseline gap-1.5">
        <h1
          className="text-sm font-bold tracking-tight text-white"
          style={{ textShadow: '0 0 12px rgba(167,139,250,0.5)' }}
        >
          오행 소환
        </h1>
        <p className="text-[10px] text-slate-500">{turnNumber}번째</p>
      </div>

      {/* 우: 뱃지 + 턴 + 점수 */}
      <div className="flex items-center gap-2">
        {badge && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}>
            {badge.text}
          </span>
        )}
        <span
          className={[
            'text-[11px] font-semibold',
            isHumanTurn ? 'text-amber-300' : 'text-slate-400',
          ].join(' ')}
        >
          {isHumanTurn ? '✦ 소환사의 차례' : '봇의 차례'}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <PointValue
            value={humanScore}
            className="font-semibold text-slate-300"
            iconClassName="size-2.5 text-amber-300"
            hideZero={false}
          />
          <span aria-hidden className="text-slate-600">vs</span>
          <PointValue
            value={botScore}
            className="font-semibold text-slate-300"
            iconClassName="size-2.5 text-amber-300"
            hideZero={false}
          />
        </div>
      </div>
    </header>
  );
}
