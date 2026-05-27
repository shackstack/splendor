import { BonusSummary } from './BonusSummary';
import { CardTile } from '../cards/CardTile';
import { OwnedNobles } from './OwnedNobles';
import { PlayerSummary } from './PlayerSummary';
import { PurchasedCards } from './PurchasedCards';
import type { PlayerState } from '../../types/player';

interface PlayerDetailModalProps {
  player: PlayerState;
  isOpen: boolean;
  onClose: () => void;
}

export function PlayerDetailModal({
  player,
  isOpen,
  onClose,
}: PlayerDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-600 bg-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-detail-title"
      >
        <div className="shrink-0 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 id="player-detail-title" className="text-base font-bold text-white">
              {player.name} 상세
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1 text-xs font-semibold text-slate-400 active:bg-slate-700"
            >
              닫기
            </button>
          </div>
          <div className="mt-2">
            <PlayerSummary player={player} />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              보너스
            </h3>
            <BonusSummary player={player} />
          </div>

          {player.nobles.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                귀족 ({player.nobles.length})
              </h3>
              <OwnedNobles nobles={player.nobles} />
            </div>
          )}

          {player.purchasedCards.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                구매 카드 ({player.purchasedCards.length})
              </h3>
              <PurchasedCards cards={player.purchasedCards} />
            </div>
          )}

          {player.reservedCards.length > 0 && (
            <div>
              <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                예약 카드 ({player.reservedCards.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {player.reservedCards.map((card, index) => (
                  <div key={`${card.id}-${index}`} className="shrink-0">
                    <CardTile card={card} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
