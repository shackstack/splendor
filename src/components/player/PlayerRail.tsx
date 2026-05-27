import { GemHand } from '../gems/GemHand';
import { PlayerSummary } from './PlayerSummary';
import { ReservedCards } from './ReservedCards';
import { openPlayerDetailModal } from '../../utils/playerDetailModal';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';
import type { PlayerState } from '../../types/player';

interface PlayerRailProps {
  player: PlayerState;
  isActive: boolean;
  selectedCard: CardSelection | null;
  onSelectCard?: (source: CardSelection) => void;
  onDismissCard?: () => void;
  onAction?: (action: Action) => void;
  getCardActions?: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
  playerBonuses?: RegularGemCounts;
  interactive?: boolean;
  showReserved?: boolean;
}

export function PlayerRail({
  player,
  isActive,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive = false,
  showReserved = false,
}: PlayerRailProps) {
  const hasDetail =
    player.purchasedCards.length > 0 ||
    player.nobles.length > 0 ||
    player.reservedCards.length > 0;

  return (
    <aside className="flex w-[112px] shrink-0 flex-col gap-1 overflow-hidden rounded-lg border border-slate-600 bg-slate-800/90 p-1.5 shadow-lg">
      <PlayerSummary player={player} isActive={isActive} />

      <div className="min-h-0 shrink-0">
        <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          보석
        </p>
        <GemHand gems={player.gems} />
      </div>

      {showReserved && (
        <div className="min-h-0 flex-1 overflow-hidden">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
            예약
          </p>
          <ReservedCards
            cards={player.reservedCards}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            onDismiss={onDismissCard}
            onAction={onAction}
            getCardActions={getCardActions}
            canAffordCard={canAffordCard}
            playerBonuses={playerBonuses}
            interactive={interactive}
          />
        </div>
      )}

      {!showReserved && player.reservedCards.length > 0 && (
        <p className="text-[10px] text-slate-400">
          예약 {player.reservedCards.length}
        </p>
      )}

      {hasDetail && (
        <button
          type="button"
          onClick={() => openPlayerDetailModal(player)}
          className="mt-auto shrink-0 rounded-md border border-slate-600 bg-slate-700/80 px-2 py-1 text-[10px] font-semibold text-slate-200 active:bg-slate-600"
        >
          상세
        </button>
      )}
    </aside>
  );
}
