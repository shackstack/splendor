import type { GameState } from '../../types/game';

interface GameOverModalProps {
  state: GameState;
  humanId: string;
  onRestart: () => void;
}

export function GameOverModal({ state, humanId, onRestart }: GameOverModalProps) {
  const human = state.players.find((p) => p.id === humanId);
  const isWinner = state.winnerIds?.includes(humanId) ?? false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-600 bg-slate-800 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white">게임 종료</h2>

        <div className="mt-4 space-y-2">
          {state.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2"
            >
              <span className="text-sm text-slate-200">{player.name}</span>
              <span className="text-sm font-bold text-white">{player.score}pt</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-base font-semibold text-amber-300">
          {isWinner ? '승리!' : '패배...'}
          {human && ` (${human.score}pt)`}
        </p>

        {state.winnerIds && state.winnerIds.length > 1 && (
          <p className="mt-1 text-center text-xs text-slate-400">동률</p>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 min-h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white active:bg-blue-700"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
}
