import type { GamePhase } from '../../types/game';

interface GameHeaderProps {
  turnNumber: number;
  phase: GamePhase;
  isHumanTurn: boolean;
  humanScore: number;
  botScore: number;
}

const PHASE_LABELS: Record<GamePhase, string | null> = {
  playing: null,
  final_round: '마지막 라운드',
  finished: '게임 종료',
};

export function GameHeader({
  turnNumber,
  phase,
  isHumanTurn,
  humanScore,
  botScore,
}: GameHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 pb-3">
      <div>
        <h1 className="text-lg font-bold text-white">스플렌더</h1>
        <p className="text-xs text-slate-400">턴 {turnNumber}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        {PHASE_LABELS[phase] && (
          <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
            {PHASE_LABELS[phase]}
          </span>
        )}
        <span
          className={[
            'text-xs font-semibold',
            isHumanTurn ? 'text-amber-300' : 'text-slate-400',
          ].join(' ')}
        >
          {isHumanTurn ? '내 턴' : '봇 턴'}
        </span>
        <span className="text-[10px] text-slate-500">
          {humanScore} : {botScore}
        </span>
      </div>
    </header>
  );
}
