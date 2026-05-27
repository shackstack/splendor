import { PointValue } from '../points/PointValue';
import type { PlayerState } from '../../types/player';

interface PlayerSummaryProps {
  player: PlayerState;
  isActive?: boolean;
}

export function PlayerSummary({ player, isActive = false }: PlayerSummaryProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span
          className={[
            'text-sm font-bold',
            isActive ? 'text-amber-300' : 'text-slate-200',
          ].join(' ')}
        >
          {player.name}
        </span>
        {isActive && (
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
            턴
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <PointValue
          value={player.score}
          className="font-bold text-white"
          hideZero={false}
        />
        <span>정령 {player.purchasedCards.length}</span>
        <span>예약 {player.reservedCards.length}</span>
        <span>신수 {player.nobles.length}</span>
      </div>
    </div>
  );
}
