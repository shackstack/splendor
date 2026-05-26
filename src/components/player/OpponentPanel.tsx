import { useState } from 'react';

import { CardTile } from '../cards/CardTile';
import { NobleTile } from '../noble/NobleTile';
import { PlayerSummary } from './PlayerSummary';
import type { PlayerState } from '../../types/player';

interface OpponentPanelProps {
  player: PlayerState;
  isActive: boolean;
}

export function OpponentPanel({ player, isActive }: OpponentPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-3">
      <PlayerSummary player={player} isActive={isActive} />

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-2 text-xs text-slate-400 underline-offset-2 hover:text-slate-300 hover:underline"
      >
        {expanded ? '접기' : '상세 보기'}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-slate-700 pt-3">
          {player.purchasedCards.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase text-slate-400">
                구매 카드
              </h3>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {player.purchasedCards.map((card, index) => (
                  <div key={`${card.id}-${index}`} className="w-[56px] shrink-0 scale-90">
                    <CardTile card={card} compact />
                  </div>
                ))}
              </div>
            </div>
          )}

          {player.reservedCards.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase text-slate-400">
                예약 카드
              </h3>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {player.reservedCards.map((card, index) => (
                  <div key={`${card.id}-${index}`} className="w-[56px] shrink-0 scale-90">
                    <CardTile card={card} compact />
                  </div>
                ))}
              </div>
            </div>
          )}

          {player.nobles.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase text-slate-400">
                귀족
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {player.nobles.map((noble) => (
                  <NobleTile key={noble.id} noble={noble} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
