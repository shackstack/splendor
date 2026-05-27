import { PointValue } from '../points/PointValue';
import type { GameState } from '../../types/game';

interface GameOverModalProps {
  state: GameState;
  humanId: string;
  onRestart: () => void;
}

export function GameOverModal({ state, humanId, onRestart }: GameOverModalProps) {
  const human = state.players.find((p) => p.id === humanId);
  const isWinner = state.winnerIds?.includes(humanId) ?? false;
  const isTie = (state.winnerIds?.length ?? 0) > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
      <div
        className="w-full max-w-sm rounded-2xl border border-violet-500/30 bg-slate-900/95 p-6 shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(109,40,217,0.3)' }}
      >
        {/* 결과 타이틀 */}
        <div className="mb-1 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            소환 결과
          </p>
          <h2
            className={[
              'mt-1 text-2xl font-bold',
              isWinner ? 'text-amber-300' : 'text-slate-300',
            ].join(' ')}
            style={isWinner ? { textShadow: '0 0 16px rgba(251,191,36,0.6)' } : {}}
          >
            {isTie
              ? '⚖ 동률 소환'
              : isWinner
              ? '🏆 대소환사 등극!'
              : '🌙 수련이 필요하다'}
          </h2>
        </div>

        {/* 오행 장식선 */}
        <div className="my-4 flex items-center justify-center gap-1">
          {['#22c55e','#ef4444','#eab308','#e2e8f0','#475569'].map((c) => (
            <div
              key={c}
              className="h-1 w-8 rounded-full"
              style={{ background: c, opacity: 0.7 }}
            />
          ))}
        </div>

        {/* 플레이어 점수 목록 */}
        <div className="space-y-2">
          {state.players.map((player) => {
            const isThisWinner = state.winnerIds?.includes(player.id);
            return (
              <div
                key={player.id}
                className={[
                  'flex items-center justify-between rounded-lg px-3 py-2',
                  isThisWinner
                    ? 'bg-amber-500/10 ring-1 ring-amber-500/30'
                    : 'bg-slate-800/60',
                ].join(' ')}
              >
                <div className="flex items-center gap-2">
                  {isThisWinner && (
                    <span className="text-sm">👑</span>
                  )}
                  <span className="text-sm text-slate-200">{player.name}</span>
                  <span className="text-[10px] text-slate-500">
                    정령 {player.purchasedCards.length} · 신수 {player.nobles.length}
                  </span>
                </div>
                <PointValue
                  value={player.score}
                  className="text-sm font-bold text-white"
                  hideZero={false}
                />
              </div>
            );
          })}
        </div>

        {/* 결과 코멘트 */}
        {human && (
          <p className="mt-4 text-center text-xs text-slate-400">
            {isWinner
              ? '오행의 기운이 당신에게 깃들었습니다'
              : '정령들이 다음 소환을 기다립니다'}
          </p>
        )}

        {/* 재시작 버튼 */}
        <button
          type="button"
          onClick={onRestart}
          className={[
            'mt-5 min-h-12 w-full rounded-xl text-sm font-bold text-white',
            'bg-violet-700 active:bg-violet-800',
            'transition-colors',
          ].join(' ')}
          style={{ boxShadow: '0 0 16px rgba(109,40,217,0.4)' }}
        >
          다시 소환하기
        </button>
      </div>
    </div>
  );
}
